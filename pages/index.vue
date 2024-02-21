<template>
    <div class="flex flex-col items-center justify-center h-screen">
      <div class="text-center mb-8">
        <h3 class="text-2xl font-semibold mb-4">Capture Memories, Share Wishes!</h3>
        <p class="text-lg mb-8">Allow attendees to cherish and celebrate your special moments by sending pictures and heartfelt audio wishes directly to you.</p>
      </div>
      <div class="pb-10">
            <NuxtLink to="event/create">
              <ButtonsBtn
                type="submit"
                title="Create Event"
                :disabled="isDisabled"

              />
            </NuxtLink>
          </div>

          <div class="pb-10">
            <NuxtLink to="event/retrieve">
              <p class="text-blue-500 hover:underline">Retrieve Event Code</p>
            </NuxtLink>
          </div>
    </div>
  </template>
  
  <script setup>
  
  
  </script>
  
  <style scoped>
  /* Add scoped styles here */
  </style>
  