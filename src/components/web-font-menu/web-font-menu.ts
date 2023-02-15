import FontAPI from "@api/font-api";

const SANS_FONT = "sans";
const SERIF_FONT = "serif";
const MONO_FONT = "mono";

class WebFontMenu extends HTMLElement {
  [prop: string]: any;
  #hasBeenMountedOnce = false;
  #formElement;
  #sansInputElement;
  #serifInputElement;
  #monoInputElement;

  static get observedAttributes() {
    return ["font"];
  }

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-font-menu");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
    this.#formElement = <HTMLFormElement>shadowRoot.querySelector("form");
    this.#sansInputElement = <HTMLInputElement>shadowRoot.querySelector('input[value="sans"]');
    this.#serifInputElement = <HTMLInputElement>shadowRoot.querySelector('input[value="serif"]');
    this.#monoInputElement = <HTMLInputElement>shadowRoot.querySelector('input[value="mono"]');
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  get font() {
    return this.getAttribute("font") ?? undefined;
  }

  set font(newFont) {
    if (typeof newFont === "string") {
      this.setAttribute("font", newFont);
    } else {
      this.removeAttribute("font");
    }
  }

  #activateSansFont() {
    FontAPI.font = SANS_FONT;
    document.documentElement.setAttribute("font", SANS_FONT);
  }

  #activateSerifFont() {
    FontAPI.font = SERIF_FONT;
    document.documentElement.setAttribute("font", SERIF_FONT);
  }

  #activateMonoFont() {
    FontAPI.font = MONO_FONT;
    document.documentElement.setAttribute("font", MONO_FONT);
  }

  #sendNewFontCustomEvent(newFont: string) {
    const customEvent = new CustomEvent("web-font-button-label", {
      bubbles: true,
      composed: true,
      detail: { font: newFont }
    });
    this.dispatchEvent(customEvent);
  }

  #handleFont(newFont: string | undefined) {
    switch (newFont) {
      case SERIF_FONT: {
        this.#activateSerifFont();
        this.#sendNewFontCustomEvent("Serif");
        break;
      }
      case MONO_FONT: {
        this.#activateMonoFont();
        this.#sendNewFontCustomEvent("Mono");
        break;
      }
      default: {
        this.#activateSansFont();
        this.#sendNewFontCustomEvent("Sans Serif");
      }
    }
  }

  #handleInitialFont(initialFont: string | undefined) {
    if (typeof initialFont === "string") {
      switch (initialFont) {
        case SERIF_FONT: {
          this.#serifInputElement.checked = true;
          this.#sendNewFontCustomEvent("Serif");
          break;
        }
        case MONO_FONT: {
          this.#monoInputElement.checked = true;
          this.#sendNewFontCustomEvent("Mono");
          break;
        }
        default: {
          this.#sansInputElement.checked = true;
          this.#sendNewFontCustomEvent("Sans Serif");
        }
      }
    } else {
      throw new TypeError("The initial font is not a string");
    }
  }

  handleFormChange(event: Event) {
    this.font = (<HTMLInputElement>event.target).value;
  }

  #upgradeProperty(propertyName: string) {
    if (this.hasOwnProperty(propertyName)) {
      let value = this[propertyName];
      delete this[propertyName];
      this[propertyName] = value;
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.#upgradeProperty("font");
      this.font = FontAPI.font;
      this.#handleInitialFont(this.font);
      this.#hasBeenMountedOnce = true;
    }
    this.#formElement.addEventListener("change", this.handleFormChange);
  }

  disconnectedCallback() {
    this.#formElement.removeEventListener("change", this.handleFormChange);
  }

  attributeChangedCallback(name: string, oldvalue: string | undefined, newValue: string | undefined) {
    if (oldvalue !== newValue) {
      switch (name) {
        case "font": {
          this.#handleFont(newValue);
          break;
        }
      }
    }
  }
}

export default WebFontMenu;