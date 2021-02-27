import { ComponentName, MinProps, nameRegEx, PaknError, Props } from './extras';

export const createElement = <T extends Props>(
  name: ComponentName,
  component: (props: T) => string,
  props?: T,
  styles?: string
): string | never => {
  if (!name.match(nameRegEx)) {
    throw new PaknError('Element Name not valid');
  }
  class Component extends HTMLElement {
    styles: string = styles || '';
    myAttributes: string[] = this.getAttributeNames();
    props: (T & MinProps) | MinProps = { ...props, children: '<slot></slot>' };

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    getTemplate() {
      const template = document.createElement('template');
      template.innerHTML = `
            ${component({ ...this.props } as T)}
            <style>${this.styles}</style>
            `;
      return template;
    }

    render() {
      this.shadowRoot?.appendChild(this.getTemplate().content.cloneNode(true));
    }

    connectedCallback() {
      this.render();
    }
  }
  customElements.define(name, Component);
  return name;
};