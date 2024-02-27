<template>
  <section class="border-solid border-1 border-gray-500 bg-gray-50 mx-[9.6rem]">
    <div class="">
      <div class="mx-48">
        <h2 class="text-3xl pt-20 font-bold">Welcome back,</h2>
        <form class="mt-10" @submit.prevent="onSubmit">
          <div class="flex flex-col">
            <label>Email</label>
            <input type="email" v-model="userEmail" name="email" class="pl-2 border-solid border-2 border-gray-300 rounded-lg block h-12">
          </div>
          <div class="flex flex-col mt-8">
            <label>Password</label>
            <input type="password" v-model="userPassword" name="password" class="pl-2 border-solid border-2 border-gray-300 rounded-lg block h-12">
          </div>
          <div class="pb-10">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" :disabled="isDisabled">Login</button>
            <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const userEmail = ref('');
const userPassword = ref('');
const errorMessage = ref('');

const isEmailValid = computed(() => verifyEmailString(userEmail.value.trim()));
const isPasswordValid = computed(() => userPassword.value?.length >= 8);
const isDisabled = computed(() => !isEmailValid.value || !isPasswordValid.value);

function verifyEmailString(emailString) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(emailString);
}

const onSubmit = async () => {
      if (!isEmailValid.value) {
        throw new Error('Invalid email address');
      }
      if (!isPasswordValid.value) {
        throw new Error('Password must be at least 8 characters');
      }
  
      const loginData = {
        email: userEmail.value.trim(),
        password: userPassword.value
      };
  
      const { data, error } = await handleAuth('POST', 'loginUser', loginData);
      if(data.value !== null) {
        console.log('User authenticated successfully:', data.value);
        localStorage.setItem('userToken', data.token);
      router.push('/event/create');
        }
        if(error.value !== null) {
          // console.error('Error logging in:', error);
      errorMessage.value = error.value.message;
        // throw new Error(error.value.message);
        
        }
   
  };
</script>
