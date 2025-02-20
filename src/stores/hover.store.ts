import { defineStore } from 'pinia';

interface ShadowStyle {
left: string;
top: string;
}

export const useHoverStore = defineStore('hover', {
state: () => ({
   shadowStyle: {
      left: '0px',
      top: '0px',
   } as ShadowStyle, 
}),
actions: {
   handleMouseMove(e: MouseEvent) {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.shadowStyle = {
      left: `${x}px`,
      top: `${y}px`,
      };
   },
},
});