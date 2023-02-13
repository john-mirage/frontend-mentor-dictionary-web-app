class WebLoader extends HTMLElement {
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-loader");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
  }
}

export default WebLoader;