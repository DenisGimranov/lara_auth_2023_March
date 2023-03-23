import axios from "axios";

const axiosClient = axios.create({
  baseURL:`${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN')
  config.headers.Authorization = `Bearer ${token}`
  return config;
})

axiosClient.interceptors.response.use((response)=>{
  return response;
},(error)=>{
  try {
    const {response} = error;
    console.log(response);
    if (response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN')
    }  //else другие ошибки можно обработать типо 403 404 и т.д.
  }
  catch (e){
    const {response} = error;
    console.log(response);
    console.error(e);
  }
  throw error;
})

export default axiosClient;
