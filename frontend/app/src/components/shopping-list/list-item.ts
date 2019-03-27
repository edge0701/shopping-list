import { customElement, html, LitElement, property } from 'lit-element';

export interface ShoppingListItem {
  name: string;
}

@customElement('list-item' as any)
class ShoppingListItemEl extends LitElement {

  @property() public item: ShoppingListItem;

  public render() {
    return html`

    <style>
      .name {
        font-size: 12px;
      }

      .remove {
        text-decoration: underline;
        color: blue;
        font-style: italic;
        font-size: 10px;
        cursor: pointer;
      }
    </style>

    <span class="name">${this.item ? this.item.name : null}</span>
    <span class="remove" @click="${this.onDeleteItem}">(Delete)</span>
    `;
  }

  private onDeleteItem() {
    this.dispatchEvent(new CustomEvent('delete-item'));
  }
}
