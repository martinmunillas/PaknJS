export const nameRegEx = /[a-z]-[a-z]/;

export class PaknError {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export interface MinProps {
  children: string;
}



