<script setup lang="ts">
import { useHoverStore } from "@/stores/hover.store"
const hoverStore = useHoverStore()
</script>

<template>
	<div id="HoverEffect" class="hidden md:block mouse-shadow pointer-events-none absolute w-[350px] h-[350px] 
bg-[radial-gradient(circle,rgba(144,238,150,0.2)_20%,transparent_70%)] 
rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" :style="hoverStore.shadowStyle" />

</template>

<style scoped></style>