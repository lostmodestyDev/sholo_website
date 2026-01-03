// Craft Imports
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";

import Link from "next/link";
import Image from "next/image";

import birds from "../public/birds.png";
import cloud from "../public/cloud.png";
import mountain from "../public/mountain.png";
import { getApolloClient } from "@/lib/wordpress";
import PostCard from "@/components/posts/post-card";
import { Button } from "@/components/ui/button";

import {
  Post,
} from "../lib/wordpress.d";
import { gql } from "@apollo/client";
import Head from "next/head";
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
    <div>
      <Head>
        <title>ষোলো: যে বয়স হারিয়ে যাবার নয়</title>
        <meta name="description" content="‘ষোলো’ হলো কিশোর-কিশোরী, তরুণ-তরুণীদের জন্য প্রকাশিত ম্যাগাজিন যার লক্ষ্য: কিশোর-কিশোরী ও তরুণ-তরুণীদের ইসলামী মূল্যবোধে দীক্ষিত করে সমাজের দায়িত্বশীল সদস্য হিসেবে গড়ে তোলা।" />
        <meta property="og:title" content="ষোলো: যে বয়স হারিয়ে যাবার নয়" />
        <meta property="og:description" content="‘ষোলো’ হলো কিশোর-কিশোরী, তরুণ-তরুণীদের জন্য প্রকাশিত ম্যাগাজিন যার লক্ষ্য: কিশোর-কিশোরী ও তরুণ-তরুণীদের ইসলামী মূল্যবোধে দীক্ষিত করে সমাজের দায়িত্বশীল সদস্য হিসেবে গড়ে তোলা।" />
      </Head>

      <Container>
        <Section>
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
          </div>
        </Section>
      </Container>
    </div>
  );
}


export async function getStaticProps() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
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

  const posts = data?.data.posts.edges.map(({ node }: { node: any }) => node).map((post: any) => {
    return {
      ...post,
      path: `/${post.slug}`
    }
  });

  return {
    props: {
      posts
    }
  }
}