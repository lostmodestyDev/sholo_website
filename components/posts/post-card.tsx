import Image from "next/image";
import Link from "next/link";

import { Post } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";

export default function PostCard({ post }: { post: Post }) {
  // const author = await getAuthorById(post.author);
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const categories = post.categories;
  const hasFeaturedImage = post.featuredImage != null;

  return (
    <Link
      href={`/${post.slug}`}
      className={cn(
        "border-2 p-4 border-primary rounded-xl group flex justify-between flex-col not-prose gap-8",
        "hover:bg-primary-0 transition-all hover:border-primary-7"
      )}
    >
      <div className="flex flex-col gap-4">
        {hasFeaturedImage && <div className="h-48 w-full overflow-hidden relative rounded-xl border flex items-center justify-center">
          <Image
            className="h-full w-full object-cover"
            src={post.featuredImage?.node.sourceUrl}
            alt={post.title}
            width={400}
            height={200}
          />
        </div> }
        <div
          dangerouslySetInnerHTML={{ __html: post.title }}
          className="text-2xl text-display font-medium decoration-muted-foreground underline-offset-4 decoration-dotted transition-all"
        ></div>
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html:
              post.excerpt.split(" ").slice(0, 20).join(" ").trim() +
              "...",
          }}
        ></div>
      </div>

      <div className="flex flex-col gap-4">
        <hr />
        <div className="flex justify-between items-center text-xs">
          <p>{categories.nodes.map( category => category.name).join(", ") }</p>
          <p>{date}</p>
        </div>
      </div>
    </Link>
  );
}
