import { customElement, html, LitElement, property, query } from 'lit-element';

export interface ShoppingListItemInputDetail {
  name: string;
}

@customElement('item-input' as any)
class ShoppingListItemInput extends LitElement {

  @query('#input') private inputEl: HTMLInputElement;

  public render() {
    return html`
    <input id="input" placeholder="Add item..." @keyup="${this.onKeyUp}"/>
    `;
  }

  private onKeyUp(ev: KeyboardEvent) {
    if (ev.keyCode === 13 || ev.which === 13) {
      const item: ShoppingListItemInputDetail = {
        name: this.inputEl.value,
      };
      if (this.dispatchEvent(new CustomEvent('add-item', { detail: item }))) {
        this.inputEl.value = '';
      }
    }
    return true;
  }
}
