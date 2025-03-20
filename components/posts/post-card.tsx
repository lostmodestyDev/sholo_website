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
  const category = post.categories.nodes[0];
  const hasFeaturedImage = post.featuredImage != null;

  return (
    <Link
      href={`/${post.slug}`}
      className={cn(
        "border p-4 bg-accent/30 rounded-lg group flex justify-between flex-col not-prose gap-8",
        "hover:bg-accent/75 transition-all"
      )}
    >
      <div className="flex flex-col gap-4">
        {hasFeaturedImage && <div className="h-48 w-full overflow-hidden relative rounded-md border flex items-center justify-center">
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
          className="text-xl text-primary font-medium group-hover:underline decoration-muted-foreground underline-offset-4 decoration-dotted transition-all"
        ></div>
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html:
              post.excerpt.split(" ").slice(0, 12).join(" ").trim() +
              "...",
          }}
        ></div>
      </div>

      <div className="flex flex-col gap-4">
        <hr />
        <div className="flex justify-between items-center text-xs">
          <p>{category.name}</p>
          <p>{date}</p>
        </div>
      </div>
    </Link>
  );
}
