import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/craft";
import quote from "@/public/quote.svg";

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

export function TestimonialsSection() {
  return (
    <Container>
      <div className="py-12">
        {/* Mobile: slider */}
        <TestimonialSlider />

        {/* Desktop: tilted row */}
        <div className="hidden md:block relative md:overflow-visible">
          <div className="md:-mx-36 md:flex gap-12 px-6 md:px-0 md:overflow-visible md:justify-center items-end">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className={`flex-1 w-80 bg-white border-2 border-secondary-8 rounded-lg p-4 transform ${t.rotateClass} ${t.translateYClass}`}
                aria-labelledby={`testimonial-${t.id}-title`}
              >
                <Image src={quote} alt="quote" className="h-8 w-8 mb-1 m-0" />
                <h3 id={`testimonial-${t.id}-title`} className="font-display leading-none font-normal text-3xl mb-3 py-2 my-2">{t.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-700 font-body">{t.body}</p>
                <p className="text-sm leading-relaxed text-neutral-700 font-body">{t.quoteBy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
