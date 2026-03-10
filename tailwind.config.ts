import type { Config } from "tailwindcss";

/**
 * Tailwind v4 ではテーマは globals.css の @theme で定義しています。
 * ここでは content やプラグインなどが必要な場合のみ記述します。
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts}",
  ],
};

export default config;
