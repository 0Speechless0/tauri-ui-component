const template = document.createElement("template")
template.innerHTML = /*html*/ `
<style>
  .amount-card {
    margin: auto;

    border-radius: 10px;
    background: #ffffff;

    width: fit-content;
  }

  .amount-card .label {
    font-size: 0.75rem;
    text-align: center;
    color: #6b7280;
    /* gray-500 */
    margin-bottom: 0.25rem;
    letter-spacing: 0.05em;
  }

  .amount-card .amount {
    display: flex;
    align-items: baseline;
    font-weight: 600;
    color: #111827;
    /* gray-900 */
  }

  .amount-card .currency {
    font-size: 0.875rem;

    color: #6b7280;
  }

  .amount-card #total-amount {
    font-size: 1.75rem;
    font-variant-numeric: tabular-nums;
  }
</style>
<div class="amount-card">
  <div class="label">累計金額</div>
  <div class="amount">
    <span class="currency">NT$</span>
    <span id="total-amount">0</span>
  </div>
</div>


`
/*

function:
setAmount(value: integer)
*/
class AmountCard extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({
      mode: "closed"
    })
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.total_amount = this._shadowRoot.querySelector('#total-amount')

  }

  static get observedAttributes() {
    return ['sampleAttr'];
  }

  setAmount(value) {
    this.total_amount.textContent = value.toLocaleString();
    this.dispatchEvent(new CustomEvent("progress", {
      detail: {
        value: value
      }
    }));
  }
  async animateAmount(target, duration = 800) {
    return new Promise(resolve => {
      const start = 0;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(start + (target - start) * progress);


        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          resolve();
        }
        this.setAmount(value)
      }
      requestAnimationFrame(tick);
    });
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
  connectedCallback() {
    this.renderAmount();
  }
  async renderAmount() {
    ;
    await this.animateAmount(12845678);
    const total_amount_style = getComputedStyle(this._shadowRoot.querySelector('#total-amount'));
    const amount_style = getComputedStyle(this._shadowRoot.querySelector('.amount'));
    this.dispatchEvent(new CustomEvent("mounted", {
      detail: {
        cardHeight: total_amount_style.height,
        cardWidth: amount_style.width
      }
    }));
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
customElements.define('amount-card', AmountCard);
export default AmountCard;