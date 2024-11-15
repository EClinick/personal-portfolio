/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GITHUB_API_TOKEN: string
    readonly VITE_API_URL: string
}
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

interface Window {
  ENV: {
    GITHUB_API_TOKEN: string;
    API_URL: string;
  }
}