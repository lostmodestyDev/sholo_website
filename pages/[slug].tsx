import {
  getPostBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
  getApolloClient,
} from "@/lib/wordpress";

import {
  Post,
  Category,
  Tag,
  Author,
  FeaturedMedia,
} from "@/lib/wordpress.d";

import { Section, Container, Article} from "@/components/craft";
import { Metadata } from "next";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { gql } from '@apollo/client';

import Link from "next/link";
import Balancer from "react-wrap-balancer";

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   const post = await getPostBySlug(params.slug);
//   return {
//     title: post.title.rendered,
//     description: post.excerpt.rendered,
//   };
// }

export default function Page({ post, site }: {  post: Post, site: Object }) {
  const featuredMedia = post.featuredImage?.node.sourceUrl;
  const author = post.author.node;
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = post.categories.nodes[0];

  return (
    <Section>
      <Container>
        <h1>
          <Balancer>
            <span
              dangerouslySetInnerHTML={{ __html: post.title }}
            ></span>
          </Balancer>
        </h1>

        <div className="flex justify-between items-center gap-4 text-sm mb-4">
          <h5>
            Published {date} by{" "}
            {author.name && (
              <span>
                <a href={`/posts/?author=${author.slug}`}>{author.name}</a>{" "}
              </span>
            )}
          </h5>
          <Link
            href={`/category/${category.slug}`}
            className={cn(badgeVariants({ variant: "outline" }), "not-prose")}
          >
            {category.name}
          </Link>
        </div>
        <div className="h-96 my-12 md:h-[560px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
          {/* eslint-disable-next-line */}
          <img
            className="w-full"
            src={featuredMedia}
            alt={post.title}
          />
        </div>
        <Article dangerouslySetInnerHTML={{ __html: post.content }} />
      </Container>
    </Section>
  );
}


export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const apolloClient = getApolloClient()

  const data = await apolloClient.query({
    query: gql`
      query PostBySlug($slug: String!) {
        generalSettings {
          title
        }
        postBy(slug: $slug) {
          id
          title
          slug
          date
          content
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            nodes {
              slug
              name
            }
          }
          author {
            node {
              slug
              name
            }
          }
        }
      }
    `,
    variables: {
      slug: slug
    }
  });

  const post = data?.data.postBy;

  if ( !post ) {
    return {
      props: {},
      notFound: true
    }
  }

  const site = {
    ...data?.data.generalSettings
  }

  return {
    props: {
      post,
      site
    }
  }
}

export async function getStaticPaths() {
  
  const apolloClient = getApolloClient()
  const { data } = await apolloClient.query({
    query: gql`
      query GetAllSlugs {
        posts{
          nodes {
            slug
          }
        }
      }
    `,
  });

  const paths = data.posts.nodes.map((node) => ({
    params: { slug: node.slug },
  }));

  return {
    paths,
    fallback: "blocking", // Generates new pages if they don’t exist
  };
}