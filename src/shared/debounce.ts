/* eslint-disable no-undef */
export function debounce<T = unknown, U = void>(
  func: (...args: T[]) => U,
  wait = 500,
) {
  let timeout: NodeJS.Timeout | null;

  return function executedFunction(...args: T[]) {
    const later = () => {
      timeout = null;

      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}
