import { PaknError } from './extras';

export const render = (name: string, element: HTMLElement | null) => {
  if (!element) {
    throw new PaknError('Element not found');
  } else {
    element.innerHTML = `<${name}></${name}>`;
  }
};
