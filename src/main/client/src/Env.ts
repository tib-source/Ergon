const { ...otherViteConfig } = import.meta.env;

export const Env = { 
  BASE_URL : "https://localhost:8080",
  __vite__ : otherViteConfig
}

console.log(Env);
