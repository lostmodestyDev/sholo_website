// Craft Imports
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";

import Link from "next/link";
import Image from "next/image";

import birds from "../public/birds.png";
import cloud from "../public/cloud.png";
import mountain from "../public/mountain.png";
import blob1 from "../public/blob-1.svg";
import blob2 from "../public/blob-2.svg";
import blob3 from "../public/blob-3.svg";
import image1 from "../public/image 1.png";
import image2 from "../public/image 2.png";
import image3 from "../public/image 3.png";
import image4 from "../public/image 4.png";
import image5 from "../public/image 5.png";
import image6 from "../public/image 6.png";
import quote from "../public/quote.svg";
import { getApolloClient } from "@/lib/wordpress";
import PostCard from "@/components/posts/post-card";
import { Button } from "@/components/ui/button";
import { TestimonialsSection } from "@/components/ui/testimonials-section";

import {
  Category,
  Post,
} from "../lib/wordpress.d";
import { gql } from "@apollo/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Extracted constants
type ImpactItem = {
  id: string;
  label: string;
  sub: string;
  image: any;
};

const IMPACT_ITEMS: ImpactItem[] = [
  {
    id: "impact-1",
    label: "৫৪,৭৬০",
    sub: "কপি বিক্রি",
    image: blob1
  },
  {
    id: "impact-2",
    label: "৩০,০০০+",
    sub: "পাঠক",
    image: blob2
  },
  {
    id: "impact-3",
    label: "১৭৪",
    sub: "পাঠচক্র",
    image: blob3
  },
];

import React from 'react';
const MasonryGallery = () => {
  // Sample images - replace with your actual image data
  const images = [
    {
      id: 1,
      src: image1,
      alt: 'Classroom session',
      span: 'row-span-2 col-span-2'
    },
    {
      id: 2,
      src: image2,
      alt: 'Outdoor gathering',
      span: 'row-span-1'
    },
    {
      id: 4,
      src: image4,
      alt: 'Students studying',
      span: 'row-span-2 col-span-2'
    },
    {
      id: 6,
      src: image6,
      alt: 'Resources display',
      span: 'row-span-1'
    },
    {
      id: 5,
      src: image5,
      alt: 'Group assembly',
      span: 'row-span-1'
    },
    {
      id: 3,
      src: image3,
      alt: 'Teaching moment',
      span: 'row-span-1'
    },
  ];

  return (
    <div className="w-full mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className={`${image.span} overflow-hidden rounded-lg shadow-lg hover:scale-[1.02] transition-transform duration-300`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// This page is using the craft.tsx component and design system
export default function Home({
  posts,
  categories
}: {
  posts: Post[]
  categories: Category[]
}) {

  const LOAD_ONCE = 9;

  const [loaded, setLoaded] = useState(LOAD_ONCE);

  const filteredPosts = posts.slice(0, loaded)

  const [heroTitleIndex, setHeroTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTitleIndex((prev) => (prev + 1) % HERO_TITLES.length)
    }, 2500);

    return () => clearInterval(interval);
  }, [])

  const HERO_TITLES = [
    "তৈরি করার",
    "উদ্যমী হবার",
    "সমাজের ভুল ভাঙ্গার",
    "হারিয়ে যাবার নয়",
  ]

  return (
    <div>
      <Head>
        <title>ষোলো: যে বয়স হারিয়ে যাবার নয়</title>
        <link rel="canonical" href="https://www.sholo.org/" />
        <meta name="description" content="’ষোলো’ হলো কিশোর-কিশোরী, তরুণ-তরুণীদের জন্য প্রকাশিত ম্যাগাজিন যার লক্ষ্য: কিশোর-কিশোরী ও তরুণ-তরুণীদের ইসলামী মূল্যবোধে দীক্ষিত করে সমাজের দায়িত্বশীল সদস্য হিসেবে গড়ে তোলা।" />
        <meta property="og:title" content="ষোলো: যে বয়স হারিয়ে যাবার নয়" />
        <meta property="og:description" content="’ষোলো’ হলো কিশোর-কিশোরী, তরুণ-তরুণীদের জন্য প্রকাশিত ম্যাগাজিন যার লক্ষ্য: কিশোর-কিশোরী ও তরুণ-তরুণীদের ইসলামী মূল্যবোধে দীক্ষিত করে সমাজের দায়িত্বশীল সদস্য হিসেবে গড়ে তোলা।" />
        <meta property="og:url" content="https://www.sholo.org/" />
      </Head>
      <div className="bg-gradient-to-br from-primary via-primary-7 to-primary w-full relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <Image src={cloud} alt="cloud" className="absolute -top-8 -left-16 z-0 md:h-1/4 md:w-1/3 opacity-30 animate-[float_6s_ease-in-out_infinite]" />
        <Image src={cloud} alt="cloud" className="md:h-1/6 md:w-1/4 absolute top-60 md:right-24 -right-2 z-0 opacity-20 hidden md:block animate-[float_8s_ease-in-out_infinite]" />
        <Image src={birds} alt="birds" className="h-48 w-64 absolute top-24 md:right-1/4 right-2 z-0 opacity-40 animate-[float_4s_ease-in-out_infinite]" />

        <div className="max-w-6xl mx-auto px-6 md:px-16 py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left content */}
            <div>
              <h1 className="font-display text-left text-primary-0 m-0 text-4xl md:text-6xl leading-tight">
                <span className="block mb-2">যে বয়স</span>
                <span className="block min-h-[1.2em] text-secondary-2">
                  {HERO_TITLES[heroTitleIndex].split(" ").map((text, idx) => (
                    <b key={`${heroTitleIndex}-${idx}`} className="inline-block animate-[fadeInUp_0.5s_ease-out_forwards] mr-3" style={{ animationDelay: `${idx * 0.1}s` }}>
                      {text}
                    </b>
                  ))}
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-white/90 max-w-lg leading-relaxed">
                কিশোর-কিশোরী, তরুণ-তরুণীরা সুস্থ-সুন্দরভাবে বেড়ে উঠার জন্য, এবং সমাজের দায়িত্ববান সদস্য হিসেবে গড়ে তোলার জন্য উদ্যোগ।
              </p>

              <div className="flex mt-8 gap-4 flex-col sm:flex-row">
                <Button asChild size="lg" className="bg-secondary-8 hover:bg-secondary shadow-lg hover:shadow-2xl hover:scale-105 transition-all text-lg px-8 py-6">
                  <Link href="/subscribe">
                    <b>সাবস্ক্রাইব করুন</b>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6">
                  <Link href="/about">আমাদের সম্পর্কে জানুন</Link>
                </Button>
              </div>

              {/* Stats row */}
              <div className="flex gap-8 mt-10 text-white/90">
                {IMPACT_ITEMS.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    {idx > 0 && <div className="w-px bg-white/30"></div>}
                    <div>
                      <div className="text-2xl md:text-3xl font-bold">{item.label}</div>
                      <div className="text-sm opacity-75">{item.sub}</div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right content - Magazine cover */}
            <div className="hidden md:flex justify-center items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-secondary/30 rounded-2xl blur-2xl transform rotate-6"></div>
                <div className="relative bg-white p-3 rounded-2xl shadow-2xl transform hover:rotate-0 rotate-3 transition-transform duration-300">
                  <Image
                    src="https://cms.sholo.info/wp-content/uploads/2026/01/Sholo-10-Cover.jpg"
                    alt="Sholo Magazine Cover"
                    width={300}
                    height={400}
                    className="rounded-xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-secondary-8 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    নতুন সংখ্যা!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Container>
      <TestimonialsSection />

      <Button className="w-full mx-auto h-40 bg-primary my-16 rounded-2xl border-b-8 border-primary-7 active:border-b-0 active:border-t-8 active:border-neutral-50 transition-none">
        <Link href="/subscribe" className="text-5xl font-display w-full">
          সাবস্ক্রাইব
        </Link>
      </Button>

      <Section>
        <h2 className="font-display text-2xl font-bold">আছে অনেক মজার মজার শিক্ষণীয় বিষয়</h2>
        <div className="flex flex-wrap gap-2 my-8 ">
          {categories.filter((c) => c.slug != "uncategorized").slice(0, 20).map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="inline-block px-4 py-2 rounded-lg border border-primary hover:bg-primary-7 hover:text-white transition"
            >
              {category.name}
            </Link>
          ))}
          <Link
            href={`/read`}
            className="inline-block px-4 py-2 rounded-lg border text-neutral-50 bg-primary hover:bg-primary-7 transition"
          >
            সব লিখা
          </Link>
        </div>
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4 z-0">
            {filteredPosts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
            <Link
              href={`/contact`}
              className={cn(
                "border-dashed border-4 p-4 border-primary rounded-xl group flex justify-between flex-col not-prose gap-8",
                "hover:bg-primary-0 transition-all hover:border-primary-7"
              )}
            >
              <div className="flex flex-col gap-4">
                <div className="h-48 w-full overflow-hidden relative rounded-xl border flex items-center justify-center">
                  <Image
                    className="h-full w-full object-cover"
                    src="https://cms.sholo.info/wp-content/uploads/2024/01/likte.png"
                    alt="Write for Sholo"
                    width={400}
                    height={200}
                  />
                </div>
                <div
                  className="text-2xl text-display font-medium decoration-muted-foreground underline-offset-4 decoration-dotted transition-all"
                >তোমার লিখা ষোলোতে দেখতে চাও?</div>
                <div
                  className="text-sm"
                >তোমার কি লেখালেখি করতে ভালো লাগে? তোমার লিখা আমাদের কাছে পাঠিয়ে দাও এবং পৌঁছে যাও হাজারও কিশোর-তরুণদের কাছে</div>
              </div>

              <div className="flex flex-col gap-4">
                <hr />
                <div className="flex justify-between items-center text-xs">
                  <p></p>
                  <p>TODAY</p>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
            <p>No Results Found</p>
          </div>
        )}

      </Section>
      <Section>
        <h2 className="font-display text-2xl font-bold"></h2>

        <MasonryGallery />

      </Section>
      </Container>
    </div>
  );
}


export async function getStaticProps() {
  const apolloClient = getApolloClient();

  const { data: categoryData } = await apolloClient.query({
    query: gql`
      query GetAllCategories {
        categories(first: 1000) {
          nodes {
            name
            slug
          }
        }
      }
    `,
  });

  const data = await apolloClient.query({
    query: gql`
      {
        generalSettings {
          title
          description
        }
        posts(first: 2) {
          edges {
            node {
              id
              excerpt
              title
              slug
              date
              featuredImage {
                node {
                  sourceUrl
                }
              }
              categories {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    `,
  });

  const posts = data?.data.posts.edges.map(({ node }: { node: any }) => node).map((post: any) => {
    return {
      ...post,
      path: `/${post.slug}`
    }
  });

  const page = {
    ...data?.data.generalSettings
  }

  return {
    props: {
      page,
      posts,
      categories: categoryData.categories.nodes,
    }
  }
}