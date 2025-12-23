const template = document.createElement('template');
template.innerHTML = /*html*/ `

<style>
  button {
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.3s ease;
    background: linear-gradient(135deg, var(--bg-color-from-left, #6b7280), var(--bg-color-to-right, #9ca3af));
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  button:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
</style>


<button>
  <slot></slot>
</button>

<slot name="input"></slot>
`;

export class UIButton extends HTMLElement {
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

  connectedCallback() {


  }

  attributeChangedCallback(name, oldVal, newVal) {}
}
customElements.define('ui-button', UIButton);