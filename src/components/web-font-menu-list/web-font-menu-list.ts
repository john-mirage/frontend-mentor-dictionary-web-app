class WebFontMenuList extends HTMLElement {
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-font-menu-list");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
  }
}

export default WebFontMenuList;