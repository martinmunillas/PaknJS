const nameRegEx = /[a-z]-[a-z]/;

class PaknError {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

interface MinProps {
  children: string;
}

export const createElement = <T extends MinProps>(
  name: string,
  component: (props: T) => string,
  styles?: string
) => {
  if (!name.match(nameRegEx)) {
    throw new PaknError('Element Name not valid');
    return;
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
        this.props[attribute] = this.getAttribute(attribute);
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
};