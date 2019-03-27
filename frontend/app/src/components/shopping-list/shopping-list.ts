import { customElement, html, LitElement, property } from 'lit-element';

import './item-input';
import { ShoppingListItemInputDetail } from './item-input';
import { ShoppingListItem } from './list-item';
import './list-item';

@customElement('shopping-list' as any)
class ShoppingList extends LitElement {

  @property()
  private listItems: ShoppingListItem[] = [
    { name: 'Item 1', purchased: true },
    { name: 'Item 2' },
    { name: 'Item 3' },
  ];

  public render() {
    return html`
    <style>
      ul {
        list-style-type: none;
        padding: 0;
      }
    </style>

    <h1>Shopping list</h1>

    <item-input @add-item="${this.onAddItem}"></item-input>

    <ul>
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
        `)
      }
    </ul>
    `;
  }

  private onAddItem(ev: CustomEvent) {
    const item: ShoppingListItemInputDetail = ev.detail;
    this.listItems = [
      ...this.listItems,
      item,
    ];
  }

  private onDeleteItem(idx: number) {
    this.listItems = [
      ...this.listItems.slice(0, idx),
      ...this.listItems.slice(idx + 1, this.listItems.length),
    ];
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
  }
}
