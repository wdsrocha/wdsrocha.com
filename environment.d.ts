declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
      NEXT_PUBLIC_GA_ID: string;
    }
  }
}

export {};
