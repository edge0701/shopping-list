import { customElement, html, LitElement, property } from 'lit-element';

export interface ShoppingListItem {
  name: string;
}

@customElement('shopping-list-item' as any)
class ShoppingListItemEl extends LitElement {

  @property() public item: ShoppingListItem;

  public render() {
    return html`
    ${this.item ? this.item.name : null}
    `;
  }
}
