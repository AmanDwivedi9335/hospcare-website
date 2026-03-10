export const metadata = {
  title: "About Hospcare | Smart Healthcare Access",
  description:
    "Learn how Hospcare simplifies healthcare access through trusted hospital and doctor partnerships.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 text-slate-900">
      <h1 className="text-4xl font-bold">About Hospcare</h1>
      <p className="mt-5 text-lg text-slate-700">
        Hospcare is a digital healthcare platform designed to simplify how patients connect with doctors, hospitals, and treatment services. Our goal is to make healthcare accessible, transparent, and convenient for everyone.
      </p>
      <p className="mt-4 text-lg text-slate-700">
        Through our technology-driven ecosystem, patients can easily discover trusted healthcare providers, book appointments, explore treatment options, and receive complete medical guidance.
      </p>
      <p className="mt-4 text-lg text-slate-700">
        Hospcare works closely with hospitals, clinics, and specialists to ensure that patients receive the right treatment at the right place with the right support.
      </p>
      <p className="mt-4 text-lg text-slate-700">
        We are building a healthcare network that empowers both patients and healthcare providers by improving access, affordability, and efficiency in medical services.
      </p>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Our Vision</h2>
          <p className="mt-3 text-slate-700">
            To become the most trusted global healthcare platform, connecting millions of patients with the best doctors and hospitals through innovative technology.
          </p>
        </article>
        <article className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="mt-3 text-slate-700">
            Our mission is to simplify healthcare access by providing a platform where patients can easily find doctors, hospitals, treatments, and healthcare support services.
          </p>
        </article>
      </section>
    </main>
  );
}
