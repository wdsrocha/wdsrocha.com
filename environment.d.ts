declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
      NEXT_PUBLIC_GA_ID: string;
      TINA_PUBLIC_CLIENT_ID: string;
      TINA_TOKEN: string;
    }
  }
}

export {};
