import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class values into a single string, handling conditional and array-based class names,
 * and merges Tailwind CSS classes intelligently to prevent duplicates and conflicts.
 *
 * @param inputs - A list of class values (strings, arrays, or objects) to be combined.
 * @returns A single string of merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
