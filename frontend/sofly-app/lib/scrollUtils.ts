/**
 * Utility function to scroll to a section with respect for user's motion preferences
 * @param id - The ID of the element to scroll to
 */
export function scrollToSection(id: string): void {
  if (typeof window === "undefined") return;
  
  const element = document.getElementById(id);
  if (!element) return;
  
  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  element.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}

