const template = document.createElement('template');
template.innerHTML = /*html*/ `
<style>
  li {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    padding: .25rem 0;
  }

  .plus {
    color: #16A34A;
  }

  .minus {
    color: #DC2626;
  }

  .normal {
    color: rgb(69, 72, 77);
  }

  .small {
    color: #64748B;
  }
</style>
<li id="content">
  <slot> </slot>
  <small class="small">
    <slot name="tag"> </slot>
  </small>
</li>

`;

/*
properties:
color: normal | plus | minus = normal
*/
class AmountBlock extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({
      mode: 'closed'
    });
    this._shadowRoot.appendChild(document.importNode(template.content.cloneNode(true), true));

    this.content = this._shadowRoot.querySelector("#content");
    console.log()

  }
  static get observedAttributes() {
    return ['color'];
  }
  connectedCallback() {
    console.log("BB", this.getAttribute("color"))
    const color = this.getAttribute("color") || "normal"
    this.content.classList.add(color);
  }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name == "color") {
      this.content.classList.add(newVal);
      this.content.classList.remove(oldVal);
    }
  }
}
customElements.define('amount-block', AmountBlock);