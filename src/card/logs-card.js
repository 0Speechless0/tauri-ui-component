const template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
  .record-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 20px;
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 420px;
    margin: auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
  }

  .title {
    font-size: 1.05rem;
    font-weight: 600;
    color: #111827;
    margin: 0;
  }

  .subtitle {
    font-size: 0.8rem;
    color: #6b7280;
    white-space: nowrap;
  }

  .content {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #374151;
    margin: 0;
  }

  .footer {
    margin-top: auto;
    font-size: 0.75rem;
    color: #9ca3af;
    text-align: right;
  }
</style>
<div class="record-card">
  <div class="header">
    <h3 class="title">系統更新完成</h3>
    <span class="subtitle">Deployment Log</span>
  </div>

  <p class="content">
    版本 v2.3.1 已成功部署至正式環境，包含效能優化與錯誤修正。
  </p>

  <div class="footer">
    <time datetime="2025-12-23T09:30">
      2025-12-23 09:30
    </time>
  </div>
</div>

`;
/*
properties:

title,
subtitle,
content,
create_at,

*/
class LogsCard extends HTMLElement {
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

customElements.define('logs-card', LogsCard);
export default LogsCard;