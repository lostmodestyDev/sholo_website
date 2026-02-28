// Craft Imports
import { Section, Container } from "@/components/craft";
import { getApolloClient } from "@/lib/wordpress";
import PostCard from "@/components/posts/post-card";
import { Button } from "@/components/ui/button";

import {
  Category,
  Post,
} from "../lib/wordpress.d";
import { gql } from "@apollo/client";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";

// This page is using the craft.tsx component and design system
export default function Read({
  posts,
  categories
}: {
  posts: Post[]
  categories: Category[]
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
        <title>সব লিখা | ষোলো</title>
        <link rel="canonical" href="https://www.sholo.org/read" />
        <meta name="description" content="’ষোলো’ হলো কিশোর-কিশোরী, তরুণ-তরুণীদের জন্য প্রকাশিত ম্যাগাজিন যার লক্ষ্য: কিশোর-কিশোরী ও তরুণ-তরুণীদের ইসলামী মূল্যবোধে দীক্ষিত করে সমাজের দায়িত্বশীল সদস্য হিসেবে গড়ে তোলা।" />
      </Head>

      <Container>
        <Section>
          <div className="flex flex-wrap gap-2 my-8 ">
            {categories.filter((c) => c.slug != "uncategorized").slice(0, 20).map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="px-4 py-2 rounded-lg border border-primary hover:bg-primary-7 hover:text-white transition"
              >
                {category.name}
              </Link>
            ))}
            <Link
              href={`/categories`}
              className="inline-block px-4 py-2 rounded-lg border text-neutral-50 bg-primary hover:bg-primary-7 transition"
            >
              সব বিষয়
            </Link>
          </div>
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
      posts,
      categories: categoryData.categories.nodes,
    }
  }
}