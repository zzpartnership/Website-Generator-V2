/** True when the visitor asked for reduced motion. Every primitive branches on this. */
export function prefersReducedMotion() {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Coarse pointer, which is where scroll behaves differently and choreography changes. */
export function isTouch() {
  return typeof matchMedia !== 'undefined' && matchMedia('(pointer: coarse)').matches;
}

/** Selector, element, NodeList or array → array of elements. */
export function resolve(target) {
  if (!target) return [];
  if (typeof target === 'string') return Array.from(document.querySelectorAll(target));
  if (target instanceof Element) return [target];
  return Array.from(target);
}
