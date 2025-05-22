import React from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Facebook, Linkedin, Twitter, } from 'lucide-react';



export const SocialShare = ({ url }: { url: string }) => {

    const handleCopyLink = async () => {
        copyToClipboard(url);
    };

    return (
        <div className="flex gap-4 mx-2 md:my-6 bg-secondary text-white p-8 rounded-2xl">
            ষোলোকে ছড়িয়ে দিন 
            <a
                href={"https://www.facebook.com/sharer/sharer.php?u=" + url}
                target="_blank"
                rel="noreferrer"
                className="transition-transform duration-200 ease-in-out hover:scale-110"
            >
                <Facebook />
            </a>
            <a
                href={'https://twitter.com/intent/tweet?url=' + url}
                target="_blank"
                rel="noreferrer"
                className="transition-transform duration-200 ease-in-out hover:scale-110"
            >
                <Twitter />
            </a><a
                href={'https://www.linkedin.com/shareArticle?url=' + url}
                target="_blank"
                rel="noreferrer"
                className="transition-transform duration-200 ease-in-out hover:scale-110"
            >
                <Linkedin />
            </a>
            <button
                onClick={handleCopyLink}
                className="w-8 transition-transform duration-200 ease-in-out hover:scale-110"
                aria-label="Copy link to clipboard"
            >
                <Copy  />
            </button>
        </div>
    );
};