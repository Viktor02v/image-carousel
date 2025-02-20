import { defineStore } from 'pinia';

interface Theme {
default: boolean;
}

export const useThemeStore = defineStore('theme', {
state: (): Theme => ({
   default: true, 
}),
actions: {
   changeToDark() {
      this.default = !this.default;
   },
},
});