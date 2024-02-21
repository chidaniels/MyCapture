import { defineStore } from 'pinia';
import { computed, ref } from "vue";
import { useLocalStorage } from "@vueuse/core"

type fetchOptions = {
  method: "GET" | "POST" | "PATCH" | "DELETE", 
  headers: {
    authorization: string | null
  };
  body?: string | FormData,
  query?: FormData
};

export const useUserDetailsStore = defineStore('userDetails', () => {
  /** variables for app startup */
 

  const user = ref();
  const company = ref();
  
  /** otp inputs */
  const otpInput = ref(null);

  const otpValue = ref();

  const userProfileReady = useLocalStorage('userProfileReady', false);

  const userPlan = useLocalStorage('userPlan', false);

  const planDetails = useLocalStorage('userplanDetails', {});

  /** general styling variables */
  const isDarkMode = ref(false);
  
  const isBodyScroll = ref(true);

  const  showBalance = useLocalStorage('themesBalance', true);

  const vat = useLocalStorage('vat', 0);
  const companyAdd = useLocalStorage('companyAdd', "");
  const companyPhone = useLocalStorage('companyPhone', "");
  const companyInfo = useLocalStorage('companyInfo', {});


    // checks that the user email is correct using regex,
    // actual verification is done using the otp code
    // return value controls clickabilty of the continue button
  function verifyEmailString(emailString: string) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if (emailString.match(emailRegex)) return true;
    else return false;
  };

  /** authentication logic */
  const baseUrl = ref(`https://rs.uatdrive.com/api/v1/web`);


  const userToken = ref();

  const fetchDefaults: fetchOptions = {
    method: "GET",
    headers: {
      authorization: null
    }
  };

  async function fetchData(url: string, fetchParams: fetchOptions = fetchDefaults) {
    url = `${baseUrl.value}/${url}`;

    if (fetchParams.query) {
      const queryArray: string[] = [];

      Object.entries(fetchParams.query).forEach(([queryKey, queryValue]) => {
        if (queryValue) {
          queryValue = queryValue.toString().trim();
          queryArray.push(`${queryKey}=${encodeURIComponent(queryValue)}`)
        };
      });

      if (Boolean(queryArray.length)) url = `${url}?${queryArray.join('&')}`;
    };

    const options: any = {
      method: fetchParams.method,
      headers: {
        authorization: `Bearer ${userToken.value}`
      }
    };

    if (fetchParams.body) options.body = fetchParams.body;

    const responseObject = await useFetch(url, options);
    return responseObject;
  };  

  return {
    baseUrl,
    userToken,
    user,
    company,
    userProfileReady,
    userPlan,
    planDetails,
    isDarkMode,
    showBalance,
    otpInput,
    otpValue,
    isBodyScroll,
    vat,
    companyAdd,
    companyPhone,
    companyInfo,
    verifyEmailString,
    fetchData
  };
});