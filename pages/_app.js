import { StoreProvider } from "easy-peasy";
import App, { Container } from "next/app";
import store from "../state/store";
// import "tailwindcss/tailwind.css";
import "../styles/global.css";

export default function MyApp({ Component, pageProps }) {
  if (typeof global.navigator === "undefined") global.navigator = {};

  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
