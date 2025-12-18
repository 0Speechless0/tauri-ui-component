const template = document.createElement('template');
template.innerHTML = /*html*/ `
<style>
  :root {
    --header-h: 64px;
    --bg: rgba(255, 255, 255, 0.7);
    --border: rgba(0, 0, 0, 0.06);
    --shadow: 0 4px 20px rgba(0, 0, 0, .06);
  }

  .app-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    backdrop-filter: blur(12px);
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    transition: all .25s ease;
  }

  .header-inner {
    height: var(--header-h, 40px);
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-weight: 600;
    letter-spacing: .04em;
  }

  .nav {
    display: flex;
    gap: 24px;
  }

  .nav a {
    font-size: 18px;
    color: #333;
    text-decoration: none;
    position: relative;
  }

  .nav a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 0;
    height: 2px;
    background: #000;
    transition: width .2s ease;
  }

  .nav a:hover::after {
    width: 100%;
  }

  .actions {
    display: flex;
    gap: 12px;
  }

  .btn {
    height: 36px;
    padding: 0 14px;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
  }

  .btn.ghost {
    background: transparent;
    border: 1px solid var(--border);
  }

  .btn.primary {
    background: #000;
    color: #fff;
    border: none;
  }

  /* scroll 狀態 */
  .app-header.scrolled {
    box-shadow: var(--shadow);
    --bg: rgba(255, 255, 255, 0.85);
  }
</style>

<header class="app-header">
  <div class="header-inner">
    <div class="logo"></div>

    <nav class="nav" id="nav-content">

    </nav>

    <!-- <div class="actions">
      <button class="btn ghost">Sign in</button>
      <button class="btn primary">Get started</button>
    </div> -->
  </div>
</header>
<slot>

</slot>
`;

class StickyHeader extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({
      mode: 'open'
    });
    this._shadowRoot.appendChild(document.importNode(template.content.cloneNode(true), true));
    this.header = this._shadowRoot.querySelector('.app-header');
    this.navContent = this._shadowRoot.querySelector("#nav-content");
    this._shadowRoot.querySelector(".logo").innerHTML = this.getAttribute("logo");

    const slot = this._shadowRoot.querySelector("slot");

    this.elements = slot.assignedElements({
      flatten: true
    })
    let i = 0;
    this.contents = {}
    this.elements.forEach(e => {
      this.contents[this.dataArray[i]] = e;
      e.style.display = "none";
      i++;
    })
    if (this.elements.length > 0)
      this.elements[0].style.display = "block"
    window.addEventListener('scroll', () => {
      this.header.classList.toggle('scrolled', window.scrollY > 8);
    });

    this.dataArray.forEach((value) => {
      const link = document.createElement("a");
      link.href = "#"
      link.innerHTML = value;
      this.navContent.appendChild(link);
      link.addEventListener("click", () => {
        this.setAttribute("content", value)
      })
    })

  }

  get dataArray() {
    try {
      const arr = JSON.parse(this.getAttribute('data')) || [];

      return arr;
    } catch (e) {
      console.log(e)
      return [];
    }
  }

  static get observedAttributes() {
    return ['data', "logo", "content"];
  }

  connectedCallback() {

  }

  attributeChangedCallback(name, oldVal, newVal) {

    if (name == "content") {
      this.contents[oldVal].style.display = 'none'
      this.contents[newVal].style.display = 'block'
    }
  }
}
customElements.define('sticky-header', StickyHeader);