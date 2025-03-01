import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleFetchError = async (response: Response): Promise<string> => {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      return errorData.error || 'Something went wrong. Please try again.';
    } catch {
      return response.statusText || 'Something went wrong. Please try again.';
    }
  }
  return '';
};
