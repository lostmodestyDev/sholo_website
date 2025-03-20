import { getAllCategories, getApolloClient } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/back";
import { gql } from "@apollo/client";
import { Category } from "@/lib/wordpress.d";

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "All Categories",
//     description: "Browse all categories on the site.",
//   };
// }

export default function Page({categories} : {categories: Category[]}) {

  return (
    <Section>
      <Container>
        <BackButton />
        <h2>All Categories</h2>
        <div className="grid">
          {categories.map((category: any) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              {category.name}
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
        categories {
          nodes {
            name
            slug
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
