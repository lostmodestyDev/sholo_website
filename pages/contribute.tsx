import { Section, Container } from "@/components/craft";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import quote from "@/public/quote.svg";

const WHATSAPP_NUMBER = "8801804191458";

const getWhatsAppUrl = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const TESTIMONIALS = [
  {
    id: "t1",
    title: "রিয়াদের ছোটবোনের জন্য পারফেক্ট গিফট",
    body: "ছোট বোনের জন্য নিয়ে নিলাম কিশোর ম্যাগাজিন 'ষোলো'📚\n\nআমি পড়ে দেখেছি ছোটদের জন্য খুবই উপকারী জিনিস এগুলা!\n\nআপনারাও আপনাদের ছোট ভাই-বোনদের উপহার দিতে পারেন। আমি মনে করি, বর্তমানে এরকম ম্যাগাজিন তাদের খুব প্রয়োজন!💯",
    quoteBy: "- রিয়াদ হাসান প্রান্ত",
    rotateClass: "-rotate-3",
    translateYClass: "",
  },
  {
    id: "t2",
    title: "মুকতার তার ফোন ব্যাবহার কমিয়ে দিয়েছে",
    body: "আপনাদের ম্যাগাজিন পড়ে আমার কত উপকার হইছে বলে বুঝাতে পারবো না। এক ছোট ভাইয়ের কাছ থেকে পেয়েছি।মোবাইল / সোস্যাল মিডিয়া থেকে দূরে থাকার কথা গুলো খুবই কার্যকরি। ...সারাদিন ফোন নিয়ে থাকতাম,ফেসবুকে মাইলের পর মাইল র্স্কোল করতাম।এখন আল্লাহর রহমতে কমে গেছে অনেক।ধন্যবাদ আপনাদের",
    quoteBy: "- এম কে মুকতার - ডুয়েট ছাত্র",
    rotateClass: "rotate-2",
    translateYClass: "translate-y-4",
  },
  {
    id: "t3",
    title: "মুশফিকের মধ্য মুসলিম উম্মাহ'র প্রতি ভালোবাসা তৈরি হয়",
    body: "ষোলো থেকে পিচ্চিদের সালামি থেকে একটা পার্ট ফিলি**নের গা*য় পাঠানো যাচ্ছে। মুশফিক মাশরাফ ইন্সটা থেকে কয়েকটা রিলস দেখার পর এগ্লা দিতে রাজি হইছে। আল্লাহুম্মা বারিক।",
    quoteBy: "-",
    rotateClass: "-rotate-1",
    translateYClass: "translate-y-2",
  },
  {
    id: "t4",
    title: "নষ্ট সমাজের থেকে বাচার অস্ত্র",
    body: "তোমাদের জীবনের এই গুরুত্বপূর্ণ সময়টাই তো সেক্যুলাররা কেড়ে নিয়ে তাদের ভাগাড়ে তোমাদের ভিড়িয়েছিল। তোমাদের ব্যস্ত রেখেছিল বস্তুবাদী সব ম্যাটেরিয়ালে। তোমাদের জান্নাতের রাস্তার সামনে তারা নির্মাণ করেছিল ফিতনার এক বিশাল প্রাচীর।",
    quoteBy: "- আল মুরাবিত আল আমিন",
    rotateClass: "rotate-3",
    translateYClass: "translate-y-6",
  },
];

const PAYMENT_METHODS = [
  {
    name: "bKash",
    number: "01797207158",
    type: "পার্সোনাল",
    logo: "/bkash_logo.svg",
  },
  {
    name: "Nagad",
    number: "01797207158",
    type: "পার্সোনাল",
    logo: "/nagad_logo.svg",
  },
  {
    name: "Rocket",
    number: "017972071589",
    type: "পার্সোনাল",
    logo: "/rocket_logo.svg",
  },
];

function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  return (
    <div className="md:hidden">
      <div className="bg-white border-2 border-secondary-8 rounded-lg p-5 min-h-56">
        <Image src={quote} alt="quote" className="h-8 w-8 mb-1 m-0" />
        <h3 className="font-display leading-none font-normal text-2xl mb-3 py-2 my-2">{t.title}</h3>
        <p className="text-sm leading-relaxed text-neutral-700 font-body">{t.body}</p>
        <p className="text-sm leading-relaxed text-neutral-700 font-body">{t.quoteBy}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4 px-1">
        <button
          onClick={() => setActive((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
          className="text-sm border rounded px-3 py-1 hover:bg-neutral-100 transition"
          aria-label="Previous"
        >
          ←
        </button>

        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === active ? "bg-secondary-8" : "bg-neutral-300"}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setActive((active + 1) % TESTIMONIALS.length)}
          className="text-sm border rounded px-3 py-1 hover:bg-neutral-100 transition"
          aria-label="Next"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default function DonatePage() {
  return (
    <Section>
      <Head>
        <title>দান করুন | ষোলো</title>
        <link rel="canonical" href="https://www.sholo.org/donate" />
        <meta
          name="description"
          content="ষোলো ম্যাগাজিনের কাজকে এগিয়ে নিতে আপনার সহযোগিতা করুন। bKash, Nagad, Rocket বা ব্যাংক ট্রান্সফারের মাধ্যমে দান করুন।"
        />
      </Head>
      <Container className="max-w-xl">
        <div className="text-center">
          <h1 className="text-3xl font-display mb-2">২ কোটি কিশোর-কিশোরীকে হারতে দিয়েন না <br/>সঙ্গী হোন ষোলোর সাথে</h1>
          <p className="text-neutral-600">
            ষোলো সম্পূর্ণ অলাভজনক একটি উদ্যোগ। আপনার সহযোগিতা আমাদের কাজকে
            এগিয়ে নিতে সাহায্য করে।
          </p>
        </div>
      </Container>

      {/* Testimonials */}
      <Container>
        <div className="py-4">

          {/* Mobile: slider */}
          <TestimonialSlider />

          {/* Desktop: tilted row */}
          <div className="hidden md:block relative md:overflow-visible">
            <div className="md:-mx-36 md:flex gap-12 px-6 md:px-0 md:overflow-visible md:justify-center items-end">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className={`flex-1 w-80 bg-white border-2 border-secondary-8 rounded-lg p-4 transform ${t.rotateClass} ${t.translateYClass}`}
                  aria-labelledby={`donate-${t.id}-title`}
                >
                  <Image src={quote} alt="quote" className="h-8 w-8 mb-1 m-0" />
                  <h3 id={`donate-${t.id}-title`} className="font-display leading-none font-normal text-3xl mb-3 py-2 my-2">{t.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-700 font-body">{t.body}</p>
                  <p className="text-sm leading-relaxed text-neutral-700 font-body">{t.quoteBy}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>

      <Container className="max-w-xl">
        {/* Mobile banking */}
        <div className="flex flex-col gap-3 mb-6">
          {PAYMENT_METHODS.map((method) => (
            <div
              key={method.name}
              className={`border-2 rounded-xl p-4 flex items-center justify-between hover:bg-neutral-50 cursor-pointer transition duration-200`}
              onClick={() => navigator.clipboard?.writeText(method.number)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={method.logo}
                  alt={`${method.name} logo`}
                  className="w-24 object-contain"
                />
                <div>
                  <span className="text-xs text-neutral-500 border border-neutral-300 rounded px-1">
                    {method.type}
                  </span>
                  <p className="font-mono text-xl font-semibold mt-1 tracking-wide">
                    {method.number}
                  </p>
                </div>
              </div>
              <button
                className="text-xs text-neutral-500 border rounded px-2 py-1 hover:bg-white transition group:hover:visible invisible"
                title="কপি করুন"
              >
                Click to Copy
              </button>
            </div>
          ))}
        </div>

        {/* Bank transfer */}
        <div className="border-2 border-neutral-200 rounded-xl p-4 mb-6">
          <p className="font-bold text-neutral-700 mb-1">ব্যাংক ট্রান্সফার</p>
          <p className="text-sm text-neutral-600 mb-3">
            ব্যাংক একাউন্টের বিস্তারিত জানতে হোয়াটসঅ্যাপে যোগাযোগ করুন।
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link
              href={getWhatsAppUrl("আসসালামুআলাইকুম, ব্যাংক একাউন্টের বিস্তারিত জানতে চাই।")}
              target="_blank"
              rel="noopener noreferrer"
            >
              হোয়াটসঅ্যাপে জানুন
            </Link>
          </Button>
        </div>

        {/* Monthly supporter */}
        <div className="bg-primary text-white rounded-2xl p-6 text-center">
          <p className="font-display text-xl mb-2">মাসিক সহযোগী হন</p>
          <p className="text-sm text-white/80 mb-4">
            প্রতি মাসে একটি নির্দিষ্ট পরিমাণ দিয়ে ষোলোর নিয়মিত সহযোগী হতে
            পারেন।
          </p>
          <Button asChild className="bg-white text-primary hover:bg-white/90">
            <Link
              href={getWhatsAppUrl("আসসালামুআলাইকুম, আমি ষোলোর মাসিক সহযোগী হতে চাই।")}
              target="_blank"
              rel="noopener noreferrer"
            >
              হোয়াটসঅ্যাপে যোগাযোগ করুন
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
