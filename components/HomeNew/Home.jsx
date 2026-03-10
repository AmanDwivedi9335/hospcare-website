"use client";

import Link from "next/link";

const services = [
  {
    title: "Doctor Appointment Booking",
    description:
      "Patients can easily book appointments with verified doctors across multiple specialties.",
  },
  {
    title: "Hospital & Surgery Assistance",
    description:
      "Hospcare helps patients find the right hospital and specialist for surgical and advanced treatments.",
  },
  {
    title: "EMI for Medical Treatment",
    description:
      "We collaborate with financial partners to help patients access affordable treatment with easy EMI options.",
  },
  {
    title: "Patient Care Support",
    description:
      "Our support team guides patients through the entire healthcare journey from consultation to treatment.",
  },
];

const whyChoose = [
  "Trusted hospital network",
  "Verified doctors and specialists",
  "Easy appointment booking",
  "Affordable treatment options",
  "End-to-end patient support",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Hospcare</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">India&apos;s Smart Healthcare Access Platform</h1>
        <p className="mt-6 max-w-4xl text-base text-slate-700 md:text-xl">
          Find the right doctors, book hospital appointments, and get guidance for surgeries and treatments — all in one place.
        </p>
        <p className="mt-4 max-w-4xl text-base text-slate-700 md:text-xl">
          Hospcare is transforming healthcare by connecting patients with trusted hospitals and specialists while making treatment more accessible and affordable.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium md:text-base">
          <Link href="/contact-us" className="rounded-full bg-teal-700 px-5 py-2 text-white">Book Appointment</Link>
          <Link href="/contact-us" className="rounded-full border border-teal-700 px-5 py-2 text-teal-800">Find Hospitals</Link>
          <Link href="/contact-us" className="rounded-full border border-teal-700 px-5 py-2 text-teal-800">Get Surgery Assistance</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-3xl font-bold">Our Services</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-slate-700">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-2">
        <article className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Our Vision</h2>
          <p className="mt-3 text-slate-700">
            To become the most trusted global healthcare platform, connecting millions of patients with the best doctors and hospitals through innovative technology.
          </p>
        </article>
        <article className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="mt-3 text-slate-700">
            Our mission is to simplify healthcare access by providing a platform where patients can easily find doctors, hospitals, treatments, and healthcare support services.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-3xl font-bold">For Hospitals & Doctors</h2>
        <p className="mt-3 text-slate-700">
          Hospcare partners with hospitals and healthcare providers to help them reach more patients and improve healthcare delivery.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
          <li>Increased patient reach</li>
          <li>Digital appointment management</li>
          <li>Treatment case support</li>
          <li>Technology-enabled healthcare services</li>
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-3xl font-bold">Why Choose Hospcare</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {whyChoose.map((point) => (
            <li key={point} className="rounded-lg border bg-white p-4 text-slate-800 shadow-sm">✔ {point}</li>
          ))}
        </ul>
        <p className="mt-6 text-slate-700">
          Hospcare is committed to improving healthcare accessibility through innovation and patient-focused services.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-bold">Our Goal</h2>
        <p className="mt-3 text-slate-700">
          Our goal is to build a strong healthcare ecosystem that benefits both patients and healthcare providers while improving healthcare access at scale.
        </p>
        <p className="mt-3 text-slate-700">
          Hospcare is working towards becoming a leading healthcare technology platform that transforms the way people experience healthcare.
        </p>
      </section>
    </main>
  );
}
