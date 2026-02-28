import { Section, Container } from "@/components/craft";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import quote from "@/public/quote.svg";
import { TestimonialsSection } from "@/components/ui/testimonials-section";

const WHATSAPP_NUMBER = "8801804191458";

const getWhatsAppUrl = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};


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


export default function DonatePage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (number: string, index: number) => {
    navigator.clipboard?.writeText(number);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

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
      <TestimonialsSection />


      <Container className="max-w-xl">
        {/* Mobile banking */}
        <div className="flex flex-col gap-3 mb-6">
          {PAYMENT_METHODS.map((method, index) => (
            <div
              key={method.name}
              className={`border-2 rounded-xl p-4 flex items-center justify-between hover:bg-neutral-50 cursor-pointer transition duration-200`}
              onClick={() => handleCopy(method.number, index)}
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
                className="text-xs text-neutral-500 border rounded px-2 py-1"
                title="কপি করুন"
              >
                {copiedIndex === index ? "Copied!" : "Click to Copy"}
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
