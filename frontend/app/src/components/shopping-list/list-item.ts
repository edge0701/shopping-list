import { customElement, html, LitElement, property, query } from 'lit-element';

export interface ShoppingListItem {
  name: string;
  purchased?: boolean;
}

@customElement('list-item' as any)
class ShoppingListItemEl extends LitElement {

  @property() private _item: ShoppingListItem;

  @query('#checkbox') private checkbox: HTMLInputElement;

  public render() {
    return html`

    <style>
      .name {
        font-size: 12px;
      }

      :host([purchased]) .name {
        text-decoration: line-through;
      }

      .delete {
        text-decoration: underline;
        color: blue;
        font-style: italic;
        font-size: 10px;
        cursor: pointer;
      }
    </style>

    <input id="checkbox" type="checkbox" @click="${this.onCheckboxChanged}"/>
    <span class="name">${this.item ? this.item.name : null}</span>
    <span class="delete" @click="${this.onDeleteItem}">(Delete)</span>
    `;
  }

  public firstUpdated() {
    if (this.checkbox && this.item && this.checkbox.checked !== this.item.purchased) {
      this.checkbox.checked = !!this.item.purchased;
    }
  }

  public set item(item: ShoppingListItem) {
    this._item = item;
    if (this.checkbox) {
      this.checkbox.checked = !!item.purchased;
    }
  }

  public get item(): ShoppingListItem {
    return this._item;
  }

  private onDeleteItem() {
    this.dispatchEvent(new CustomEvent('delete'));
  }

  private onCheckboxChanged() {
    this.dispatchEvent(new CustomEvent('status-changed', { detail: { purchased: this.checkbox.checked }}));
  }
}
