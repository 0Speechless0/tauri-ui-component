import "./amount-card.js";
const template = document.createElement("template")
template.innerHTML = /*html*/ `
<style>
  .ring-wrapper {
    position: absolute;

    font-family: system-ui, -apple-system, BlinkMacSystemFont;
  }

  .ring {}

  .ring-bg,
  .ring-progress {
    fill: none;
    stroke-width: 12;

  }

  .ring-bg {
    stroke: #e5e7eb;
    /* neutral gray */
  }

  .ring-progress {
    stroke-linecap: round;
    stroke-dasharray: 439.6;
    /* 2πr */
    stroke-dashoffset: 439.6;
    transition: stroke-dashoffset 0.6s ease, stroke 0.4s linear;
  }



  .value {
    font-size: 2rem;
    font-weight: 600;
  }

  .max {
    font-size: 0.875rem;
    color: #6b7280;
  }

  .wrapper {

    display: flex;
    justify-content: center;
    align-items: center;

  }

  .amount-card {
    position: absolute;
  }
</style>

<div class="wrapper">
  <div class="ring-wrapper">
    <canvas id="myCircle" width="400" height="400"></canvas>
  </div>
  <amount-card id="amount-card" class="amount-card" />

</div>

`;

/*
properties:

radius: integer,
line-width: integer,
max-value: integer

*/
class AmountCardWithCircle extends HTMLElement {
  constructor() {
    super();
    const a = document.createElement("amount-card");

    this._shadowRoot = this.attachShadow({
      mode: "closed"
    })
    this.progressEl = this._shadowRoot.querySelector('.ring-progress');
    this.valueEl = this._shadowRoot.getElementById('value');
    this._shadowRoot.appendChild(template.content.cloneNode(true))

    this.radius = parseInt(this.getAttribute("radius")) || 160;
    this.line_width = parseInt(this.getAttribute("line-width")) || 5;
    this.max_value = parseInt(this.getAttribute("max-value")) || 1;


    this._shadowRoot.querySelector("#amount-card").addEventListener("progress", (e) => {
      this.setProgress(e.detail.value)
    })
  }

  static get observedAttributes() {
    return ['sampleAttr'];
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
  connectedCallback() {
    this.renderCircle(this.radius);
  }
  renderCircle(radius, lineWidth = 5) {
    const wrapper = this._shadowRoot.querySelector(".wrapper");
    wrapper.style.setProperty("height", `${radius*2}px`);
    const canvas = this._shadowRoot.getElementById('myCircle');
    const ctx = canvas.getContext('2d');
    lineWidth = Math.min(lineWidth, 20)
    canvas.setAttribute("width", `${radius*2 + 20 }`);
    canvas.setAttribute("height", `${radius*2+ 20 }`);
    ctx.beginPath();
    ctx.arc(radius + 10, radius + 10, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = lineWidth;

    ctx.stroke();

  }
  getColor(percent) {
    if (percent <= 0) return '#9ca3af';
    if (percent < 100) return `rgb(${Math.round(255 * (percent / 100))}, 200, 0)`;
    return `rgb(255, 0, 0)`;
  }
  setProgress(value, max) {
    const canvas = this._shadowRoot.getElementById('myCircle');
    const ctx = canvas.getContext('2d');
    const {
      radius,
      line_width,
      max_value
    } = this;
    const percent = Math.min(Math.max(value / max_value * 100, 0), 100);
    const offset = Math.PI * 2 * (percent / 100);
    ctx.beginPath();
    console.log(percent, value, max_value);
    ctx.arc(radius + 10, radius + 10, radius, 0, offset);
    ctx.strokeStyle = this.getColor(percent);
    ctx.lineWidth = line_width;
    ctx.stroke();
  }
}
customElements.define('amount-card-with-circle', AmountCardWithCircle);
export default AmountCardWithCircle;