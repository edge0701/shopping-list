import { customElement, html, LitElement, property } from 'lit-element';

import * as api from '../../utils/api';
import './item-input';
import { ShoppingListItemInputDetail } from './item-input';
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
  private listId: number;

  public render() {
    return html`
    <style>
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
            ?purchased="${item.purchased}"
            @delete="${e => this.onDeleteItem(idx)}"
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

  private onAddItem(ev: CustomEvent) {
    const item: ShoppingListItemInputDetail = ev.detail;
    this.listItems = [
      ...this.listItems,
      item,
    ];
    this.saveList();
  }

  private onDeleteItem(idx: number) {
    this.listItems = [
      ...this.listItems.slice(0, idx),
      ...this.listItems.slice(idx + 1, this.listItems.length),
    ];
    this.saveList();
  }

  private onItemStatusChanged(idx: number, detail: any) {
    this.listItems = [
      ...this.listItems.slice(0, idx),
      {
        ...this.listItems[idx],
        purchased: detail.purchased,
      },
      ...this.listItems.slice(idx + 1, this.listItems.length),
    ];
    this.saveList();
  }

  private async saveList() {
    try {
      const resp = await api.updateList(this.listId, { data: this.listItems });
    } catch (err) {
      this.errorMsg = err.message;
    }
  }
}
