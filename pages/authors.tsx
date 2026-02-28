import { Section, Container } from "@/components/craft";
import Link from "next/link";
import BackButton from "@/components/back";
import { getApolloClient } from "@/lib/wordpress";
import { gql } from "@apollo/client";
import Head from "next/head";
import { Author } from "@/lib/wordpress.d";

export default function Page( { authors } : {authors: Author[]}) {

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
        <link rel="canonical" href="https://www.sholo.org/authors" />
      </Head>
      <Container>
        <BackButton />
        <h2>সব লেখক লেখিকা</h2>
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
        users(first: 1000) {
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
      authors: data.users.nodes,
    }
  }
}
