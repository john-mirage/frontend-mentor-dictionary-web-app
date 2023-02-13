import { getLocalStorageItem, setLocalStorageItem } from "@utils/local-storage";

const LOCAL_STORAGE_KEY = "dictionary-web-app-theme";
const PREFERS_DARK_COLOR_SCHEME_MQ = "(prefers-color-scheme: dark)";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

class ThemeAPI {
  static #theme: string | undefined;

  static #themeIsValid(theme: unknown) {
    return (
      theme === LIGHT_THEME ||
      theme === DARK_THEME
    );
  }

  static get theme() {
    if (!this.#theme) {
      const localStorageTheme = getLocalStorageItem(LOCAL_STORAGE_KEY);
      if (this.#themeIsValid(localStorageTheme)) {
        this.#theme = localStorageTheme;
      } else if (window.matchMedia(PREFERS_DARK_COLOR_SCHEME_MQ).matches) {
        this.#theme = DARK_THEME;
        setLocalStorageItem(LOCAL_STORAGE_KEY, DARK_THEME);
      } else {
        this.#theme = LIGHT_THEME;
        setLocalStorageItem(LOCAL_STORAGE_KEY, LIGHT_THEME);
      }
    }
    return this.#theme;
  }

  static set theme(newTheme) {
    if (this.#themeIsValid(newTheme)) {
      if (this.#theme !== newTheme) {
        this.#theme = newTheme;
        setLocalStorageItem(LOCAL_STORAGE_KEY, newTheme);
      }
    } else {
      throw new Error("The new theme is not valid");
    }
  }
}

export default ThemeAPI;