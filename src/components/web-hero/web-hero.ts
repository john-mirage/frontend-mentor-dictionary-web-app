class WebHero extends HTMLElement {
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-hero");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
  }
}

export default WebHero;