class WebView extends HTMLElement {
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-view");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
  }
}

export default WebView;