export default class NotificationMessage {
  static activeNotification;

  constructor(message = '', {
    duration = 1000,
    type = ''
  } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.render();
  }

  getTemplate() {
    return `
      <div class="notification ${this.type}" style="--value:${Math.floor(this.duration / 1000)}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header '${this.type}'"></div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
  }

  show(element = document.body) {
    element.append(this.element);
    setTimeout(() => this.remove(), this.duration);
    NotificationMessage.activeNotification = this;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    NotificationMessage.activeNotification = null;
  }
}
