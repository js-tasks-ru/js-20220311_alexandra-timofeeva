export default class SortableTable {
  element;
  subElements = {};
  data = [];
  headerConfig = []

  constructor(headerConfig = [], data = []) {
    this.data = data;
    this.headerConfig = headerConfig;
    this.render();
  }

  getTemplate() {
    return `
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.getColumnTitles()}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this.getRows(this.data)}
          </div>
          <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
          <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
            <div>
              <p>No products satisfies your filter criteria</p>
              <button type="button" class="button-primary-outline">Reset all filters</button>
            </div>
          </div>
        </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
    this.element = element;
    this.subElements = this.getSubElements(element);
  }

  getColumnTitles() {
    return this.headerConfig.map(
      item => {
        return `
        <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
           <span>${item.title}</span>
           <span data-element="arrow" class="sortable-table__sort-arrow">
            <span class="sort-arrow"></span>
           </span>
        </div>`;
      }
    ).join('');
  }

  getRows(data = []) {
    return data.map(
      item => {
        return `
          <a href="/products/${item.id}" class="sortable-table__row">
             ${this.getCell(item)}
          </a>
        `;
      }).join('');
  }

  getCell(item) {
    return this.headerConfig.map(({id, template}) => {
      return template
        ? template(item[id])
        : `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }

  sort(fieldValue, orderValue) {
    const sortedData = this.sortData(fieldValue, orderValue);
    const cell = this.element.querySelector(`.sortable-table__cell[data-id="${fieldValue}"]`);

    cell.dataset.order = orderValue;
    this.subElements.body.innerHTML = this.getRows(sortedData);
  }

  sortData(field, order) {
    const locales = ['ru', 'en'];
    const options = {
      caseFirst: 'upper',
    };
    const directions = {
      asc: 1,
      desc: -1
    };
    const direction = directions[order];
    const column = this.headerConfig.find(item => item.id === field);
    const { sortType } = column;

    return [...this.data].sort((a, b) => {
      switch (sortType) {
        case 'number':
          return direction * (a[field] - b[field]);
        case 'string':
          return direction * a[field].localeCompare(b[field], locales, options);
        default:
          return direction * (a[field] - b[field]);
      }
    });
  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');
    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }
    return result;
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

