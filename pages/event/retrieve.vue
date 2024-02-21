<template>
  <div class="container mx-auto py-8">
    <div class="max-w-md mx-auto">
      <div class="bg-white shadow-md rounded px-8 py-6">
        <button @click="cancelForm" class="text-gray-600 hover:text-gray-800">
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h3 class="text-2xl font-semibold mb-4">Retrieve Event Code</h3>
        <form @submit.prevent="searchEvents">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-bold mb-2"
              >Email address *</label
            >
            <input
              v-model="UserEmail"
              type="email"
              id="email"
              name="email"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"   @click="searchEmail"

            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </form>
        <div v-if="events.length > 0" class="mt-6">
          <label for="event" class="block text-gray-700 font-bold mb-2"
            >Select Event</label
          >
          <select
            v-model="selectedEvent"
            id="event"
            name="event"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>Select an event</option>
            <option v-for="event in events" :key="event.id" :value="event.id">
              {{ event.name }}
            </option>
          </select>
          <button
            class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Retrieve Code
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const UserEmail = ref("");
const events = ref([]);
const selectedEvent = ref("");

const searchEmail = async () => {
  try {
    const eventData = {
      email: UserEmail.value,
    };

    await postData(
      "eventList",
      eventData
      //to add query  { queryParams: { key: 'value' } }
    );
    console.log("Event created successfully!");
  } catch (error) {
    console.error("Error creating event:", error);
  }
};


const searchEvents = async () => {
  events.value = [
    { id: 1, name: "Event 1" },
    { id: 2, name: "Event 2" },
    { id: 3, name: "Event 3" },
]
  try {
    const eventData  = {
     
      email: UserEmail.value
      
    };


    await postData('resendCode', eventData,
    //to add query  { queryParams: { key: 'value' } }
     );


    console.log('Event created successfully!');

    router.push('/');
  } catch (error) {
    console.error('Error creating event:', error);
  }
};

const cancelForm = () => {
  // Navigate back to the index page
  router.push("/");
};
</script>

<style scoped>
/* Add scoped styles here */
</style>
