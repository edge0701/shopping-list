import { customElement, html, LitElement } from 'lit-element';

import './shopping-list';

@customElement('my-app' as any)
class MyApp extends LitElement {
  public render() {
    return html`
      <shopping-list></shopping-list>
    `;
  }
}
