import { ref } from 'vue';
import { useUserDetailsStore } from "@/store/userDetailsStore";
import { storeToRefs } from 'pinia';
import { createPinia } from 'pinia';
const pinia = createPinia();

const userDetailsStore = useUserDetailsStore(pinia);

// Destructure store values
const {
    baseUrl,
    userToken
} = storeToRefs(userDetailsStore);

const data = ref(null);
const error = ref(null);


async function sendRequest(method, endpoint, data = null, queryParams = {}, customOptions = {}, requiresAuth = true) {
    try {
        const queryString = new URLSearchParams(queryParams).toString();
        let url = baseUrl.value + endpoints[endpoint] + (queryString ? `?${queryString}` : '');
        
        const requestOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...customOptions.headers
            },
            body: data ? JSON.stringify(data) : undefined,
            ...customOptions
        };

        if (requiresAuth) {
            requestOptions.headers.authorization = `Bearer ${userToken.value}`;
        }

        const response = await useFetch(url, requestOptions);

        if (!response.ok) {
            const errorData = await response.json();
            error.value = new Error(errorData.message || 'An error occurred');
            error.value.response = response;
            throw error.value;
        }

        const responseData = await response.json();
        data.value = responseData;
        return { data: responseData, error: null };
    } catch (e) {
        error.value = e;
        return { data: null, error: e };
    }
}

export { sendRequest, data, error };

