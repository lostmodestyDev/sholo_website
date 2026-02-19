import { Section, Container } from "@/components/craft";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Page() {
  return (
    <Section>
      <Head>
        <title>সাবস্ক্রাইব | ষোলো</title>
      </Head>
      <Container className="max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display mb-2">ষোলো সাবস্ক্রিপশন</h1>
          <p className="text-neutral-600">ঘরে বসে পড়ুন ষোলো</p>
        </div>

        <div className="bg-white border-2 border-primary rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-6">
            <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">বার্ষিক প্ল্যান</span>
          </div>
          
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-bold text-primary">৪৯৯</span>
              <span className="text-2xl text-neutral-600">টাকা</span>
            </div>
            <p className="text-neutral-500 mt-1">প্রতি বছর</p>
          </div>

          <div className="border-t border-b py-6 mb-6">
            <p className="font-display text-lg mb-4 text-center">যা যা পাচ্ছেন</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-1">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <span>৬ টি রেগুলার সংখ্যা হোম ডেলিভারি</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-1">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <span>সকল প্রোডাক্টে <strong>২০% ছাড়</strong></span>
              </li>
            </ul>
          </div>

          <Button asChild className="w-full h-14 text-lg bg-primary hover:bg-primary-7">
            <Link
              href="https://wa.me/8801511162016?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%2C%20%E0%A6%86%E0%A6%AE%E0%A6%BF%20%E0%A6%AC%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%B7%E0%A6%BF%E0%A6%95%20%E0%A6%B8%E0%A6%BE%E0%A6%AC%E0%A6%B8%E0%A7%8D%E0%A6%95%E0%A7%8D%E0%A6%B0%E0%A6%BF%E0%A6%AA%E0%A6%B6%E0%A6%A8%20%E0%A6%95%E0%A6%B0%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A5%A4"
              target="_blank"
              rel="noopener noreferrer"
            >
              হোয়াটসঅ্যাপে মেসেজ করুন
            </Link>
          </Button>

          <p className="text-center text-sm text-neutral-500 mt-4">
            মেসেজ করে সাবস্ক্রিপশন কনফার্ম করুন
          </p>
        </div>
      </Container>
    </Section>
  );
}
