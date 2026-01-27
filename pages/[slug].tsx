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
import { SocialShare } from "@/components/ui/social-share";

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

export default function Page({ post, site, type }: { post: Post, site: Object, type: "post" | "page" }) {
  const featuredMedia = post.featuredImage?.node.sourceUrl;
  const author = post.author.node;
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const categories = post.categories;

  const contentWithTargetBlank = post.content
    ? post.content.replace(
      /<a\s(?![^>]*\btarget=)[^>]*href=/gi,
      '<a target="_blank" rel="noopener noreferrer" href='
    )
    : "";

  return (
    <Section>
      <Head>
        <title>{post.title} | ষোলো</title>
        <meta name="description" content={post.excerpt} />
        <meta property="image" content={post.featuredImage?.node?.sourceUrl} />
        <meta property="url" content={`sholo.org/${post.slug}`} />
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
        </div>}
        <h1 className="text-left">
          <Balancer>
            <span
              dangerouslySetInnerHTML={{ __html: post.title }}
            ></span>
          </Balancer>
        </h1>

        {type == "post" &&
          <div><div className="gap-4 mb-4">
            <p>
              {date}
              <br />
              {author.name && (
                <Link href={`/author/${author.slug}`}><u>{author.name}</u>
                </Link>
              )}
            </p>
            {categories.nodes.map(category =>
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="inline-block px-4 py-2 text-sm rounded-lg border border-primary hover:bg-primary-7 hover:text-white transition mr-2"
              >
                {category.name}
              </Link>
            )}
          </div>
          </div>
        }
        <Article dangerouslySetInnerHTML={{ __html: contentWithTargetBlank }} />

        <SocialShare url={`https://sholo.org/${post.slug}`} />

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

    if (!post) {

      return {
        props: {},
        notFound: true
      }
    }

    return {
      props: {
        post,
        site,
        type: "page"
      }
    }

  }

  const site = {
    ...data?.data.generalSettings
  }

  return {
    props: {
      post,
      site,
      type: "post"
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