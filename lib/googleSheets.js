import jwt from 'jsonwebtoken';

const DEFAULT_SHEET_NAME = process.env.GOOGLE_SHEET_TAB_NAME || 'Registrations';
const REQUIRED_HEADERS = [
  'registrationId',
  'firstName',
  'lastName',
  'email',
  'mobile',
  'gender',
  'state',
  'paymentStatus',
  'mid',
  'createdAt',
  'paidAt',
  'transactionId',
];

const STATE_PIN_CODES = {
  'andhra pradesh': '51',
  'arunachal pradesh': '79',
  assam: '78',
  bihar: '80',
  chhattisgarh: '49',
  goa: '40',
  gujarat: '36',
  haryana: '12',
  'himachal pradesh': '17',
  jharkhand: '81',
  karnataka: '56',
  kerala: '67',
  'madhya pradesh': '45',
  maharashtra: '41',
  manipur: '79',
  meghalaya: '79',
  mizoram: '79',
  nagaland: '79',
  odisha: '75',
  punjab: '14',
  rajasthan: '30',
  sikkim: '73',
  'tamil nadu': '61',
  telangana: '50',
  tripura: '79',
  uttarakhand: '24',
  'uttar pradesh': '20',
  'west bengal': '70',
  'andaman and nicobar islands': '74',
  chandigarh: '16',
  'dadra and nagar haveli and daman and diu': '39',
  delhi: '11',
  'the government of nct of delhi': '11',
  'jammu & kashmir': '18',
  'jammu and kashmir': '18',
  ladakh: '18',
  lakshadweep: '68',
  puducherry: '60',
};

const GENDER_PREFIX = {
  male: '10',
  female: '20',
  transgender: '30',
};

function getServiceAccount() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Google service account credentials are missing');
  }

  return { clientEmail, privateKey };
}

function getSheetId() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID is missing');
  }
  return sheetId;
}

async function getAccessToken() {
  const { clientEmail, privateKey } = getServiceAccount();
  const now = Math.floor(Date.now() / 1000);

  const assertion = jwt.sign(
    {
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    },
    privateKey,
    { algorithm: 'RS256' }
  );

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to get Google access token: ${res.status}`);
  }

  const data = await res.json();
  return data.access_token;
}

async function sheetsRequest(path, options = {}) {
  const spreadsheetId = getSheetId();
  const accessToken = await getAccessToken();

  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    cache: 'no-store',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || `Google Sheets API error: ${res.status}`);
  }

  return data;
}

async function getRange(range) {
  const encoded = encodeURIComponent(range);
  return sheetsRequest(`/values/${encoded}`);
}

async function updateRange(range, values) {
  const encoded = encodeURIComponent(range);
  return sheetsRequest(`/values/${encoded}?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    body: JSON.stringify({ values }),
  });
}

async function appendRange(range, values) {
  const encoded = encodeURIComponent(range);
  return sheetsRequest(`/values/${encoded}:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    body: JSON.stringify({ values }),
  });
}

async function ensureHeaders() {
  const response = await getRange(`${DEFAULT_SHEET_NAME}!1:1`);
  const headerRow = response.values?.[0] || [];

  if (headerRow.length === REQUIRED_HEADERS.length && REQUIRED_HEADERS.every((h, i) => h === headerRow[i])) {
    return;
  }

  await updateRange(`${DEFAULT_SHEET_NAME}!1:1`, [REQUIRED_HEADERS]);
}

export async function getRegistrationRows() {
  await ensureHeaders();
  const response = await getRange(`${DEFAULT_SHEET_NAME}!A2:L`);
  return response.values || [];
}

export async function findDuplicateRegistration(email, mobile) {
  const rows = await getRegistrationRows();
  const emailToFind = email.trim().toLowerCase();
  const mobileToFind = mobile.trim();

  for (const row of rows) {
    const existingEmail = (row[3] || '').trim().toLowerCase();
    const existingMobile = (row[4] || '').trim();

    if (existingEmail && existingEmail === emailToFind) {
      return { type: 'email' };
    }

    if (existingMobile && existingMobile === mobileToFind) {
      return { type: 'mobile' };
    }
  }

  return null;
}

export async function appendRegistration(data) {
  await ensureHeaders();

  const row = [
    data.registrationId,
    data.firstName,
    data.lastName,
    data.email,
    data.mobile,
    data.gender,
    data.state,
    'unpaid',
    '',
    data.createdAt,
    '',
    '',
  ];

  await appendRange(`${DEFAULT_SHEET_NAME}!A:L`, [row]);
}

function getStateCode(state) {
  return STATE_PIN_CODES[state.trim().toLowerCase()];
}

function getGenderPrefix(gender) {
  return GENDER_PREFIX[gender.trim().toLowerCase()];
}

function getMmyy(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${month}${year}`;
}

function getNextSequence(rows, prefixSegment) {
  let maxSeq = 1000;

  for (const row of rows) {
    const mid = (row[8] || '').trim();
    if (mid.startsWith(prefixSegment) && mid.length === prefixSegment.length + 4) {
      const seq = Number(mid.slice(-4));
      if (!Number.isNaN(seq) && seq > maxSeq) {
        maxSeq = seq;
      }
    }
  }

  const next = maxSeq + 1;
  if (next > 9999) {
    throw new Error('MID sequence exhausted for this segment');
  }

  return String(next).padStart(4, '0');
}

function buildMid({ gender, state, date, rows }) {
  const genderPrefix = getGenderPrefix(gender);
  if (!genderPrefix) {
    throw new Error('Unsupported gender for MID generation');
  }

  const stateCode = getStateCode(state);
  if (!stateCode) {
    throw new Error('Unsupported state/UT for MID generation');
  }

  const mmyy = getMmyy(date);
  const stateBlock = `${stateCode}00`;
  const prefixSegment = `${genderPrefix}${mmyy}${stateBlock}`;
  const sequence = getNextSequence(rows, prefixSegment);

  return `${prefixSegment}${sequence}`;
}

export async function completePaymentAndGenerateMid({ registrationId, transactionId }) {
  await ensureHeaders();

  const rows = await getRegistrationRows();
  const rowIndex = rows.findIndex((row) => (row[0] || '').trim() === registrationId.trim());

  if (rowIndex < 0) {
    throw new Error('Registration ID not found');
  }

  const row = rows[rowIndex];
  const paymentStatus = (row[7] || '').trim().toLowerCase();
  const existingMid = (row[8] || '').trim();

  let mid = existingMid;
  if (!mid) {
    mid = buildMid({
      gender: row[5] || '',
      state: row[6] || '',
      date: new Date(),
      rows,
    });
  }

  const paidAt = new Date().toISOString();
  const updatedRow = [
    row[0] || '',
    row[1] || '',
    row[2] || '',
    row[3] || '',
    row[4] || '',
    row[5] || '',
    row[6] || '',
    'paid',
    mid,
    row[9] || new Date().toISOString(),
    row[10] || paidAt,
    transactionId || row[11] || '',
  ];

  if (paymentStatus !== 'paid' || !existingMid) {
    await updateRange(`${DEFAULT_SHEET_NAME}!A${rowIndex + 2}:L${rowIndex + 2}`, [updatedRow]);
  }

  return {
    paymentStatus: 'paid',
    mid,
  };
}
