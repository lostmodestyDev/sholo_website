// Craft Imports
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";

// Components
import Link from "next/link";

// Icons
import { File, Pen, Tag, Boxes, User, Folder } from "lucide-react";
import Image from "next/image";

import birds from "../public/birds.png";
import cloud from "../public/cloud.png";
import mountain from "../public/mountain.png";
import FilterPosts from "./posts/filter";
import { getAllAuthors, getAllCategories, getAllPostCount, getAllPosts, getAllTags } from "@/lib/wordpress";
import PostCard from "@/components/posts/post-card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

// This page is using the craft.tsx component and design system
export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <Section>
      <Container>
        <HomePage searchParams={searchParams} />
      </Container>
    </Section>
  );
}

async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { author, tag, category, page: pageParam } = searchParams;
  const postsPerPage = 9;
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const posts = await getAllPosts({ author, tag, category, page, perPage: postsPerPage });
  const count = await getAllPostCount({ author, tag, category });
  const authors = await getAllAuthors();
  const tags = await getAllTags();
  const categories = await getAllCategories();

  const totalPages = Math.ceil(count / postsPerPage);

  return (
    <article className="prose-m-none">
      <div className="bg-gradient-to-b from-primary to-primary-7 w-full rounded-md relative">
        <h1 className="font-display w-1/3 p-16 ml-12 text-primary-0"><b>যে বয়স হারিয়ে যাবার নয়</b>
          <Button asChild className="hidden sm:flex bg-primary-0">
            <Link href="/get-sholo">Get Sholo</Link>
          </Button>
          <Button asChild className="hidden sm:flex bg-primary-primary text-neutral-950">
            <Link href="/get-sholo">Read Sholo</Link>
          </Button>
        </h1>
        <Image src={cloud} alt="cloud" className="h-18 w-48 absolute top-5 -left-16 z-0" />
        <Image src={mountain} alt="mountain" className="h-40 w-48 absolute -bottom-8 right-0 z-0" />
        <Image src={birds} alt="birds" className="h-40 w-48 absolute top-0 right-16 z-0" />
        <Image src={cloud} alt="cloud" className="h-18 w-48 absolute -top-6 -right-16 z-0" />
      </div>
      <p className="border border-secondary p-8 rounded-md">
        কিশোর-কিশোরী, তরুণ-তরুণীরা হলো আমাদের সমাজের সবচেয়ে গুরুত্বপূর্ণ অংশ। কিন্তু তারা অবহেলার শিকার। তাদের নিষ্পাপ, সজীব প্রাণকে বিষাক্ত করার জন্য বিদ্যমান বিশ্ব কাঠামোর প্রতিটি উপাদান একযোগে কাজ করে যাচ্ছে।
        এর বিপরীতে, তাদের (বিশেষ করে স্কুল-কলেজ-ভার্সিটি পড়ুয়াদের) সুস্থ-সুন্দরভাবে বেড়ে উঠার জন্য, এবং সমাজের দায়িত্ববান সদস্য হিসেবে গড়ে তোলার জন্য প্রয়োজনীয় উদ্যোগের বেশ অভাব।
      </p>

      <FilterPosts
        authors={authors}
        tags={tags}
        categories={categories}
        selectedAuthor={author}
        selectedTag={tag}
        selectedCategory={category}
      />

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
                href={`/?page=${Math.max(page - 1, 1)}${category ? `&category=${category}` : ""
                  }${author ? `&author=${author}` : ""}${tag ? `&tag=${tag}` : ""
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
                href={`/?page=${Math.min(page + 1, totalPages)}${category ? `&category=${category}` : ""
                  }${author ? `&author=${author}` : ""}${tag ? `&tag=${tag}` : ""
                  }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </article>
  );
};
