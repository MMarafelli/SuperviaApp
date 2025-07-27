/// <reference types="vite/client" />

declare global {
  const __WS_TOKEN__: string;
  const global: typeof globalThis;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
