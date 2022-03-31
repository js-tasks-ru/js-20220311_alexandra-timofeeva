export default class SortableTable {
  data = [];
  static columnTitles = [
    {
      title: 'Image',
      id: 'images'
    },
    {
      title: 'Name',
      id: 'title'
    },
    {
      title: 'Quantity',
      id: 'quantity'
    },
    {
      title: 'Price',
      id: 'price'
    },
    {
      title: 'Sales',
      id: 'sales'
    }
  ]

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
    return SortableTable.columnTitles.map(
      title => {
        return `
        <div class="sortable-table__cell" data-id="${title.id}" data-sortable="false" data-order="asc">
                <span>${title.title}</span>
        </div>
      `;
      }
    ).join("");
  }

  getRows() {
    return this.data.map(
      item => {
        return `
          <a href="/products/${item.id}" class="sortable-table__row">
             ${this.getTableRow(item)}
          </a>
        `;
      }).join('')
  }

  getTableRow(item) {
    return this.data.map(
      item => {
        return `

        `
      }
    )
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

