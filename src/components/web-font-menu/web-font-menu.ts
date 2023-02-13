import FontAPI from "@api/font-api";

const SANS_FONT = "sans";
const SERIF_FONT = "serif";
const MONO_FONT = "mono";

class WebFontMenu extends HTMLElement {
  [prop: string]: any;
  #hasBeenMountedOnce = false;
  #buttonElement;
  #listElement;

  static get observedAttributes() {
    return ["font"];
  }

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-font-menu");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
    this.#buttonElement = shadowRoot.querySelector("button");
    this.#listElement = shadowRoot.querySelector("ul");
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  get font() {
    return this.getAttribute("theme") ?? undefined;
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

  #handleFont(newFont: string | undefined) {
    switch (newFont) {
      case SERIF_FONT: {
        this.#activateSerifFont();
        break;
      }
      case MONO_FONT: {
        this.#activateMonoFont();
        break;
      }
      default: {
        this.#activateSansFont();
      }
    }
  }

  handleButtonClick() {
    if (this.visible) {
      this.visible = false;
      this.#listElement?.setAttribute("aria-expanded", "false");
    } else {
      this.visible = true;
      this.#listElement?.setAttribute("aria-expanded", "true");
    }
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
      this.theme = FontAPI.font;
      this.#hasBeenMountedOnce = true;
    }
    this.#buttonElement?.addEventListener("click", this.handleButtonClick);
  }

  disconnectedCallback() {
    this.#buttonElement?.removeEventListener("click", this.handleButtonClick);
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