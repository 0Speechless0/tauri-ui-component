import "./ui-button.js"
const template = document.createElement('template');
template.innerHTML = /*html*/ `


<ui-button style="--bg-color-from-left: #dc2626; --bg-color-to-right:  #ef4444 ">
  <slot> </slot>
</ui-button>

`;

export class DangerButton extends HTMLElement {
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
customElements.define('danger-button', DangerButton);