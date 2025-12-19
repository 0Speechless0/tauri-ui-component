const template = document.createElement('template');
template.innerHTML = /*html*/ `
<style>
  .container {
    max-width: var(--width, 800px);
    margin: auto;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .row {
    display: flex;
    gap: 10px;
  }

  .cell {
    color: white;
    padding: 10px;
    text-align: center;

    flex-basis: 0;
    /* 讓 flex-grow 生效 */
  }
</style>
<div id="container" class="container">
  <slot> </slot>
</div>

`;

class RatioGrid extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({
      mode: 'closed'
    });
    this.setAttribute("mobile-breakpoint", "600")
    this._shadowRoot.appendChild(document.importNode(template.content.cloneNode(true), true));
    const slot = this._shadowRoot.querySelector("slot");
    this.container = this._shadowRoot.querySelector("#container")

    this.elements = slot.assignedElements({
      flatten: true
    })
    this.render();

  }
  static get observedAttributes() {
    return ['data', 'mobile-breakpoint'];
  }

  connectedCallback() {
    window.addEventListener('resize', () => this.updateLayout());
  }

  disconnectedCallback() {
    window.removeEventListener('resize', () => this.updateLayout());
  }

  get dataArray() {
    try {
      const arr = JSON.parse(this.getAttribute('data')) || [];

      return arr;
    } catch {
      return [];
    }
  }

  get mobileBreakpoint() {
    return parseInt(this.getAttribute('mobile-breakpoint')) || 600;
  }

  updateLayout() {
    const isMobile = window.innerWidth < this.mobileBreakpoint;
    const rows = this._shadowRoot.querySelectorAll('.row');
    rows.forEach(row => {
      row.style.flexDirection = isMobile ? 'column' : 'row';
    });
  }

  render() {

    let i = 0;



    this.dataArray.forEach((rowData, rowIndex) => {
      const row = document.createElement('div');
      row.classList.add('row');

      rowData.forEach((value, colIndex) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.flexGrow = value;
        cell.appendChild(this.elements[i] || document.createElement("span"))
        row.appendChild(cell);
        i++

      });

      this.container.appendChild(row);
    });




    this.updateLayout();

  }
}

customElements.define('ratio-grid', RatioGrid);