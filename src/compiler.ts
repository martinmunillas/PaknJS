import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__dirname, '../src/helloWorld.pakn'), 'utf-8');

let outFile = '';

let counter = 0;

let finding = [];

let i = file[0];

const lines = file.split('\n');

outFile += `import {createElement} from 'pakn';
createElement('hello-world', (props) => \`${file.replace(/\|(.+)\|/, '${props.$1}')}\`)`;

fs.writeFileSync(path.join(__dirname, '../build/helloWorld.js'), outFile);
