import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__dirname, '../src/helloWorld.pakn'), 'utf-8');

let outFile = '';

outFile += `import {createElement} from 'pakn';
createElement('hello-world', (props) => \`${file.replace(/\|(.+)\|/, '${props.$1}')}\`)`;

fs.writeFileSync(path.join(__dirname, '../src/helloWorld.js'), outFile);
