import "./ui-button.js"
const template = document.createElement('template');
template.innerHTML = /*html*/ `


<ui-button style="--bg-color-from-left: #4f46e5; --bg-color-to-right: #a366f1 ">
  <slot> </slot>
</ui-button>

`;

export class PrimaryButton extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({
      mode: 'open'
    });
    this._shadowRoot.appendChild(document.importNode(template.content.cloneNode(true), true));
  }

  static get observedAttributes() {
    return [''];
  }

  connectedCallback() {}

  attributeChangedCallback(name, oldVal, newVal) {}
}
customElements.define('primary-button', PrimaryButton);