
   <template>
 <section class=" border-solid border-1 border-gray-500 bg-gray-50 mx-[9.6rem] ">
      <div class="">
        <div class=" mx-48">
        <h2 class="text-3xl pt-20 font-bold">Create an Account,</h2>  
        <form class="mt-10" @submit.prevent="onSubmit">
          <div class="flex flex-col">
            <label>Fullname</label>
            <input type="text" v-model="fullname" name="fullname" class=" pl-2  border-solid border-2 border-gray-300 rounded-lg block h-12">
          </div>
          <div class="flex flex-col mt-8">
            <label>Email</label>
            <input type="email" v-model="userEmail" name="email" class=" pl-2  border-solid border-2 border-gray-300 rounded-lg block h-12">
          </div>
          <div class="flex flex-col mt-8">
            <label>Password</label>
            <input type="password" v-model="userPassword" name="password" class="pl-2 border-solid border-2 border-gray-300 rounded-lg block h-12">
          </div>
          <div class="pb-10">
              <ButtonsBtn
                type="submit"
                title="Create Account"
                onclick=""
                class=""
                :disabled="isDisabled"
              />
          </div>
        </form>
    </div>
      </div>
    </section> 
  </template>

 <script setup>
import { ref, computed } from 'vue';
import { useUserDetailsStore } from '@/store/userDetailsStore';
import { storeToRefs } from 'pinia';
import { createPinia } from 'pinia';
const pinia = createPinia();

const userDetailsStore = useUserDetailsStore(pinia);

// Destructure store values
const {
    baseUrl,
    userToken
} = storeToRefs(userDetailsStore);

import { useRouter } from 'vue-router';

const router = useRouter();

const fullname = ref('');
const userEmail = ref('');
const userPassword = ref('');
const errorMessage = ref('');

const isEmailValid = computed(() => verifyEmailString(userEmail.value.trim()));
const isPasswordValid = computed(() => userPassword.value?.length > 7);
const isDisabled = computed(() => !isEmailValid.value || !isPasswordValid.value );

function verifyEmailString(emailString) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(emailString);
}

const onSubmit = async () => {
  try {

    if (!isEmailValid.value) {
      throw new Error('Invalid email address');
    }
    if (!isPasswordValid.value) {
      throw new Error('Password must be at least 8 characters');
    }

    const signupData = {
      email: userEmail.value.trim(),
      password: userPassword.value,
      fullname: fullname.value


    };
    // Make the API call to login

    const { data, error } = await handleAuth('POST',
     'signupUser',
      signupData
      );
    

    const userData = {
      email: userEmail.value, 
      fullname: fullname.value 
      // Add other properties as needed
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));

// Save user data to localStorage
localStorage.setItem('userData', JSON.stringify(data));

    router.push('/');
  } catch (error) {
    console.error('Error logging in:', error);
    errorMessage.value = error.message;
  }
};
</script> 
