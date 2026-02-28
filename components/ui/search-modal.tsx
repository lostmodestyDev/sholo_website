import { useState } from "react";
import Link from "next/link";
import { Modal } from "@/components/ui/modal";
import { findPosts } from "@/lib/wordpress";
import { Post } from "@/lib/wordpress.d";

export const SearchModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const [searchHits, setSearchHits] = useState<Post[] | null>(null);
  const [searchText, setSearchText] = useState('');

  async function search(query: string) {
    const posts = await findPosts(query);
    return posts;
  }

  const _onClose = () => {
    setSearchHits(null);
    setSearchText('');
    onClose && onClose();
  };

  return (
    <Modal isOpen={open} onClose={_onClose} className="max-w-sm">
      <div className="max-w-md" autoFocus>
        <div className="rounded-lg shadow-xl bg-neutral-50">
          <div className="flex">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = searchText;
                if (q.trim().length === 0) {
                  setSearchHits(null);
                } else {
                  search(q).then((posts) => {
                    setSearchHits(posts);
                  });
                }
              }}
            >
              <input
                type="search"
                placeholder="Find what you need..."
                className="w-full px-4 py-2 border-transparent rounded-lg focus:border-transparent focus:ring-0 font-regular placeholder-neutral-500"
                value={searchText}
                autoFocus
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <p className="px-4 py-2 text-xs text-neutral-7">
                Press <code>Enter</code> to search
              </p>
            </form>
          </div>
          {searchHits && (
            <div className="p-4 pt-0">
              <div className="overflow-y-auto max-h-72">
                {searchHits.length === 0 && (
                  <div className="my-4 text-accent-2">
                    No items found
                  </div>
                )}
                {searchHits.map((item) => (
                  <div key={item.id} className="my-4 text-accent-2">
                    <Link
                      className="link-underline-accent"
                      href={`https://www.sholo.org/${item.url.split("/").reverse()[1]}`}
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
