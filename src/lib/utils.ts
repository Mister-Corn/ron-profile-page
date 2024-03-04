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

/**
 * Accepts a string. Returns the string.
 *
 * Why? Because using this as a tag template will signal to Prettier to format
 * the content as HTML.
 *
 * @example html`<strong>Hello world!</strong>`
 *
 * @param content - An HTML string.
 * @returns The HTML string.
 */
export function html(content: TemplateStringsArray) {
  return content;
}
