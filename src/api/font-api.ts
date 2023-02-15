import { getLocalStorageItem, setLocalStorageItem } from "@utils/local-storage";

const LOCAL_STORAGE_KEY = "dictionary-web-app-font";

const SANS_FONT = "sans";
const SERIF_FONT = "serif";
const MONO_FONT = "mono";

class FontAPI {
  static #font?: string;

  static #fontIsValid(font: unknown) {
    return (
      font === SANS_FONT ||
      font === SERIF_FONT ||
      font === MONO_FONT
    );
  }

  static get font() {
    if (!this.#font) {
      const localStorageFont = getLocalStorageItem(LOCAL_STORAGE_KEY);
      if (this.#fontIsValid(localStorageFont)) {
        this.#font = localStorageFont;
      } else {
        this.#font = SANS_FONT;
        setLocalStorageItem(LOCAL_STORAGE_KEY, SANS_FONT);
      }
    }
    return this.#font;
  }

  static set font(newFont) {
    if (this.#fontIsValid(newFont)) {
      if (this.#font !== newFont) {
        this.#font = newFont;
        setLocalStorageItem(LOCAL_STORAGE_KEY, newFont);
      }
    } else {
      throw new Error("The new font is not valid");
    }
  }
}

export default FontAPI;