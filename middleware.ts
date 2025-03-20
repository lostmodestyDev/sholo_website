import { NextRequest, NextResponse } from 'next/server';
import { gql } from '@apollo/client';
import { getApolloClient } from '@/lib/wordpress';


// GraphQL query to fetch post slug by ID
const GET_POST_SLUG_BY_ID = gql`
  query GetPostSlugById($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      slug
    }
  }
`;

export async function middleware(req: NextRequest) {

  // Get the ID from the request URL
  const { pathname } = req.nextUrl;
  const match = pathname.match(/^\/id\/(\d+)$/);  // Match URLs like /id/123
  
  if (match) {
    const client = getApolloClient();
    const postId = match[1];
    
    try {
      // Query to get the post's slug using the ID

      const { data } = await client.query({
        query: GET_POST_SLUG_BY_ID,
        variables: { id: postId },
      });
      console.log(data);

      // If a post with the ID is found, redirect to the slug URL
      if (data?.post?.slug) {
        const redirectUrl = `/${data.post.slug}`;
        return NextResponse.redirect(new URL(redirectUrl, req.url));
      }

      // If no slug is found, proceed as usual
      return NextResponse.next();
      
    } catch (error) {
      console.error('Error fetching post data:', error);
      return NextResponse.next();  // Proceed without redirect if an error occurs
    }
  }

  // No match, proceed as usual
  return NextResponse.next();
}