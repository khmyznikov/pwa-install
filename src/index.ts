import { customElement, LitElement, html } from 'lit-element';

import styles from './styles.scss';

@customElement('root-el')
export class RootElement extends LitElement {

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <h3>Test drive</h3> <h1>Hello World</h1>
    `
  }
}
