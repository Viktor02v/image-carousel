import { defineStore } from 'pinia';
import type {Data } from "@/types/piscum.types"

export const useSelectedStore = defineStore('selected', {
state: () => ({
   selected: {
		items:[] as Data[]
   },
}),
actions: {
},
});