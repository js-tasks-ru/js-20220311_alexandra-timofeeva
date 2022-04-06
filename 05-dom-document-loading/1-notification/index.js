export default class NotificationMessage {
  element;
  timerId;

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
      <div class="notification ${this.show(this.type)}" style="--value:${Math.floor(this.duration / 1000)}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header '${this.show(this.type)}'"></div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    this.element = document.createElement('div');
    this.element.innerHTML = this.getTemplate();
    this.element = this.element.firstElementChild;
  }

  show() {
    if (this.type === 'success') {
      this.timerId = setTimeout(() => this.removeNotificationMessage(), this.duration);
      return document.getElementsByClassName('notification').className = ' success';
    }
    else if (this.type === 'error') {
      return document.getElementsByClassName('notification').className = ' error';
    }
  }

  removeNotificationMessage() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.remove();
    }
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}
