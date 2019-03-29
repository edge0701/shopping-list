import { customElement, html, LitElement, property, query } from 'lit-element';

import * as api from '../../utils/api';
import './item-input';
import { ShoppingListItemInput } from './item-input';
import { ShoppingListItem } from './list-item';
import './list-item';

// For prototyping purposes before authentication has been implemented
const userId = 1;

@customElement('shopping-list' as any)
class ShoppingList extends LitElement {

  @property()
  private listItems: ShoppingListItem[] = [
    { name: 'Item 1', purchased: true },
    { name: 'Item 2' },
    { name: 'Item 3' },
  ];
  @property() private errorMsg: string;
  @query('item-input') private itemInput: ShoppingListItemInput;
  private listId: number;

  public render() {
    return html`
    <style>
      :host {
        display: block;
        padding-left: 10px;
      }

      .error {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        color: red;
      }

      ul {
        list-style-type: none;
        padding: 0;
      }

      list-item {
        padding: 5px 0 5px 0;
      }
    </style>

    ${this.renderError()}

    <h1>Shopping list</h1>

    <item-input @add-item="${this.onAddItem}"></item-input>

    <ul>
      ${this.renderListItems()}
    </ul>
    `;
  }

  public async firstUpdated() {
    let resp = await api.getList(userId);
    this.listItems = resp.data || [];
    this.listId = resp.id;
    if (!resp.data) {
      resp = await api.createList(userId, { data: this.listItems });
      this.listId = resp.id;
    }
  }

  private renderListItems() {
    return html`
    ${this.listItems.map((item, idx) =>
      html`
        <li>
          <list-item
            .item="${item}"
            ?first="${idx === 0}"
            ?last="${idx === this.listItems.length - 1}"
            ?purchased="${item.purchased}"
            @delete="${e => this.onDeleteItem(idx)}"
            @move-up="${e => this.onMoveItemUp(idx)}"
            @move-down="${e => this.onMoveItemDown(idx)}"
            @status-changed="${e => this.onItemStatusChanged(idx, e.detail)}">
          </list-item>
        </li>
    `)}`;
  }

  private renderError() {
    if (this.errorMsg) {
      setTimeout(() => this.errorMsg = undefined, 5000);
      return html`<div class="error">${this.errorMsg}</div>`;
    }
  }

  private async onAddItem(ev: CustomEvent) {
    const item: ShoppingListItem = ev.detail;
    const listItemsOrig = [...this.listItems];

    this.listItems = [
      ...this.listItems,
      item,
    ];

    try {
      await this.saveList();
    } catch (err) {
      this.listItems = listItemsOrig;
      this.itemInput.setText((item as any).namelol);
    }
  }

  private async onDeleteItem(idx: number) {
    const listItemsOrig = [...this.listItems];

    this.listItems = [
      ...this.listItems.slice(0, idx),
      ...this.listItems.slice(idx + 1, this.listItems.length),
    ];

    try {
      await this.saveList();
    } catch (err) {
      this.listItems = listItemsOrig;
    }
  }

  private async onMoveItemUp(idx: number) {
    if (idx === 0) return;
    const listItemsOrig = [...this.listItems];
    const listItemsCopy = [...this.listItems];

    listItemsCopy.splice(idx - 1, 0, listItemsCopy.splice(idx, 1)[0]);
    this.listItems = [...listItemsCopy];

    try {
      await this.saveList();
    } catch (err) {
      this.listItems = listItemsOrig;
    }
  }

  private async onMoveItemDown(idx: number) {
    if (idx === this.listItems.length - 1) return;
    const listItemsOrig = [...this.listItems];
    const listItemsCopy = [...this.listItems];

    listItemsCopy.splice(idx + 1, 0, listItemsCopy.splice(idx, 1)[0]);
    this.listItems = [...listItemsCopy];

    try {
      await this.saveList();
    } catch (err) {
      this.listItems = listItemsOrig;
    }
  }

  private async onItemStatusChanged(idx: number, detail: any) {
    const listItemsOrig = [...this.listItems];

    this.listItems = [
      ...this.listItems.slice(0, idx),
      {
        ...this.listItems[idx],
        purchased: detail.purchased,
      },
      ...this.listItems.slice(idx + 1, this.listItems.length),
    ];

    try {
      await this.saveList();
    } catch (err) {
      this.listItems = listItemsOrig;
    }
  }

  private async saveList() {
    try {
      const resp = await api.updateList(this.listId, { data: this.listItems });
    } catch (err) {
      this.errorMsg = err.message;
      throw err;
    }
  }
}
