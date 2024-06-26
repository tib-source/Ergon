const { VITE_API_BASE_URL, ...otherViteConfig } = import.meta.env;

export const Env = { 
  BASE_URL : VITE_API_BASE_URL,
  __vite__ : otherViteConfig
}

console.log(Env);
