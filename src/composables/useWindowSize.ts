// ~/composables/useScreenSize.ts
import { ref, onMounted, onUnmounted } from "vue";

export function useScreenSize() {
  const isDesktop = ref(false);
  const isTablet = ref(false);
  const isMobile = ref(false);

  const handleMediaQueryChange = (mediaQuery: MediaQueryList) => {
    if (mediaQuery.matches) {
      if (mediaQuery.media === "(min-width: 1200px)") {
        isDesktop.value = true;
        isTablet.value = false;
        isMobile.value = false;
      } else if (
        mediaQuery.media === "(min-width: 768px) and (max-width: 1199px)"
      ) {
        isDesktop.value = false;
        isTablet.value = true;
        isMobile.value = false;
      } else if (mediaQuery.media === "(max-width: 767px)") {
        isDesktop.value = false;
        isTablet.value = false;
        isMobile.value = true;
      }
    }
  };

  onMounted(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 1200px)");
    const tabletMediaQuery = window.matchMedia(
      "(min-width: 768px) and (max-width: 1199px)"
    );
    const mobileMediaQuery = window.matchMedia("(max-width: 767px)");

    desktopMediaQuery.addEventListener("change", handleMediaQueryChange as any);
    tabletMediaQuery.addEventListener("change", handleMediaQueryChange as any);
    mobileMediaQuery.addEventListener("change", handleMediaQueryChange as any);

    handleMediaQueryChange(desktopMediaQuery);
    handleMediaQueryChange(tabletMediaQuery);
    handleMediaQueryChange(mobileMediaQuery);
  });

  onUnmounted(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 1200px)");
    const tabletMediaQuery = window.matchMedia(
      "(min-width: 768px) and (max-width: 1199px)"
    );
    const mobileMediaQuery = window.matchMedia("(max-width: 767px)");

    desktopMediaQuery.removeEventListener(
      "change",
      handleMediaQueryChange as any
    );
    tabletMediaQuery.removeEventListener(
      "change",
      handleMediaQueryChange as any
    );
    mobileMediaQuery.removeEventListener(
      "change",
      handleMediaQueryChange as any
    );
  });

  return { isDesktop, isTablet, isMobile };
}
