import Env from "../../Env.ts";
import axios from "axios";


export const useErgonClient = (token: string | null = null) => {
  const baseUrl = Env.BASE_URL
  const client = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  })

  client.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  return client
}