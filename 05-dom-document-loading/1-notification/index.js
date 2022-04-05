export default class NotificationMessage {
  element;

  constructor() {
    this.render();
  }

  getTemplate() {
    return ``;
  }

  render() {
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
