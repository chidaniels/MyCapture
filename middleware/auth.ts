import { useUserDetailsStore } from "@/store/userDetailsStore";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(() => {
  const { userToken, user } = storeToRefs(useUserDetailsStore());
  if (process.client) {
  const localUserToken = localStorage.getItem('userToken');
  const localUser = JSON.parse(localStorage.getItem('user') || '{}');
  // const localCompany = JSON.parse(localStorage.getItem('company') || '{}');
  // const localDarkMode = JSON.parse(localStorage.getItem('darkMode') || 'false');

  // company.value = localCompany;
  user.value = localUser;
  userToken.value = localUserToken;
  
  if (!(userToken.value && user.value)) return navigateTo('/');
  }
});