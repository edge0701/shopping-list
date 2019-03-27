import { customElement, html, LitElement, property } from 'lit-element';

import { ShoppingListItem } from './shopping-list-item';
import './shopping-list-item';

@customElement('shopping-list' as any)
class ShoppingList extends LitElement {

  @property()
  private listItems: ShoppingListItem[] = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
  ];

  public render() {
    return html`
    <h1>Shopping list</h1>

    <ul>
      ${this.listItems.map(i =>
        html`
          <li>
            <shopping-list-item .item="${i}"></shopping-list-item>
          </li>
        `)
      }
    </ul>
    `;
  }
}
