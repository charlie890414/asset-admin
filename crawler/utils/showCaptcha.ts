import terminalImage from 'terminal-image';
import { tmpdir } from 'os';

console.log(tmpdir() + '\\imgcode.png');
console.log(await terminalImage.file(tmpdir() + '\\imgcode.png'));
