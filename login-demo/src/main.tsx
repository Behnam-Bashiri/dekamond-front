/**
 * Entry point of the React application.
 *
 * - Imports the main `App` component and global styles.
 * - Initializes the React root using `createRoot` from `react-dom/client`.
 * - Wraps the app with internationalization and theme providers.
 * - Renders the `App` component into the DOM element with the id "root".
 */
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "next-themes";
import { I18nextProvider } from "react-i18next";
import i18n from "./lib/i18n";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </ThemeProvider>
);
