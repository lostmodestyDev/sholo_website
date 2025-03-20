// Craft Imports
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";

// Components
import Link from "next/link";

// Icons
import { File, Pen, TagIcon, Boxes, User, Folder } from "lucide-react";
import Image from "next/image";

import birds from "../public/birds.png";
import cloud from "../public/cloud.png";
import mountain from "../public/mountain.png";
import FilterPosts from "../components/filter";
import { getAllAuthors, getAllCategories, getAllPostCount, getAllPosts, getAllTags, getApolloClient } from "@/lib/wordpress";
import PostCard from "@/components/posts/post-card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  Post,
} from "../lib/wordpress.d";
import { gql } from "@apollo/client";
import Head from "next/head";

// This page is using the craft.tsx component and design system
export default function Home({
  searchParams,
  posts
}: {
  searchParams: { [key: string]: string | undefined };
  posts: Post[]
}) {

  const { page: pageParam } = { page: "1" };
  const postsPerPage = 9;
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const totalPages = Math.ceil(100 / postsPerPage);

  return (
    <Section>
      <Head>
        <title>ষোলো: যে বয়স হারিয়ে <br/>যাবার নয়</title>
      </Head>
      <Container>

        <article className="prose-m-none">
          <div className="bg-gradient-to-b from-primary to-primary-7 w-full rounded-md relative pt-16 mb-8">
            <h1 className="font-display w-2/3 text-left p-8 text-primary-0"><b>যে বয়স হারিয়ে <br/>যাবার নয়</b>
            </h1>
            <div className="flex p-8 gap-2 flex-col md:flex-row w-48 justify-items-start">
              <Button asChild className="sm:flex bg-primary-0 text-primary hover:text-primary-0 shadow-lg hover:shadow-2xl">
                <Link href="/get-sholo"><b>ষোলো কিনুন</b></Link>
              </Button>
              <Button asChild className="sm:flex bg-primary-primary text-neutral-50">
                <Link href="/about">আমাদের সম্পর্কে জানুন</Link>
              </Button>
            </div>
            <Image src={cloud} alt="cloud" className="h-18 w-48 absolute top-5 -left-16 z-0" />
            <Image src={mountain} alt="mountain" className="h-40 w-48 absolute -bottom-3.5 right-0 z-0" />
            <Image src={birds} alt="birds" className="h-40 w-48 absolute top-0 right-16 z-0" />
            <Image src={cloud} alt="cloud" className="h-18 w-48 absolute -top-6 -right-16 z-0" />
          </div>
          {/* <p className="border border-secondary p-8 rounded-md font-display my-8">
            কিশোর-কিশোরী, তরুণ-তরুণীরা হলো আমাদের সমাজের সবচেয়ে গুরুত্বপূর্ণ অংশ। কিন্তু তারা অবহেলার শিকার। তাদের নিষ্পাপ, সজীব প্রাণকে বিষাক্ত করার জন্য বিদ্যমান বিশ্ব কাঠামোর প্রতিটি উপাদান একযোগে কাজ করে যাচ্ছে।
            এর বিপরীতে, তাদের (বিশেষ করে স্কুল-কলেজ-ভার্সিটি পড়ুয়াদের) সুস্থ-সুন্দরভাবে বেড়ে উঠার জন্য, এবং সমাজের দায়িত্ববান সদস্য হিসেবে গড়ে তোলার জন্য প্রয়োজনীয় উদ্যোগের বেশ অভাব।
          </p> */}

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4 z-0">
              {posts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
              <p>No Results Found</p>
            </div>
          )}

          <div className="mt-8 not-prose">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={page === 1 ? "pointer-events-none text-muted" : ""}
                    href={`/?page=${Math.max(page - 1, 1)}
                  }`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href={`/?page=${page}`}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className={
                      page === totalPages ? "pointer-events-none text-muted" : ""
                    }
                    href={`/?page=${Math.min(page + 1, totalPages)}
                  }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </article>
      </Container>
    </Section>
  );
}


export async function getStaticProps() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        generalSettings {
          title
          description
        }
        posts(first: 10000) {
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

  const posts = data?.data.posts.edges.map(({ node }) => node).map(post => {
    return {
      ...post,
      path: `/posts/${post.slug}`
    }
  });

  const page = {
    ...data?.data.generalSettings
  }

  return {
    props: {
      page,
      posts
    }
  }
}