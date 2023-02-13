class WebAudioButton extends HTMLElement {
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-web-word-audio");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
  }
}

export default WebAudioButton;