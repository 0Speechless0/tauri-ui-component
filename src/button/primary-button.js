import "./ui-button.js"
const template = document.createElement('template');
template.innerHTML = /*html*/ `


<ui-button style="--bg-color-from-left: #4f46e5; --bg-color-to-right: #a366f1 ">

</ui-button>

`;

export class PrimaryButton extends HTMLElement {
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

  connectedCallback() {}

  attributeChangedCallback(name, oldVal, newVal) {}
}
customElements.define('primary-button', PrimaryButton);