const template = document.createElement('template');
template.innerHTML = /*html*/ `
<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: end;

  }

  .fan-container {
    position: relative;
    width: var(--width, 90%);
    height: 100px;
    border-radius: 50%;
  }

  .fan-item {
    position: absolute;
    width: var(--item-width, 60px);
    height: var(--item-height, 60px);
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    border-radius: 50%;
    transform-origin: center -100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    transform: translateY(-100px) rotate(calc(-1 * var(--angle)));
  }

  .fan-item:hover {
    transform: scale(1.2) rotate(var(--angle));
    background: linear-gradient(135deg, #2575fc, #6a11cb);
    box-shadow: 0 10px 20px rgba(0, 1, 1, 0.2);
  }
</style>
<div class="container">
  <div class="fan-container">
    <slot> </slot>
  </div>


</div>


<slot name="center"> </slot>
`
/*
properties:

height: integer,
width: integer,
item-height: integer,
item-width: integer,


*/
class FanPermu extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({
      mode: 'closed'
    });

    this.style.setProperty("--item-height", `${this.getAttribute("item-height")}px`)
    this.style.setProperty("--item-width", `${this.getAttribute("item-width")}px`)
    this.style.setProperty("--width", `${this.getAttribute("width")}px`)
    this._shadowRoot.appendChild(document.importNode(template.content.cloneNode(true), true));

    const slot = this._shadowRoot.querySelector("slot");
    this.elements = slot.assignedElements({
      flatten: true
    })


  }
  connectedCallback() {

    this.render(parseInt(this.getAttribute("height")));
  }
  static get observedAttributes() {
    return ['sampleAttr'];
  }

  render(height) {
    const fan_container = this._shadowRoot.querySelector(".fan-container");
    const container_width = parseInt(getComputedStyle(fan_container).width);

    let item_width;
    let center_x;
    let center_y = height;
    const div_angle = 180 / (this.elements.length - 1);
    const start_angle = 180;
    this.elements.forEach((e, i) => {
      const item = document.createElement("div")
      item.classList.add("fan-item");
      fan_container.appendChild(item);
      item_width = parseInt(getComputedStyle(item).width);
      center_x = (container_width - item_width) / 2;
      const r = center_x;
      const item_x = center_x + r * Math.cos(Math.PI / 180 * (start_angle - div_angle * i))
      const item_y = center_y - r * Math.sin(Math.PI / 180 * (start_angle - div_angle * i))
      item.style.setProperty("left", `${item_x}px`)
      item.style.setProperty("top", `${item_y}px`)
      item.appendChild(e);
    })



  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case 'sampleAttr':
        this.elems.elem.setAttribute('sampleAttr', newVal);
        break;
      default:
        break;
    }
  }

  get sampleAttr() {
    return this.getAttribute('sampleAttr');
  }
  set sampleAttr(val) {
    if (val) {
      this.setAttribute('sampleAttr', val);
    } else {
      this.removeAttribute('sampleAttr');
    }
  }
}

customElements.define('fan-permu', FanPermu);
export default FanPermu;