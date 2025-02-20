import { ref } from "vue";
import axios from "axios";
import type {Data } from "@/types/piscum.types"

export function useData() {
const fotos = import.meta.env.VITE_PICSUM_FOTOS;

const data = ref<Data[]>([]);
const error = ref<string | null>(null);
const loading = ref(false);

const fetchData = async () => {
   if (!fotos) {
      error.value = "API URL is not defined";
      return;
   }

   loading.value = true;
   try {
      const response = await axios.get<Data[]>(fotos);
      data.value = response.data;
   } catch (err) {
      error.value = (err as Error).message;
   } finally {
      loading.value = false;
   }
};

return { data, error, loading, fetchData };
}
