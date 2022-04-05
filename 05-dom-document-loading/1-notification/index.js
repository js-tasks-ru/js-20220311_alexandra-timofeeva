export default class NotificationMessage {
  element;
  message = '';
  duration = 0;
  type = '';

  constructor(message = '', duration = 0, type = '') {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.render();
  }

  getTemplate() {
    return `
      <div class="notification '${this.show(this.type)}'" style=${this.duration}>
        <div class="timer">${this.duration}</div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
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

  show(type = '') {
    if (this.type === 'success') {
      console.log(this.element);
      this.element.addClass('.success');
      return this.message; }
    else if (this.type === 'error') {
      return err;
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
    this.subElements = {};
  }

}
