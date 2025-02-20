import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import {useSelectedStore} from "@/stores/selected.store"

export const useCarousel = (data: { id: number; download_url: string }[]) => {
	const selectedStore = useSelectedStore()
	const container = ref<HTMLElement | null>(null);
	const itemWidth = ref(0);
	const windowWidth = ref(window.innerWidth);
	const activeIndex = ref(0);
	const activeFotoId = ref<number | null>(null); 

	// Number of items based on screen size
	const visibleItems = computed(() => {
	if (windowWidth.value < 640) return 1;  
	if (windowWidth.value < 768) return 2;
	if (windowWidth.value < 1024) return 3; 
	if (windowWidth.value < 1280) return 4;
	return 5; 
	});

	// Calculate the width of an item
	const calculateItemWidth = () => {
	if (!container.value) return;
	const containerWidth = container.value.clientWidth;
	itemWidth.value = containerWidth / visibleItems.value;
	};

	// Scroll to the next item
	const next = () => {
	if (!container.value) return;

	container.value.scrollBy({
		left: itemWidth.value,
		behavior: "smooth",
	});

	  // Update active index
	activeIndex.value = (activeIndex.value + 1) % data.length;
 	  // Check the end
	const { scrollLeft, scrollWidth, clientWidth } = container.value;
	if (scrollLeft + clientWidth >= scrollWidth) {
		setTimeout(() => {
			if (container.value) {
			container.value.scrollTo({ left: 0, behavior: "auto" });
			}
		 }, 300); // Wait for the smooth scroll to finish
	}
	};

	// Scroll to the previous item
	const previous = () => {
	if (!container.value) return;

	container.value.scrollBy({
		left: - itemWidth.value,
		behavior: "smooth",
	});

	  // Update active index
	activeIndex.value = (activeIndex.value - 1 + data.value.length) % data.value.length;

	  // Check if we've reached start
	const { scrollLeft } = container.value;
	if (scrollLeft === 0) {
		 // Jump to the end 
		setTimeout(() => {
			if (container.value) {
			container.value.scrollTo({
				left: container.value.scrollWidth,
				behavior: "smooth",
			});
			}
		}, 300); 
	}
	};

	// Go to a specific item
	const goTo = (index: number) => {
	if (!container.value) return;
	container.value.scrollTo({
		 left: index * itemWidth.value,
		behavior: "smooth",
	});
	activeIndex.value = index;
	};

	// Set the active foto when clicked
	const setActiveFoto = (id: number) => {
		activeFotoId.value = id; 
		const selectedFoto = data?.value.find(foto => foto.id === id);
		if (selectedFoto) {
			const alreadyExists = selectedStore.selected.items.some(item => item.id === id);
			if (!alreadyExists) {
				selectedStore.selected.items.push(selectedFoto);
			}
		};
		console.log(selectedStore.selected.items)
	}

	// Watch for window resize
	watch(windowWidth, () => {
	calculateItemWidth();
	});

	// Update window width on resize
	const updateWindowWidth = () => {
	windowWidth.value = window.innerWidth;
	};

	// Handle scroll events to update the active index
	const handleScroll = () => {
	if (!container.value) return;

	const { scrollLeft } = container.value;
	const index = Math.round(scrollLeft / itemWidth.value) % data.value.length;
	activeIndex.value = index;
	};

	onMounted(() => {
	calculateItemWidth(); 
	window.addEventListener("resize", updateWindowWidth);
	if (container.value) {
		container.value.addEventListener("scroll", handleScroll);
	}
	});

	onUnmounted(() => {
	window.removeEventListener("resize", updateWindowWidth);
	if (container.value) {
		container.value.removeEventListener("scroll", handleScroll);
	}
	});

return {
   container,
   itemWidth,
   activeIndex,
   activeFotoId,
   next,
   previous,
   goTo,
   setActiveFoto,
};
};