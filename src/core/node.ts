type Child = Node | string;

export class Node {
  childs: Child[] = [];
  parent?: Node;
  isParent: boolean = false;
  tag: string | null;
  element?: HTMLElement;

  constructor(tag: string | null, children?: Child[]) {
    children?.forEach((child) => {
      if (typeof child !== 'string') {
        child.parent = this;
      }
    });
    if (children) {
      this.childs.push.apply(this.childs, children);
    }
    this.tag = tag;
  }

  append(childs: Child[]) {
    childs.forEach((child) => {
      if (typeof child !== 'string') {
        child.parent = this;
      }
    });
    this.childs.concat(childs);
  }

  toString() {
    console.log(this.childs);
    const str: string = `${this.tag ? `<${this.tag}>` : ''}
    ${this.childs.map((child) => (child instanceof Node ? child.toString() : child)).join('')}
    ${this.tag ? `</${this.tag}>` : ''}`;
    return str;
  }

  render() {
    if (!this.element || !this.isParent) {
      throw new Error('Not Correct');
    }
    this.element.innerHTML = this.toString();
  }

  static createTree(element: HTMLElement, children?: Child[]) {
    const tree = new Node(null, children);
    tree.element = element;
    tree.isParent = true;
    tree.render();
    return tree;
  }
}
