import { Node } from '../core/node';

let text = 'hello';

const b = new Node('h1', [text]);

const c = new Node('h2', ['world']);

const a = new Node('div', [b, c]);

const tree = Node.createTree(document.getElementById('root')!, [a]);

setTimeout(() => {
  text = 'bye';
  console.log('text')
  tree.render()
}, 1000);

// const d = ['asdf']

// const aasd = (f: typeof d) => f[0] = 'hola' 
// aasd(d)

// console.log(d)