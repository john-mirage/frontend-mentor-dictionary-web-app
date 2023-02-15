import ThemeAPI from "@api/theme-api";

const PREFERS_DARK_COLOR_SCHEME_MQ = "(prefers-color-scheme: dark)";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

class WebThemeButton extends HTMLElement {
  [prop: string]: any;
  #hasBeenMountedOnce = false;
  #preferDarkColorSchemeMQL = window.matchMedia(PREFERS_DARK_COLOR_SCHEME_MQ);
  #buttonElement;

  static get observedAttributes() {
    return ["theme"];
  }

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-theme-button");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
    this.#buttonElement = shadowRoot.querySelector("button");
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleMediaQueryListChange = this.handleMediaQueryListChange.bind(this);
  }

  get theme() {
    return this.getAttribute("theme") ?? undefined;
  }

  set theme(newTheme) {
    if (typeof newTheme === "string") {
      this.setAttribute("theme", newTheme);
    } else {
      this.removeAttribute("theme");
    }
  }

  #activateLightTheme() {
    ThemeAPI.theme = LIGHT_THEME;
    this.#buttonElement?.setAttribute("aria-pressed", "false");
    document.documentElement.setAttribute("theme", LIGHT_THEME);
  }

  #activateDarkTheme() {
    ThemeAPI.theme = DARK_THEME;
    this.#buttonElement?.setAttribute("aria-pressed", "true");
    document.documentElement.setAttribute("theme", DARK_THEME);
  }

  #handleTheme(newTheme: string | undefined) {
    if (newTheme === DARK_THEME) {
      this.#activateDarkTheme();
    } else {
      this.#activateLightTheme();
    }
  }

  handleButtonClick() {
    this.theme = this.theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  }

  handleMediaQueryListChange(event: MediaQueryListEvent) {
    this.theme = event.matches ? DARK_THEME : LIGHT_THEME;
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
      this.#upgradeProperty("theme");
      this.theme = ThemeAPI.theme;
      this.#hasBeenMountedOnce = true;
    }
    this.#buttonElement?.addEventListener("click", this.handleButtonClick);
    this.#preferDarkColorSchemeMQL.addEventListener("change", this.handleMediaQueryListChange);
  }

  disconnectedCallback() {
    this.#buttonElement?.removeEventListener("click", this.handleButtonClick);
    this.#preferDarkColorSchemeMQL.removeEventListener("change", this.handleMediaQueryListChange);
  }

  attributeChangedCallback(name: string, oldvalue: string | undefined, newValue: string | undefined) {
    if (oldvalue !== newValue) {
      switch (name) {
        case "theme": {
          this.#handleTheme(newValue);
          break;
        }
      }
    }
  }
}

export default WebThemeButton;