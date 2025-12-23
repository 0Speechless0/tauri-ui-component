import "../block/amount-block-list.js";
const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
  .amount-card {
    width: 320px;
    padding: 1.25rem;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 10px 30px rgba(0, 0, 0, .08);
    font-family: system-ui, sans-serif;
    margin: auto;
  }

  .header {
    font-size: 0.875rem;
    color: #64748B;
  }

  .total {
    margin-top: .5rem;
    font-size: 1.8rem;
    font-weight: 700;
    color: #0F172A;
  }

  .currency {
    font-size: 1rem;
    margin-right: 4px;
  }

  .trend {
    margin-top: .25rem;
    font-size: 0.875rem;
  }

  .trend.positive {
    color: #16A34A;
  }

  .trend.negative {
    color: #DC2626;
  }

  .divider {
    height: 1px;
    background: rgba(0, 0, 0, .06);
    margin: 1rem 0;
  }

  .records {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .records li {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    padding: .25rem 0;
  }

  .records .plus {
    color: #16A34A;
  }

  .records .minus {
    color: #DC2626;
  }

  .records small {
    color: #64748B;
  }
</style>
<div class="amount-card">
  <div class="header">累計金額</div>

  <div class="total">
    <span class="currency">NT$</span>
    <span class="value">1,284,560</span>
  </div>

  <div class="trend positive">
    ▲ +12.4% <span>本月</span>
  </div>

  <div class="divider"></div>
  <amount-block-list data='[["+45,000", "薪資"], ["-12,500", "房租"], ["-3,200", "吃飯"] ]'>
  </amount-block-list>

</div>

`;
/*
properties:

title,
subtitle,
content,
create_at,

*/
class FinanceCard extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({
      mode: "closed"
    });
    this._shadowRoot.appendChild(template.content.cloneNode(true))
  }

  static get observedAttributes() {
    return [
      "title",
      "subtitle",
      "content",
      "create_at",
    ];
  }

}

customElements.define('finance-card', FinanceCard);
export default FinanceCard;