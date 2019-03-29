import { customElement, html, LitElement, query } from 'lit-element';

import { ShoppingListItem } from './list-item';

@customElement('item-input' as any)
export class ShoppingListItemInput extends LitElement {

  @query('#input') private inputEl: HTMLInputElement;

  public render() {
    return html`
    <input id="input" placeholder="Add item..." @keyup="${this.onKeyUp}"/>
    `;
  }

  public setText(text: string) {
    this.inputEl.value = text;
  }

  private onKeyUp(ev: KeyboardEvent) {
    if (ev.keyCode === 13 || ev.which === 13) {
      const item: ShoppingListItem = {
        name: this.inputEl.value,
      };
      if (this.dispatchEvent(new CustomEvent('add-item', { detail: item }))) {
        this.inputEl.value = '';
      }
    }
    return true;
  }
}
