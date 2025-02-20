<script setup lang="ts">
import { onMounted } from "vue";
import { useThemeStore } from "@/stores/theme.store";
import { useHoverStore } from "@/stores/hover.store";
import { useSelectedStore } from "@/stores/selected.store"
import Carousel from '../components/carousel/Carousel.vue';
import HoverEffect from '../components/HoverEffect.vue';
import { useData } from "@/composables/usePicsum";
import Theme from "vue-material-design-icons/ThemeLightDark.vue";

const { data, error, loading, fetchData } = useData();
const themeStore = useThemeStore();
const hoverStore = useHoverStore();
const selectedStore = useSelectedStore();

onMounted(fetchData);

const changeTheme = () => {
	themeStore.changeToDark()
};
</script>

<template>
	<main>
		<div id="HomeView" class="w-full h-full flex flex-col py-32.5 flex transition-all duration-500 relative"
			@mousemove="hoverStore.handleMouseMove" :class="{
				'bg-black': themeStore.default === false,
				'bg-white': themeStore.default !== false,
			}">

			<HoverEffect />

			<button @click="changeTheme" class="absolute top-5 left-5 rounded-full p-2 cursor-pointer"
				aria-label="Toggle Theme">
				<Theme :fillColor="themeStore.default ? 'green' : 'white'" :size="30" />
			</button>


			<div class="w-full animation flex flex-col gap-10 items-center justify-center ">
				<h1 class=" text-3xl md:text-5xl transition-all duration-500 text-[#1E8D1B] font-bold" :class="{
					'text-white': themeStore.default === false,
					'text-[#1E8D1B]': themeStore.default === true,
				}">Image-Carousel</h1>
				<img id="Icon" src="/Vue.js.png" width="100" height="100" alt="">
				<div id="Carousel" v-if="data.length">
					<Carousel :data="data" />
				</div>
				<div v-if="loading">Loading...</div>
				<div v-if="error">{{ error }}</div>
			</div>

			<div id="SelectedItems" v-if="selectedStore.selected.items.length" class="flex flex-col items-center md:shadow rounded-md justify-center mt-10 m-5 md:p-5" :class="{
				' shadow-white': themeStore.default === false,
				' shadow-green-600': themeStore.default === true,
			}">
				<h2 class="text-xl font-bold border-t border-white pt-5 text-green-600 mb-5" :class="{
					' text-white': themeStore.default === false,
					' text-green-600': themeStore.default === true,
				}">Selected Images</h2>
				<div class="grid grid-cols-1 w-full  md:grid-cols-4 gap-5 items-center justify-center">
					<div v-for="item in selectedStore.selected.items" :key="item.id">
						<div class="flex z-50 animation relative flex-col w-full items-center space-y-1">
							<img :src="item.download_url" alt="Selected Image"
								class="w-80 h-50 object-cover rounded-md mt-2" />
							<p class="break-words font-light p-2 rounded-md border" :class="{
								'text-white border-white': themeStore.default === false,
								'text-[#1E8D1B] border-[#1E8D1B]': themeStore.default === true,
							}">{{ item.download_url }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
\
<style scoped>
@keyframes show {
	from {
		transform: scale(0.5) translateY(-30px);
		opacity: 0.4;
	}

	to {
		transform: scale(1) translateY(0);
		opacity: 1;
	}
}

.animation {
	animation: show 0.6s ease-in-out;
}
</style>
