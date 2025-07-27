/// <reference types="vite/client" />

declare const __WS_TOKEN__: string;

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // mais variáveis de ambiente...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
