const PREFERS_DARK_COLOR_SCHEME_MQ = "(prefers-color-scheme: dark)";

class WebThemeSwitch extends HTMLElement {
  #preferDarkColorSchemeMQL = window.matchMedia(PREFERS_DARK_COLOR_SCHEME_MQ);

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-theme-switch");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
  }
}

export default WebThemeSwitch;