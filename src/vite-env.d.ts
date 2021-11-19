/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string | boolean | undefined>> {
    readonly VITE_APP_FIREBASE_API_KEY: string
    readonly VITE_APP_FIREBASE_AUTHDOMAIN: string
    readonly VITE_APP_FIREBASE_DATABASEURL: string
    readonly VITE_APP_FIREBASE_PROJECT_ID: string
    readonly VITE_APP_FIREBASE_STORAGE_BUCKET: string
    readonly VITE_APP_FIREBASE_MESSAGING_SENDER_ID: string
    readonly VITE_APP_FIREBASE_APP_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
