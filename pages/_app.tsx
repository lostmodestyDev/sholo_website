import { GoogleAnalytics } from '@next/third-parties/google'
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from 'next/app'
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from 'react';

import { mainMenu, contentMenu } from "@/menu.config";
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";
import "@/public/globals.css";
import Logo from "@/public/logo.png";
import { Nav } from "@/components/nav/nav";

// Banner configuration - easily changeable
const BANNER_CONFIG = {
  text: "বার্ষিক সাবস্ক্রিপশন মাত্র ৪৯৯ টাকা! সাবস্ক্রাইব করুন →",
  link: "/subscribe",
  enabled: true,
};

const SITE_DESCRIPTION = "'ষোলো' হলো কিশোর-কিশোরী, তরুণ-তরুণীদের জন্য প্রকাশিত ম্যাগাজিন যার লক্ষ্য: কিশোর-কিশোরী ও তরুণ-তরুণীদের ইসলামী মূল্যবোধে দীক্ষিত করে সমাজের দায়িত্বশীল সদস্য হিসেবে গড়ে তোলা।";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>ষোলো</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Sans+Bengali:wght@100..900&display=swap" data-subset="bengali,latin" rel="stylesheet" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        {BANNER_CONFIG.enabled && (
          <Link
            href={BANNER_CONFIG.link}
            className="block bg-secondary-8 text-white text-center text-sm font-medium h-10 leading-10 hover:bg-secondary transition-colors"
          >
            {BANNER_CONFIG.text}
          </Link>
        )}
        <Nav/>
        <main>
          <Component {...pageProps} />
          <GoogleAnalytics gaId="G-JKJ6YFE2VZ" />
        </main>
        <Footer />
      </ThemeProvider>
      <Analytics />
    </div>
  );
}


const Footer = () => {
  return (
    <footer>
      <Section>
        <Container className="grid md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-12">
          <div className="flex flex-col gap-6 not-prose">
            <Link href="/">
              <h3 className="sr-only">Sholo Magazine</h3>
              <Image
                src={Logo}
                alt="Logo"
                width={120}
                height={27.27}
                className="dark:invert hover:opacity-75 transition-all"
              ></Image>
            </Link>
            <p>
              <Balancer>{SITE_DESCRIPTION}</Balancer>
            </p>
            <p className="text-muted-foreground text-xs">
              বিঃদ্রঃ ষোলো সম্পূর্ণ অলাভজনক এবং অরাজনৈতিক একটি স্বতন্ত্র উদ্যোগ। ষোলো কোনো নির্দিষ্ট গোষ্ঠী, দল বা সংগঠনকে নয়; বরং আল্লাহকে সন্তুষ্ট করার জন্যই সকল কাজ পরিচালনা করে থাকে।
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base"></h5>
            {Object.entries(mainMenu).map(([key, item]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={item.path}
                href={item.path}
              >
                {item.display}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base"></h5>
            {Object.entries(contentMenu).map(([key, item]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={item.path}
                href={item.path}
              >
                {item.display}
              </Link>
            ))}
          </div>
        </Container>
        <Container className="border-t not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          {/* <ThemeToggle /> */}
          <p className="text-muted-foreground">
            © <a href="https://www.sholo.org">Sholo</a>. All rights reserved.
            2021-present.
          </p>
        </Container>
      </Section>
    </footer>
  );
};
