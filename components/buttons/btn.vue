<template>
    <button class="bg-blue-500 hover:bg-blue-600  font-bold  mb-4bg-[#11767b] text-white rounded-lg block mt-10 mx-auto text-sm px-14 py-3">
      {{ title }}
    </button>
</template>

<script setup>
const props = defineProps(["title"]);
</script>