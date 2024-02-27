import { ref } from 'vue';
import { useUserDetailsStore } from "@/store/userDetailsStore";
import { storeToRefs } from 'pinia';
import { createPinia } from 'pinia';

const pinia = createPinia();
const userDetailsStore = useUserDetailsStore(pinia);
const {
    baseUrl,
} = storeToRefs(userDetailsStore);

export async function handleAuth(method, endpoint, datainfo = null, queryParams = {}, customOptions = {}) {

    const data = ref(null);
    const error = ref(null);

    const { handleError } = useErrorHandler();

   
    const queryString = new URLSearchParams(queryParams).toString();
    let url = baseUrl.value + endpoints[endpoint] + (queryString ? `?${queryString}` : '');
    const requestOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...customOptions.headers
        },
        body: datainfo ? JSON.stringify(datainfo) : undefined,
        ...customOptions
    };

      await  useFetch(url, requestOptions)
        .then((response) => {
          if(response.data.value) {
            data.value = response.data.value;
            error.value = null;
          }
          if(response.error.value) {
            data.value = null;
            error.value = response.error.value.data;
            handleError(error.value);
        }
        })
        .catch((error) => {
          handleError(error);
        })
    
        return {
            data,
            error
          };
    };
