
var head = require('./');

console.dir(head('Readme.md').toString());
console.dir(head('Readme.md', 100).toString());
console.dir(head('Readme.md', 50).toString());
console.dir(head('Readme.md', 20).toString());
console.dir(head('Readme.md', 10).toString());
console.dir(head('Readme.md', 4).toString());