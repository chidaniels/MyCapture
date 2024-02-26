import { defineStore } from 'pinia';
import { ref } from "vue";
import { useLocalStorage, useSessionStorage } from "@vueuse/core";

type fetchOptions = {
    method: "GET" | "POST" | "PATCH" | "DELETE",
    headers: {
        authorization: string | null
    };
    body?: string | FormData,
    query?: FormData
};


const fetchDefaults: fetchOptions = {
    method: "GET",
    headers: {
        authorization: null
    }
};
export const useUserDetailsStore = defineStore('userDetails', () => {
    /** variables for app startup */

    const user = ref();
    const localStorageUserToken = useLocalStorage('userToken', '');
    const sessionStorageUserData = useSessionStorage('userData', {});

    const userToken = ref(localStorageUserToken.value);

    function verifyEmailString(emailString: string) {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(emailString);
    };

    /** authentication logic */
    const baseUrl = ref(`https://eventful-moments.onrender.com/api/v1`);

    
    return {
        baseUrl,
        userToken,
        user,
        verifyEmailString,
    };
});
