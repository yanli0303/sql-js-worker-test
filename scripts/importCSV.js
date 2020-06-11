const fs = require('fs');
const path = require('path');
const readline = require('readline');

const src = path.join(__dirname, '1M.csv');
const dst = path.join(__dirname, '..', 'src', 'main', 'data.js');
if (fs.existsSync(dst)) {
  fs.unlinkSync(dst);
}

const writeOptions = { encoding: 'utf-8', flag: 'a' };
const writeHeader = () => fs.writeFileSync(dst, 'export const data = [\n', writeOptions);
const writeFooter = () => fs.writeFileSync(dst, '];\n', writeOptions);
const appendLine = (line) => {
  const text = line
    .split(',')
    .map((column) => (/\d+/.test(column) ? column : `'${column}'`))
    .join(',');

  fs.writeFileSync(dst, `[${text}],\n`, writeOptions);
};

async function processLineByLine() {
  writeHeader();
  const fileStream = fs.createReadStream(src);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  // eslint-disable-next-line
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    appendLine(line);
  }

  writeFooter();
}

processLineByLine().catch(console.log);
