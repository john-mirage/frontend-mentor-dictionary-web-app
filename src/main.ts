import "./main.css";

import WebApp from "@components/web-app";
import WebLogo from "@components/web-logo";
import WebContainer from "@components/web-container";
import WebSearch from "@components/web-search";
import WebFontMenu from "@components/web-font-menu";
import WebHeader from "@components/web-header";
import WebThemeSwitch from "@components/web-theme-switch";

customElements.define("web-app", WebApp);
customElements.define("web-container", WebContainer);
customElements.define("web-header", WebHeader);
customElements.define("web-logo", WebLogo);
customElements.define("web-font-menu", WebFontMenu);
customElements.define("web-theme-switch", WebThemeSwitch);
customElements.define("web-search", WebSearch);