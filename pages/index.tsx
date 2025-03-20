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
import { getApolloClient } from "@/lib/wordpress";
import PostCard from "@/components/posts/post-card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button, buttonVariants } from "@/components/ui/button";

import {
  Post,
} from "../lib/wordpress.d";
import { gql } from "@apollo/client";
import Head from "next/head";
import { cn } from "@/lib/utils";
import { useState } from "react";

// This page is using the craft.tsx component and design system
export default function Home({
  posts
}: {
  posts: Post[]
}) {

  const LOAD_ONCE = 9;

  const [loaded, setLoaded] = useState(LOAD_ONCE);

  const filteredPosts = posts.slice(0, loaded)
  const totalPosts = posts.length;

  const loadMore = () => {
    setLoaded(loaded + LOAD_ONCE);
  }

  return (
    <Section>
      <Head>
        <title>ষোলো: যে বয়স হারিয়ে যাবার নয়</title> 
        <meta name="description" content="‘ষোলো’ হলো কিশোর-কিশোরী, তরুণ-তরুণীদের জন্য প্রকাশিত ম্যাগাজিন যার লক্ষ্য: কিশোর-কিশোরী ও তরুণ-তরুণীদের ইসলামী মূল্যবোধে দীক্ষিত করে সমাজের দায়িত্বশীল সদস্য হিসেবে গড়ে তোলা।" />
        <meta property="og:title" content="ষোলো: যে বয়স হারিয়ে যাবার নয়" />
        <meta property="og:description" content="‘ষোলো’ হলো কিশোর-কিশোরী, তরুণ-তরুণীদের জন্য প্রকাশিত ম্যাগাজিন যার লক্ষ্য: কিশোর-কিশোরী ও তরুণ-তরুণীদের ইসলামী মূল্যবোধে দীক্ষিত করে সমাজের দায়িত্বশীল সদস্য হিসেবে গড়ে তোলা।" />
      </Head>
      <Container>

        <article className="prose-m-none">
          <div className="bg-gradient-to-b from-primary to-primary-7 w-full rounded-md relative md:py-16 mb-8 md:pl-16 py-8 pl-8">
            <h1 className="font-display w-2/3 text-left p-8 text-primary-0"><b>যে বয়স হারিয়ে <br/>যাবার নয়</b>
            </h1>
            <div className="flex p-2 md:p-8 gap-2 flex-col md:flex-row w-48 justify-items-start z-2 relative">
              <Button asChild className="sm:flex bg-primary-0 text-primary hover:text-primary-0 shadow-lg hover:shadow-2xl">
                <Link href="/get-sholo"><b>ষোলো কিনুন</b></Link>
              </Button>
              <Button asChild className="sm:flex bg-primary-primary text-neutral-50">
                <Link href="/about">আমাদের সম্পর্কে জানুন</Link>
              </Button>
            </div>
            <Image src={cloud} alt="cloud" className="h-20 w-64 absolute -top-8 -left-16 z-0" />
            <Image src={mountain} alt="mountain" className="h-40 w-48 absolute -bottom-3.5 right-0 z-0" />
            <Image src={birds} alt="birds" className="h-40 w-48 absolute top-0 right-16 z-0" />
            <Image src={cloud} alt="cloud" className="h-18 w-48 absolute top-24 -right-16 z-0" />
          </div>
          {/* <p className="border border-secondary p-8 rounded-md font-display my-8">
            কিশোর-কিশোরী, তরুণ-তরুণীরা হলো আমাদের সমাজের সবচেয়ে গুরুত্বপূর্ণ অংশ। কিন্তু তারা অবহেলার শিকার। তাদের নিষ্পাপ, সজীব প্রাণকে বিষাক্ত করার জন্য বিদ্যমান বিশ্ব কাঠামোর প্রতিটি উপাদান একযোগে কাজ করে যাচ্ছে।
            এর বিপরীতে, তাদের (বিশেষ করে স্কুল-কলেজ-ভার্সিটি পড়ুয়াদের) সুস্থ-সুন্দরভাবে বেড়ে উঠার জন্য, এবং সমাজের দায়িত্ববান সদস্য হিসেবে গড়ে তোলার জন্য প্রয়োজনীয় উদ্যোগের বেশ অভাব।
          </p> */}

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4 z-0">
              {filteredPosts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
              <p>No Results Found</p>
            </div>
          )}

          <div className="mt-8 not-prose">
            <Button variant={totalPosts >= loaded ? "outline" : "ghost"} disabled={totalPosts < loaded} onClick={loadMore}>Load More</Button>
            {/* <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={currentPage === 1 ? "pointer-events-none text-muted" : ""}
                    href={`/?page=${Math.max(currentPage - 1, 1)}
                  }`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href={`/?page=${currentPage}`}>
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className={
                      currentPage === totalPages ? "pointer-events-none text-muted" : ""
                    }
                    href={`/?page=${Math.min(currentPage + 1, totalPages)}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination> */}
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

  const posts = data?.data.posts.edges.map(({ node } : {node: any}) => node).map((post : any) => {
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