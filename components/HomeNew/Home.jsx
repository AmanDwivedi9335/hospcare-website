"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  BadgeCheck,
  CalendarCheck2,
  CircleDollarSign,
  HeartHandshake,
  Hospital,
  ShieldCheck,
  Stethoscope,
  TimerReset,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Doctor Appointment Booking",
    description:
      "Book appointments with verified doctors across specialties in just a few taps.",
    icon: CalendarCheck2,
  },
  {
    title: "Hospital & Surgery Assistance",
    description:
      "Get curated hospital and specialist recommendations for advanced care and surgeries.",
    icon: Hospital,
  },
  {
    title: "EMI for Medical Treatment",
    description:
      "Access affordable treatment plans through trusted financial partners and easy EMIs.",
    icon: CircleDollarSign,
  },
  {
    title: "Patient Care Support",
    description:
      "Receive complete guidance before, during, and after treatment from our support team.",
    icon: HeartHandshake,
  },
];

const whyChoose = [
  { point: "Trusted hospital network", icon: ShieldCheck },
  { point: "Verified doctors and specialists", icon: BadgeCheck },
  { point: "Easy appointment booking", icon: TimerReset },
  { point: "Affordable treatment options", icon: CircleDollarSign },
  { point: "End-to-end patient support", icon: Users },
];

const stats = [
  { label: "Hospitals Network", value: "200+" },
  { label: "Specialist Doctors", value: "1000+" },
  { label: "Patient Queries Guided", value: "25K+" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-cyan-50 via-white to-sky-50 text-slate-800">
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_#22d3ee30,_transparent_45%),radial-gradient(circle_at_top_left,_#38bdf830,_transparent_50%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <motion.div {...fadeInUp}>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/70 bg-cyan-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
              <Activity size={14} /> Hospcare
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              India&apos;s Smart
              <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent"> Healthcare Access </span>
              Platform
            </h1>
            <p className="mt-6 max-w-xl text-base text-slate-600 md:text-lg">
              Find the right doctors, book hospital appointments, and get complete surgery and treatment guidance — all in one place.
            </p>
            <p className="mt-3 max-w-xl text-base text-slate-600 md:text-lg">
              We connect patients with trusted hospitals and specialists while making quality healthcare more accessible and affordable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold md:text-base">
              <Link
                href="/contact-us"
                className="rounded-full bg-cyan-600 px-6 py-3 text-white shadow-lg shadow-cyan-200 transition hover:-translate-y-0.5 hover:bg-cyan-500"
              >
                Book Appointment
              </Link>
              <Link
                href="/contact-us"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-700"
              >
                Find Hospitals
              </Link>
              <Link
                href="/contact-us"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-700"
              >
                Get Surgery Assistance
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-cyan-300/50 blur-2xl" />
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-sky-300/50 blur-2xl" />
            <div className="relative rounded-3xl border border-cyan-100 bg-white p-4 shadow-xl shadow-cyan-100/70 backdrop-blur-sm">
              <Image
                src="/images/hospcare/hero-healthcare.svg"
                alt="Hospcare healthcare platform illustration"
                width={760}
                height={520}
                className="h-auto w-full rounded-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <motion.article
            key={stat.label}
            whileHover={{ y: -6 }}
            className="rounded-2xl border border-cyan-100 bg-white p-5 text-center shadow-md shadow-cyan-100/50"
          >
            <h3 className="text-3xl font-bold text-cyan-700">{stat.value}</h3>
            <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
          </motion.article>
        ))}
      </section>

      <motion.section {...fadeInUp} className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-3xl font-bold md:text-4xl">Our Services</h2>
        <p className="mt-2 max-w-3xl text-slate-600">Designed to support patients at every stage of their healthcare journey.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                whileHover={{ y: -6, scale: 1.01 }}
                className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-[0_10px_40px_-25px_rgba(14,165,233,0.65)]"
              >
                <div className="mb-4 inline-flex rounded-xl bg-cyan-100 p-3 text-cyan-700">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-slate-600">{service.description}</p>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-2">
        <motion.article {...fadeInUp} className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-md shadow-cyan-100/60">
          <h2 className="text-2xl font-bold md:text-3xl">Our Vision</h2>
          <p className="mt-3 text-slate-600">
            To become the most trusted global healthcare platform, connecting millions of patients with the best doctors and hospitals through innovative technology.
          </p>
        </motion.article>
        <motion.article {...fadeInUp} className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-md shadow-cyan-100/60">
          <h2 className="text-2xl font-bold md:text-3xl">Our Mission</h2>
          <p className="mt-3 text-slate-600">
            To simplify healthcare access by helping patients discover doctors, hospitals, treatments, and support services in one seamless platform.
          </p>
        </motion.article>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-2">
        <motion.div {...fadeInUp}>
          <h2 className="text-3xl font-bold md:text-4xl">For Hospitals & Doctors</h2>
          <p className="mt-3 text-slate-600">
            Hospcare partners with healthcare providers to improve discoverability, streamline appointments, and deliver better care outcomes.
          </p>
          <ul className="mt-5 space-y-3 text-slate-600">
            {[
              "Increased patient reach",
              "Digital appointment management",
              "Treatment case support",
              "Technology-enabled healthcare services",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Stethoscope size={16} className="text-cyan-600" /> {item}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div {...fadeInUp} className="rounded-3xl border border-cyan-100 bg-white p-4 shadow-xl shadow-cyan-100/70">
          <Image
            src="/images/hospcare/hospital-network.svg"
            alt="Hospital and doctor network illustration"
            width={720}
            height={500}
            className="h-auto w-full rounded-2xl"
          />
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <motion.h2 {...fadeInUp} className="text-3xl font-bold md:text-4xl">
          Why Choose Hospcare
        </motion.h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((item) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.point}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-cyan-100 bg-white p-5 text-slate-700 shadow-md shadow-cyan-100/50"
              >
                <Icon className="mb-3 text-cyan-600" size={20} />
                {item.point}
              </motion.li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-2">
        <motion.div {...fadeInUp} className="rounded-3xl border border-cyan-100 bg-white p-4 shadow-xl shadow-cyan-100/70">
          <Image
            src="/images/hospcare/healthcare-goal.svg"
            alt="Future healthcare goals illustration"
            width={720}
            height={500}
            className="h-auto w-full rounded-2xl"
          />
        </motion.div>
        <motion.div {...fadeInUp}>
          <h2 className="text-3xl font-bold md:text-4xl">Our Goal</h2>
          <p className="mt-3 text-slate-600">
            We are building a strong healthcare ecosystem that benefits both patients and providers while improving quality care access at scale.
          </p>
          <p className="mt-3 text-slate-600">
            Hospcare is focused on becoming a leading healthcare technology platform that transforms how people experience healthcare.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
