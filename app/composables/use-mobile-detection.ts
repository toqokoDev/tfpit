import { useMediaQuery } from "@vueuse/core";

// -----------------
// ----- Types -----
// -----------------

/**
 * The composable result.
 */
type UseMobileDetection = {
  /**
   * Indicates if the screen is mobile-sized.
   */
  isMobile: ComputedRef<boolean>;
};

// ----------------------
// ----- Composable -----
// ----------------------

/**
 * Detects if the screen is mobile-sized.
 */
export function useMobileDetection(): UseMobileDetection {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return { isMobile };
}
