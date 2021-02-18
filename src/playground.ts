import { MinProps, Pakn } from './createElement.js';

const myApp = Pakn.createElement(
  'my-app',
  () => `
<app-child></app-child>
`
);

Pakn.createElement(
  'app-child',
  () => `
<my-header>Hello Pakn</my-header>
<my-list item_one="Hello Item One" item_two="Hello Item Two">Hello Item Three</my-list>
`
);

Pakn.createElement(
  'my-header',
  ({ children }) => `
<h1>${children}</h1>
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
`,
  `* { font-family: Helvetica; }`
);

Pakn.render(myApp, document.getElementById('root'));
