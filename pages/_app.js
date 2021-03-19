import App, { Container } from "next/app";
// import "tailwindcss/tailwind.css";
import "../styles/global.css";

export default function MyApp({ Component, pageProps }) {
  if (typeof global.navigator === "undefined") global.navigator = {};

  return <Component {...pageProps} />;
}
