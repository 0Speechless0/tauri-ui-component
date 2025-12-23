import "./button/index.js"
import "./layout/ratio-grid.js"
import "./global/sticky-header.js"
import "./layout/fan-permu.js"
import "./card/amount-card.js"
import "./card/amount-card-with-circle.js"
import "./card/logs-card.js"
import "./card/finance-card.js"
const template = document.createElement("template");
template.innerHTML = /*html*/ `
<sticky-header data='[ "弧排列", "網格" , "卡片"]' logo="component-demo">
  <fan-permu height="500" width="500" item-height="60" item-width="60">
    <div>A</div>
    <div>B</div>
    <div>C</div>
    <div>D</div>
    <div>F</div>
  </fan-permu>
  <ratio-grid data="[[1,2 ], [1]]">

    <primary-button> AAA</primary-button>
    <success-button> AAA</success-button>
    <danger-button> AAA</danger-button>

  </ratio-grid>
  <ratio-grid data="[[1], [1] ,[1] , [1]]">

    <amount-card-with-circle radius="100" line-width="5" max-value="12845678" style="maring-top: -100px"> </amount-card-with-circle>

    <logs-card> </logs-card>
    <ul>
    </ul>
    <finance-card />
  </ratio-grid>

  <div>
    AAA
  </div>
  <div>
    設定
  </div>
</sticky-header>


`;

class DemoRoot extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open"
    })
    this.shadowRoot.appendChild(template.content.cloneNode(true));
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
}

customElements.define('demo-root', DemoRoot);