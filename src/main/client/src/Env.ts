const { ...otherViteConfig } = import.meta.env;

const Env = {
  BASE_URL: otherViteConfig.DEV ? "http://127.0.0.1:8081/api" : "/api",
  __vite__: otherViteConfig
};

export default Env;
