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

import { Section, Container, Article } from "@/components/craft";
import { Metadata } from "next";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { gql } from '@apollo/client';

import Link from "next/link";
import Balancer from "react-wrap-balancer";
import Head from "next/head";

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

export default function Page({ post, site }: { post: Post, site: Object }) {
  const featuredMedia = post.featuredImage?.node.sourceUrl;
  const author = post.author.node;
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = post.categories ? post.categories.nodes[0] : null;

  return (
    <Section>
    <Head>
      <title>{post.title} | ষোলো</title>        
      <meta name="description" content={post.excerpt} />
      <meta property="og:title" content={`${post.title} | ষোলো`} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content={post.featuredImage?.node?.sourceUrl} />
      <meta property="og:url" content={`sholo.org/${post.slug}`} />
    </Head>
      <Container>
        {featuredMedia && <div className="h-64 mb-12 md:h-[400px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
          {/* eslint-disable-next-line */}
          <img
            className="w-full"
            src={featuredMedia}
            alt={post.title}
          />
        </div> }
        <h1 className="text-left">
          <Balancer>
            <span
              dangerouslySetInnerHTML={{ __html: post.title }}
            ></span>
          </Balancer>
        </h1>

        <div className="gap-4 mb-4">
          <p>
            {date}
            <br/>
            {author.name && (
              <Link href={`/author/${author.slug}`}><u>{author.name}</u>
              </Link>
            )}
          </p>
          {category && <Link
            href={`/category/${category.slug}`}
            className={cn(badgeVariants({ variant: "outline" }), "not-prose")}
          >
            {category.name}
          </Link> }
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

  if (!post) {
    const data = await apolloClient.query({
      query: gql`
        query PageBySlug($slug: ID!) {
          generalSettings {
            title
          }
          page(id: $slug, idType: URI) {
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
      
    const site = {
      ...data?.data.generalSettings
    }
    const post = data?.data.page;

    if(!post) {

      return {
        props: {},
        notFound: true
      }
    }

    return {
      props: {
        post,
        site
      }
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
      query GetAllPostSlugs {
        posts{
          nodes {
            slug
          }
        }
      }
    `,
  });


  const { data: pageData } = await apolloClient.query({
    query: gql`
      query GetAllPageSlugs {
        pages{
          nodes {
            slug
          }
        }
      }
    `,
  });

  const paths = data.posts.nodes.map((node: any) => ({
    params: { slug: node.slug },
  })).concat(pageData.pages.nodes.map((node: any) => ({
    params: { slug: node.slug },
  })));



  return {
    paths,
    fallback: "blocking", // Generates new pages if they don’t exist
  };
}