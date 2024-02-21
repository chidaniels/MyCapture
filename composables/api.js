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

const errorMessage = ref('');
const successMessage = ref('');

const endpoints = {
    addEvent: '/moment',
    createEvent: '/events',
    uploadbgImg: '/file',
    eventList: '/events/list',
    resendCode: '/events/resend-code',
    
  
    // Define more endpoints here if needed
};

async function postData(endpoint, data, queryParams = {}, customOptions = {}) {
    return await sendRequest('POST', endpoint, data, queryParams, customOptions);
}

async function patchData(endpoint, data, queryParams = {}, customOptions = {}) {
    return await sendRequest('PATCH', endpoint, data, queryParams, customOptions);
}

async function deleteData(endpoint, queryParams = {}, customOptions = {}) {
    return await sendRequest('DELETE', endpoint, null, queryParams, customOptions);
}

async function getData(endpoint, queryParams = {}, customOptions = {}) {
    return await sendRequest('GET', endpoint, null, queryParams, customOptions);
}

async function sendRequest(method, endpoint, data = null, queryParams = {}, customOptions = {}) {
    try {
        const queryString = new URLSearchParams(queryParams).toString();
        const url = baseUrl.value + endpoints[endpoint] + (queryString ? `?${queryString}` : '');
        const requestOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userToken.value}`,
                ...customOptions.headers
            },
            body: data ? JSON.stringify(data) : undefined,
            ...customOptions
        };

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error('An error occurred');
        }

        const responseData = await response.json();
        successMessage.value = 'successful';
        return responseData;
    } catch (error) {
        errorMessage.value = error.message;
        throw error;
    }
}

export { postData, patchData, deleteData, getData, errorMessage, successMessage };
