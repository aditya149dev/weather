/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHERSTACK_API_KEY: string; //add key in .env at root
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
