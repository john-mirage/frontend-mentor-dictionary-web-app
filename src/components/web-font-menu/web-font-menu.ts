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
    return ["font", "visible"];
  }

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-font-menu");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
    this.#buttonElement = shadowRoot.querySelector("button");
    this.#listElement = shadowRoot.querySelector("ul");
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
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

  get visible() {
    return this.hasAttribute("visible");
  }

  set visible(isVisible) {
    if (isVisible) {
      this.setAttribute("visible", "");
    } else {
      this.removeAttribute("visible");
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

  #handleVisibility(isVisible: boolean) {
    this.#listElement?.setAttribute("aria-expanded", isVisible ? "true" : "false");
  }

  handleButtonClick(event: MouseEvent) {
    event.stopImmediatePropagation();
    this.visible = !this.visible;
  }

  handleOutsideClick(event: MouseEvent) {
    if (!event.composedPath().includes(this)) {
      this.visible = false;
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
    document.addEventListener("click", this.handleOutsideClick);
  }

  disconnectedCallback() {
    this.#buttonElement?.removeEventListener("click", this.handleButtonClick);
    document.removeEventListener("click", this.handleOutsideClick);
  }

  attributeChangedCallback(name: string, oldvalue: string | undefined, newValue: string | undefined) {
    if (oldvalue !== newValue) {
      switch (name) {
        case "font": {
          this.#handleFont(newValue);
          break;
        }
        case "visible": {
          this.#handleVisibility(typeof newValue === "string");
          break;
        }
      }
    }
  }
}

export default WebFontMenu;