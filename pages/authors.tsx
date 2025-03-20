import { Section, Container } from "@/components/craft";
import Link from "next/link";
import BackButton from "@/components/back";
import { getApolloClient } from "@/lib/wordpress";
import { gql } from "@apollo/client";
import Head from "next/head";

export default function Page( { authors }) {

  const authorsWithCount = authors.map( author => {
    const result = {
      name: author.name,
      slug: author.slug,
      totalPosts: author.posts.nodes.length
    }
    return result;
  }).filter(a => a.totalPosts > 0).sort((a,b) => b.totalPosts - a.totalPosts);

  return (
    <Section>
      <Head>
        <title>লেখক-লেখিকা | ষোলো</title>
      </Head>
      <Container>
        <BackButton />
        <h2>All Authors</h2>
        <div className="grid">
          {authorsWithCount.map((author: any) => (
            <Link key={author.slug} href={`/author/${author.slug}`}>
              {author.name} | {author.totalPosts}
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
      query GetAllAuthors {
        users {
          nodes {
            name
            slug
            posts {
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
      authors: data.users.nodes,
    }
  }
}
