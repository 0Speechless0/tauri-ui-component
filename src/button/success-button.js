import "./ui-button.js"
const template = document.createElement('template');
template.innerHTML = /*html*/ `


<ui-button style="--bg-color-from-left: #10b981; --bg-color-to-right: #34d399 ">

</ui-button>

`;

export class SuccessButton extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({
      mode: 'open'
    });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [''];
  }

  connectedCallback() {

  }

  attributeChangedCallback(name, oldVal, newVal) {}
}
customElements.define('success-button', SuccessButton);