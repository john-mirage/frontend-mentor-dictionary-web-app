class WebHero extends HTMLElement {
  [prop: string]: any;
  #hasBeenMountedOnce = false;
  #iconShapeElement;
  #headlineElement;
  #descriptionElement;

  static get observedAttributes() {
    return ["icon", "headline", "description"];
  }

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-hero");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
    this.#iconShapeElement = <SVGUseElement>shadowRoot.querySelector('[data-js="icon-shape"]');
    this.#headlineElement = <HTMLHeadingElement>shadowRoot.querySelector('[data-js="headline"]');
    this.#descriptionElement = <HTMLParagraphElement>shadowRoot.querySelector('[data-js="description"]');
  }

  get icon() {
    return this.getAttribute("icon") ?? undefined;
  }

  set icon(newIcon) {
    if (typeof newIcon === "string") {
      this.setAttribute("icon", newIcon);
    } else {
      this.removeAttribute("icon");
    }
  }

  get headline() {
    return this.getAttribute("headline") ?? undefined;
  }

  set headline(newHeadline) {
    if (typeof newHeadline === "string") {
      this.setAttribute("headline", newHeadline);
    } else {
      this.removeAttribute("headline");
    }
  }

  get description() {
    return this.getAttribute("description") ?? undefined;
  }

  set description(newDescription) {
    if (typeof newDescription === "string") {
      this.setAttribute("description", newDescription);
    } else {
      this.removeAttribute("description");
    }
  }

  #handleIcon(newIcon: string | undefined) {
    switch (newIcon) {
      case "search": {
        this.#iconShapeElement.setAttribute("href", `#icon-${newIcon}`);
        break;
      }
      case "error": {
        this.#iconShapeElement.setAttribute("href", `#icon-${newIcon}`);
        break;
      }
      default: {
        this.#iconShapeElement.removeAttribute("href");
      }
    }
  }
  
  #handleHeadline(newHeadline: string | undefined) {
    this.#headlineElement.textContent = newHeadline ?? "";
  }

  #handleDescription(newDescription: string | undefined) {
    this.#descriptionElement.textContent = newDescription ?? "";
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
      this.#upgradeProperty("icon");
      this.#upgradeProperty("headline");
      this.#upgradeProperty("description");
      this.#hasBeenMountedOnce = true;
    }
  }

  attributeChangedCallback(name: string, oldvalue: string | undefined, newValue: string | undefined) {
    if (oldvalue !== newValue) {
      switch (name) {
        case "icon": {
          this.#handleIcon(newValue);
          break;
        }
        case "headline": {
          this.#handleHeadline(newValue);
          break;
        }
        case "description": {
          this.#handleDescription(newValue);
          break;
        }
      }
    }
  }
}

export default WebHero;