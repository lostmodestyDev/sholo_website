import { getAllCategories, getApolloClient } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/back";
import { gql } from "@apollo/client";
import { Category } from "@/lib/wordpress.d";
import Head from "next/head";


export default function Page({ categories }: { categories: Category[] }) {

  const categoriesWithCount = categories.map( category => {
    const result = {
      name: category.name,
      slug: category.slug,
      totalPosts: category.posts.nodes.length
    }
    return result;
  }).filter(a => a.totalPosts > 0).sort((a,b) => b.totalPosts - a.totalPosts);

  return (
    <Section>
      <Head>
        <title>ক্যাটাগরিসমূহ | ষোলো</title>
      </Head>
      <Container>
        <BackButton />
        <h2>সব বিষয়</h2>
        <div className="flex gap-4 flex-auto max-w-full flex-wrap">
          {categoriesWithCount.filter(c => c.name != "Uncategorized").map((category: any) => (
            <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="px-4 py-2 rounded-lg border border-primary hover:bg-primary-7 hover:text-white transition"
              >
                {category.name} - {category.totalPosts}
              </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}


export async function getStaticProps() {

  const apolloClient = getApolloClient();

  const { data } = await apolloClient.query({
    query: gql`
      query GetAllCategories {
        categories(first: 1000) {
          nodes {
            name
            slug
            posts(first: 1000) {
              nodes {
                id
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      categories: data.categories.nodes,
    }
  }
}
