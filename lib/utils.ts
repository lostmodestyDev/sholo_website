import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const copyToClipboard = async (text : string) => {
  if (typeof window !== 'undefined') {
    try {
      await navigator.clipboard.writeText(text);
      // addToast('Link copied to clipboard!', 'success');
    } catch (err) {
      // addToast('Failed to copy link', 'error');
    }
  }
};

