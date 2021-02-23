import { MinProps, nameRegEx, PaknError } from './extras';

export const createElement = <T extends MinProps>(
  name: string,
  component: (props: T) => string,
  styles?: string
): string | never => {
  if (!name.match(nameRegEx)) {
    throw new PaknError('Element Name not valid');
  }
  class Component extends HTMLElement {
    styles: string;
    myAttributes: string[];
    props: any = {};

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.styles = styles || '';
      this.myAttributes = this.getAttributeNames();
      this.myAttributes.forEach((attribute) => {
        let att = this.getAttribute(attribute);
        try {
          att = JSON.parse(att!.replace(/'/g, '"'));
        } catch {}
        this.props[attribute] = att;
      });
    }

    getTemplate() {
      const template = document.createElement('template');
      template.innerHTML = `
            ${component({ ...this.props, children: '<slot></slot>' } as T)}
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
