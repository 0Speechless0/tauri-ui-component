import "./button/index.js"
import "./layout/ratio-grid.js"
import "./global/sticky-header.js"
import "./layout/fan-permu.js"
import "./card/amount-card.js"
import "./card/amount-card-with-circle.js"
const template = document.createElement("template");
template.innerHTML = /*html*/ `
<sticky-header data='[ "記帳", "查詢" , "設定"]' logo="COIN-STORY">
  <ratio-grid data="[[1], [1], [2 ,2, 2], [1], [1]]">
    <fan-permu>
      <div>A</div>
      <div>B</div>
      <div>C</div>
      <div>D</div>
      <div>F</div>

    </fan-permu>

    <primary-button> </primary-button>
    <success-button> </success-button>
    <danger-button> </danger-button>
    <amount-card-with-circle radius="100" line-width="5" , max-value="12845678"> </amount-card-with-circle>
    <!-- <amount-card></amount-card> -->



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