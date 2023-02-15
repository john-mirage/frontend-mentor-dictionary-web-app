import WebFontMenu from "@components/web-font-menu";

class WebFontButton extends HTMLElement {
  [prop: string]: any;
  #hasBeenMountedOnce = false;
  #buttonElement;
  #buttonLabelElement;
  #webFontMenu;

  static get observedAttributes() {
    return ["label", "active"];
  }

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-font-button");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
    this.#buttonElement = <HTMLButtonElement>shadowRoot.querySelector("button");
    this.#buttonLabelElement = <HTMLSpanElement>shadowRoot.querySelector("span");
    this.#webFontMenu = <WebFontMenu>shadowRoot.querySelector("web-font-menu");
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleLabelFromCustomEvent = this.handleLabelFromCustomEvent.bind(this);
  }

  get label() {
    return this.getAttribute("label") ?? undefined;
  }

  set label(newLabel) {
    if (typeof newLabel === "string") {
      this.setAttribute("label", newLabel);
    } else {
      this.removeAttribute("label");
    }
  }

  get active() {
    return this.hasAttribute("active");
  }

  set active(isActive) {
    if (isActive) {
      this.setAttribute("active", "");
    } else {
      this.removeAttribute("active");
    }
  }

  #handleLabel(newLabel: string | undefined) {
    this.#buttonLabelElement.textContent = newLabel ?? "";
  }

  #handleActiveState(isActive: boolean) {
    if (isActive) {
      this.#buttonElement.setAttribute("aria-expanded", "true");
      document.addEventListener("click", this.handleOutsideClick);
    } else {
      this.#buttonElement.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", this.handleOutsideClick);
    }
  }

  handleButtonClick(event: MouseEvent) {
    event.stopImmediatePropagation();
    this.active = !this.active;
  }

  handleOutsideClick(event: MouseEvent) {
    if (!event.composedPath().includes(this.#webFontMenu)) {
      this.active = false;
    }
  }

  handleLabelFromCustomEvent(event: Event) {
    const font = (<CustomEvent>event).detail.font;
    this.label = font;
    this.active = false;
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
      this.#upgradeProperty("active");
      this.#hasBeenMountedOnce = true;
    }
    this.#buttonElement.addEventListener("click", this.handleButtonClick);
    this.addEventListener("web-font-button-label", this.handleLabelFromCustomEvent);
  }

  disconnectedCallback() {
    this.#buttonElement.removeEventListener("click", this.handleButtonClick);
    this.addEventListener("web-font-button-label", this.handleLabelFromCustomEvent);
  }

  attributeChangedCallback(name: string, oldvalue: string | undefined, newValue: string | undefined) {
    if (oldvalue !== newValue) {
      switch (name) {
        case "label": {
          this.#handleLabel(newValue);
          break;
        }
        case "active": {
          this.#handleActiveState(typeof newValue === "string");
          break;
        }
      }
    }
  }
}

export default WebFontButton;