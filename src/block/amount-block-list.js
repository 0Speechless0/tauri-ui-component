import "./amount-block.js";
const template = document.createElement('template');
template.innerHTML = /*html*/ `
<style>
  .records {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
<ul id="content" class="records">


</ul>

`;
/*
properties:
data: [][2] when [0] is value , [1] is tag

*/
class AmountBlockList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({
      mode: 'closed'
    });
    this._shadowRoot.appendChild(document.importNode(template.content.cloneNode(true), true));
    this.#render();
  }

  get dataArray() {
    return JSON.parse(this.getAttribute("data"))
  }
  #render() {
    const content = this._shadowRoot.querySelector("#content");
    console.log("AA", this.dataArray)
    this.dataArray.forEach((value, index, array) => {
      const amount_block = document.createElement("amount-block");
      const tag = document.createElement("span");
      tag.slot = "tag";
      tag.innerHTML = value[1];
      if (parseInt(value[0]) > 0)
        amount_block.setAttribute("color", "plus")
      if (parseInt(value[0]) < 0) amount_block.setAttribute("color", "minus");
      amount_block.innerHTML = value[0];
      amount_block.appendChild(tag);
      content.appendChild(amount_block);
    })
  }
}
customElements.define('amount-block-list', AmountBlockList);