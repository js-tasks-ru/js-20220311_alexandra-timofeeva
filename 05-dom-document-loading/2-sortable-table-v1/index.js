export default class SortableTable {
  data = [];
  headerConfig = []

  constructor(headerConfig = [], data = []) {
    this.data = data;
    this.headerConfig = headerConfig;
    this.render();
  }

  getTemplate() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.getColumnTitles()}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this.getRow()}
          </div>
          <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
          <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
            <div>
              <p>No products satisfies your filter criteria</p>
              <button type="button" class="button-primary-outline">Reset all filters</button>
            </div>
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

  getColumnTitles() {
    return this.headerConfig.map(
      item => {
        return `
        <div class="sortable-table__cell" data-id="${item.id}" data-sortable="false" data-order="asc">
                <span>${item.title}</span>
        </div>
      `;
      }
    ).join("");
  }

  getRow() {
    return this.data.map(
      item => {
        return `
          <a href="/products/${item.id}" class="sortable-table__row">
             ${this.getCell(item)}
          </a>
        `;
      }).join('')
  }

  getCell(item) {
    // const cells = this.headerConfig.map(({id, template}) => {
    //   return {
    //     id, template
    //   };
    // });

    return this.headerConfig.map(({id, template}) => {
      return template
        ? template(item[id])
        : `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }

  sort(fieldValue, orderValue) {
    const sortedData = this.sortData(fieldValue, orderValue);
    return sortedData;
  }

  sortData(field, order) {
    const locales = ['ru', 'en'];
    const options = {
      caseFirst: 'upper',
    };
    const directions = {
      asc : 1,
      desc: -1
    };
    const direction = directions[order];

    return [...this.data].sort( (a, b) => {
      return direction * a[field].localeCompare(b[field], locales, options)
    });
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

