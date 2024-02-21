<template>
  <button
    class="bg-[#0c777c] text-white rounded-lg block mt-10 mx-auto text-sm px-10 py-3"
  >
    {{ title }}
  </button>
</template>

<script setup>
const props = defineProps(["title"]);
</script>
