<script setup lang="ts">
import { defineProps, toRefs } from "vue";
import { useCarousel } from "@/composables/useCarousel"
import NavigatePrevious from "../carousel/CarouselNavigatePrevious.vue"
import NavigateNext from "../carousel/CarouselNavigateNext.vue"
import { useThemeStore } from "@/stores/theme.store"
import type { Data } from "@/types/piscum.types"

const themeStore = useThemeStore()

const props = defineProps<{
	data: Data[];
}>();
const { data } = toRefs(props);

const { container,
	itemWidth,
	activeIndex,
	activeFotoId,
	next,
	previous,
	goTo,
	setActiveFoto
} = useCarousel(data)

</script>

<template>
	<div class="relative w-full h-full z-50">

		<div ref="container"
			class="w-[390px] sm:w-[620px] md:w-[768px] lg:w-[1026px] xl:w-[1400px] shadow-sm rounded-md overflow-x-hidden scroll-smooth mx-auto"
			:class="{
				'shadow-green-600': themeStore.default === true,
				'shadow-white': themeStore.default !== true
			}">

			<div class="flex w-full relative md:gap-3 md:h-[350px] md:items-center md:justify-center">

				<div v-for="(foto, index) in [...data, ...data]" :key="index" class="flex-shrink-0"
					:style="{ width: `${itemWidth}px` }">
					<div class="flex animation flex-col items-center justify-center">
						<img @click="setActiveFoto(foto.id)" :src="foto.download_url" alt="Random Image"
							class="w-full h-[300px] object-cover rounded-md  trnsition-all duration-500 overflow-hidden"
							:class="{
								'border-5 border-[#1E8D1B]': activeFotoId === foto.id,
								'border-transparent md:hover:scale-105 cursor-pointer': activeFotoId !== foto.id,
							}" />
						<p class="mt-3 mb-3 md:mb-0" :class="{
							'text-green-600': themeStore.default === true,
							'text-white': themeStore.default !== true,

						}">{{ foto.author }}</p>
					</div>
				</div>
			</div>
		</div>

		<NavigatePrevious class="absolute cursor-pointer left-4 top-1/3 md:top-1/2 -translate-y-3/3  md:-translate-y-1/1"
			@click="previous" />
		<NavigateNext class="absolute cursor-pointer right-4 top-1/3 md:top-1/2 -translate-y-3/3 md:-translate-y-1/1"
			@click="next" />


		<div id="Stepper"
			class="flex gap-2 flex-wrap px-2 w-[390px]  md:w-full  items-center justify-center mt-10 space-x-2">
			<button v-for="(foto, index) in data" :key="foto.id" @click="goTo(index)"
				class="w-8 h-8 md:w-6 md:h-6 text-[8px] flex items-center justify-center rounded-full transition-color duration-200"
				:class="{
					'bg-[#1E8D1B]': activeIndex === index,
					'bg-white border cursor-pointer border-[#1E8D1B] hover:bg-green-100': activeIndex !== index,
				}">
				{{ index + 1 }}
			</button>
		</div>
	</div>
</template>

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