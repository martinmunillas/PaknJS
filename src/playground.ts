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
  return name;
};

const render = (name: string, element: HTMLElement | null) => {
  if (!element) {
    throw new PaknError('Element not found');
  } else {
    element.innerHTML = `<${name}></${name}>`;
  }
};

const Pakn = {
  createElement,
  render,
};

const myApp = Pakn.createElement(
  'my-app',
  () => `
<app-child></app-child>
`
);

Pakn.createElement(
  'app-child',
  () => `
<my-header></my-header>
<my-list item_one="Hello Item One" item_two="Hello Item Two">Hello Item Three</my-list>
`
);

Pakn.createElement(
  'my-header',
  () => `
<h1>Hello Dad</h1>
`
);

Pakn.createElement<{ item_one: string; item_two: string } & MinProps>(
  'my-list',
  ({ children, item_one, item_two }) => `
<ul>
<li>${item_one}</li>
<li>${item_two}</li>
<li>${children}</li>
</ul>
`
);

Pakn.render(myApp, document.getElementById('root'));
