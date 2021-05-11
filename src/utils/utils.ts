/**
 *
 * @param func callback function to be executed after `wait` time
 * @param wait ms to wiat until execute func
 * @returns debounced function to be executed after the ms `wait` have elapsed
 * since the last time the debounced function was invoked.
 */
 export function debounce(func: any, wait: number, leading?: boolean)  {
    let timeout: NodeJS.Timeout | null;

    function debounced(...args: any[]) {  
      const later = () => {
        timeout = null;
        func(...args);
      };
      if (!!timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(later, wait);
    };
  
    function debounced_leading(...args: any[]) {
      if (!timeout) {
        func(...args);
      }
      if (!!timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
    };
  
    return !!leading ? debounced_leading : debounced;
  };
  