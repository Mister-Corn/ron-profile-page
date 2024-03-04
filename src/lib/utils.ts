import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string.
 *
 * If combining Tailwind classes, 'tailwind-merge' is used to resolve conflicting
 * classes.
 *
 * @param inputs - The class names to be combined.
 * @returns The combined class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
