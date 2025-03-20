// Craft Imports
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";

// Components
import Link from "next/link";

// Icons
import { File, Pen, TagIcon, Boxes, User, Folder } from "lucide-react";
import Image from "next/image";

import { getAllAuthors, getAllCategories, getAllPostCount, getAllPosts, getAllTags, getApolloClient } from "@/lib/wordpress";
import PostCard from "@/components/posts/post-card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  Post,
  Category,
  Tag,
  Page,
  Author,
  FeaturedMedia,
} from "@/lib/wordpress.d";
import { gql } from "@apollo/client";
import Head from "next/head";

// This page is using the craft.tsx component and design system
export default function Home({
  searchParams,
  posts,
  name,
}: {
  searchParams: { [key: string]: string | undefined };
  posts: Post[],
  name: string,
}) {

  const { page: pageParam } = { page: "1" };
  const postsPerPage = 9;
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const totalPages = Math.ceil(100 / postsPerPage);

  return (
    <Section>
      <Head>
        <title>{name} @ ষোলো</title>
      </Head>
      <Container>

        <article className="prose-m-none">

          <h2>{name}</h2>
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




export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const apolloClient = getApolloClient()

  const data = await apolloClient.query({
    query: gql`
      query PostsByUserSlug($id: ID!) {
        generalSettings {
          title
        }
          user(id: $id, idType: SLUG) {
          name
          posts(first: 10000) {
            nodes {
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
    variables: {
      id: slug
    }
  });

  const site = {
    ...data?.data.generalSettings
  }

  return {
    props: {
      posts: data?.data.user.posts.nodes,
      name: data?.data.user.name,
      site
    }
  }
}

export async function getStaticPaths() {

  const apolloClient = getApolloClient()
  const { data } = await apolloClient.query({
    query: gql`
      query GetAllSlugs {
        users {
          nodes {
            slug
          }
        }
      }
    `,
  });

  const paths = data.users.nodes.map((node) => ({
    params: { slug: node.slug },
  }));

  return {
    paths,
    fallback: "blocking", // Generates new pages if they don’t exist
  };
}