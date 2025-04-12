const { ...otherViteConfig } = import.meta.env;

const Env = {
  BASE_URL: otherViteConfig.DEV ? "http://localhost:8080/api" : "/api",
  __vite__: otherViteConfig,
};

export default Env;
