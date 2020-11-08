import { customElement, LitElement, html } from 'lit-element';

import styles from './styles.scss';
import template from './template';

@customElement('root-el')
export class RootElement extends LitElement {

  static get styles() {
    return styles;
  }

  render() {
    return html`${template('Hello', 'World')}`;
  }
}
