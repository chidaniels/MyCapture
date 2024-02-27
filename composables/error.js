import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default function useErrorHandler() {
    const router = useRouter();
    const error = ref(null);

    function handleError(err) {
        if (err.response) {
            error.value = `API Error: ${err.response.statusText}`;
        } else if (err.request) {
            error.value = 'Network Error: Unable to connect to the server';
        } else {
            error.value = `Client-side Error: ${err.message}`;
        }
        router.push('/error-page');
    }


    window.onerror = function(message, source, lineno, colno, error) {
        handleError(error);
        return true;
    };

    return { error, handleError}
}