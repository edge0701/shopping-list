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
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .name {
        font-size: 12px;
        padding-right: 10px;
      }

      :host([purchased]) .name {
        text-decoration: line-through;
      }

      .ordering {
        display: inline-block;
        font-size: 14px;
      }

      .ordering > .up, .ordering > .down {
        cursor: pointer;
      }

      :host([first]) .ordering > .up {
        opacity: 0;
        cursor: default;
      }

      :host([last]) .ordering > .down {
        opacity: 0;
        cursor: default;
      }

      .delete {
        text-decoration: underline;
        color: blue;
        font-style: italic;
        font-size: 10px;
        cursor: pointer;
      }

      #checkbox {
        margin: 0 10px 0 10px;
        min-height: 15px;
        min-width: 15px;
      }
    </style>

    <div class="ordering">
      <div class="up" @click="${this.onMoveUp}">▲</div>
      <div class="down" @click="${this.onMoveDown}">▼</div>
    </div>
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

  private onMoveUp() {
    if (this.hasAttribute('first')) return;
    this.dispatchEvent(new CustomEvent('move-up'));
  }

  private onMoveDown() {
    if (this.hasAttribute('last')) return;
    this.dispatchEvent(new CustomEvent('move-down'));
  }

  private onDeleteItem() {
    this.dispatchEvent(new CustomEvent('delete'));
  }

  private onCheckboxChanged() {
    this.dispatchEvent(new CustomEvent('status-changed', { detail: { purchased: this.checkbox.checked }}));
  }
}
