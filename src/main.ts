import "./main.css";

import WebApp from "@components/web-app";
import WebLogo from "@components/web-logo";
import WebContainer from "@components/web-container";
import WebSearch from "@components/web-search";
import WebFontMenu from "@components/web-font-menu";
import WebHeader from "@components/web-header";
import WebThemeSwitch from "@components/web-theme-switch";
import WebRow from "@components/web-row";
import WebWord from "@components/web-word/web-word";
import WebAudioButton from "@components/web-audio-button";
import WebView from "@components/web-view";
import WebHero from "@components/web-hero";
import WebLoader from "@components/web-loader";

customElements.define("web-app", WebApp);
customElements.define("web-container", WebContainer);
customElements.define("web-row", WebRow);
customElements.define("web-header", WebHeader);
customElements.define("web-logo", WebLogo);
customElements.define("web-font-menu", WebFontMenu);
customElements.define("web-theme-switch", WebThemeSwitch);
customElements.define("web-search", WebSearch);
customElements.define("web-word", WebWord);
customElements.define("web-audio-button", WebAudioButton);
customElements.define("web-view", WebView);
customElements.define("web-hero", WebHero);
customElements.define("web-loader", WebLoader);