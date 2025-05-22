import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { mainMenu, contentMenu } from "@/menu.config";
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";

import { Modal } from '@/components/ui/modal';
import "@/public/globals.css";

import Logo from "@/public/logo.png";


import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ষোলো",
  description:
    "‘ষোলো’ হলো কিশোর-কিশোরী, তরুণ-তরুণীদের জন্য প্রকাশিত ম্যাগাজিন যার লক্ষ্য: কিশোর-কিশোরী ও তরুণ-তরুণীদের ইসলামী মূল্যবোধে দীক্ষিত করে সমাজের দায়িত্বশীল সদস্য হিসেবে গড়ে তোলা।",
  metadataBase: new URL("https://sholo.org"),
};

// Revalidate content every hour
export const revalidate = 3600;
import type { AppProps } from 'next/app'
import Head from "next/head";
import React, { useState } from 'react';
import { findPosts } from "@/lib/wordpress";
import { Post } from "@/lib/wordpress.d";
import { SearchIcon } from "lucide-react";


export const SearchModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const [searchHits, setSearchHits] = useState<Post[] | null>(null);
  const [searchText, setSearchText] = useState('');


  async function search(query: string) {
    const posts = await findPosts(query);
    return posts;
  }

  const _onClose = () => {
    setSearchHits(null);
    setSearchText('');
    onClose && onClose();
  };

  return (
    <Modal isOpen={open} onClose={_onClose} className="max-w-sm">
      <div className="max-w-md">
        <div className="rounded-lg shadow-xl bg-neutral-50">
          <div className="flex">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                let q = searchText;
                if (q.trim().length == 0) {
                  setSearchHits(null);
                } else {
                  search(q).then((posts) => {
                    setSearchHits(posts);
                  });
                }
              }}
            >
              <input
                type="search"
                placeholder="Find what you need..."
                className="w-full px-4 py-2 border-transparent rounded-lg focus:border-transparent active:ring-0 focus:ring-0 font-regular placeholder-neutral-500 bg-neutral-50"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <p className="px-4 py-2 text-xs text-neutral-7">
                Press <code>Enter</code> to search
              </p>
            </form>
          </div>
          {searchHits && (
            <div className="p-4 pt-0">
              <div className="overflow-y-auto max-h-72">
                {searchHits.length == 0 && (
                  <div className="my-4 text-accent-2">
                    No items found
                  </div>
                )}
                {searchHits.map((item) => (
                  <div
                    key={item.id}
                    className="my-4 text-accent-2"
                  >
                    <Link
                      className="link-underline-accent"
                      href={`https://sholo.org/${item.url.split("/").reverse()[1]}`}
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>{metadata.title?.toString()}</title>
        <meta name="description" content="‘ষোলো’ হলো কিশোর-কিশোরী, তরুণ-তরুণীদের জন্য প্রকাশিত ম্যাগাজিন যার লক্ষ্য: কিশোর-কিশোরী ও তরুণ-তরুণীদের ইসলামী মূল্যবোধে দীক্ষিত করে সমাজের দায়িত্বশীল সদস্য হিসেবে গড়ে তোলা।" />
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
        <Nav />
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

const Nav = ({ className, children, id }: NavProps) => {

  const [open, setOpen] = useState(false);

  return (
    <nav
      className={cn(
        "sticky z-50 top-0 bg-background",
        "border-b",
        "fade-in",
        className,
      )}
      id={id}
    >
      <div
        id="nav-container"
        className="max-w-5xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
      >
        <Link
          className="hover:opacity-75 transition-all flex gap-2 items-center"
          href="/"
        >
          <h2 className="sr-only">Sholo</h2>
          <Image
            src={Logo}
            alt="Logo"
            width={84}
            height={30.54}
          ></Image>
        </Link>
        {children}
        <div className="flex items-center gap-2">
          
          <div className="mx-2 hidden md:flex">
            {Object.entries(mainMenu).map(([key, item]) => (
              <Button key={item.path} asChild variant="ghost" size="sm">
                <Link href={item.path}>
                  {item.display}
                </Link>
              </Button>
            ))}

          <button
              onClick={() => {
                setOpen(true);
              }}
              className="p-2 rounded-full cursor-pointer text-neutral-700 hover:bg-neutral-100"
            >
              <SearchIcon />
              <span className="sr-only">search</span>
            </button>
            <SearchModal open={open} onClose={() => setOpen(false)}/>
          </div>
          <Button asChild className="hidden sm:flex">
            <Link href="/get-sholo">ষোলো কিনুন</Link>
          </Button>
          <MobileNav title={metadata.title?.toString()} />
        </div>
      </div>
    </nav>
  );
};

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
              <Balancer>{metadata.description}</Balancer>
            </p>
            <p className="text-muted-foreground text-xs">
              বিঃদ্রঃ ষোলো সম্পূর্ণ অলাভজনক এবং অরাজনৈতিক একটি স্বতন্ত্র উদ্যোগ। ষোলো কোনো নির্দিষ্ট গোষ্ঠী, দল বা সংগঠনকে নয়; বরং আল্লাহকে সন্তুষ্ট করার জন্যই সকল কাজ পরিচালনা করে থাকে।
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
            © <a href="https://sholo.org">Sholo</a>. All rights reserved.
            2021-present.
          </p>
        </Container>
      </Section>
    </footer>
  );
};
