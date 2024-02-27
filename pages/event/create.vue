<template>
    <div class="container mx-auto py-8">
      <div class="max-w-md mx-auto">
        <div class="bg-white shadow-md rounded px-8 py-6">
          <div class="flex justify-between items-center mb-4">
            <button @click="cancelForm" class="text-gray-600 hover:text-gray-800">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h3 class="text-2xl font-semibold">Create Event</h3>
          </div>
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="eventName" class="block text-gray-700 font-bold mb-2">What’s your event name ? *</label>
              <input v-model="eventName" type="text" id="eventName" name="eventName" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
              <label for="eventType" class="block text-gray-700 font-bold mb-2">What type of event is it ? *</label>
              <input v-model="eventType" type="text" id="eventType" name="eventType" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label for="startDate" class="block text-gray-700 font-bold mb-2">Start Date</label>
                <input v-model="startDate" type="date" id="startDate" name="startDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div>
                <label for="endDate" class="block text-gray-700 font-bold mb-2">End Date</label>
                <input v-model="endDate" type="date" id="endDate" name="endDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 font-bold mb-2">Email address *</label>
              <input v-model="email" type="email" id="email" name="email" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
              <label for="media" class="block text-gray-700 font-bold mb-2">Video or image uploaded serves as the background for the event page. (This is optional )- Maximum of 30mb</label>
              <input type="file" id="media" name="media" accept="image/*, video/*" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Create Event</button>
          </form>
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const eventName = ref('');
const eventType = ref('');
const startDate = ref('');
const endDate = ref('');
const email = ref('');

const submitForm = async () => {
  
    const eventData = {
      title: eventName.value,
      category: eventType.value,
      start_date: startDate.value,
      end_date: endDate.value,
      email: email.value
    };

    const { data, error } =  await sendRequest(
       'POST',
       'createEvent',
        eventData,
        // { requiresAuth:  }
       //to add query  { queryParams: { key: 'value' } }
     );

  if(data.value !== null) {
    console.log('Event created successfully!', data);
      router.push('/event');
        }
        if(error.value !== null) {
      errorMessage.value = error.value.message;   
        }

}

const cancelForm = () => {
  router.push('/');
};
</script>

<style scoped>
/* Add scoped styles here */
</style>

