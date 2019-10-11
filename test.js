const assert = require("assert");
const bytes = require("./index.js");

(() => {
  const fmt = bytes.Object({
    name: bytes.String(10),
    age: bytes.String(3),
    book: bytes.Object({
      type: bytes.String(10),
      title: bytes.String(10)
    })
  });
  const data = {
    name: "Nicolas".padEnd(10, " "),
    age: "37".padEnd(3, " "),
    book: {
      type: "comics".padEnd(10, " "),
      title: "Black Hole".padEnd(10, " ")
    }
  };
  assert.equal(bytes.write(fmt, data), 
    "Nicolas   37 comics    Black Hole");
  assert.deepEqual(
    bytes.read(fmt, 
               "Nicolas   37 comics    Black Hole"), 
    data);
})();

(() => {
  const arr = [41, 42, 43, 44];
  const fmt = bytes.Array(
    4,
    bytes.Number(2, false, false));
  const out = bytes.write(fmt, arr);
  //const inp = bytes.read(fmt, out);
  const {log} = console;
  //log(out);
  //assert.deepEqual(inp, arr);
})();

return;

(() => {
  const fmt = bytes.Number(2, false, true);
  const out = bytes.write(fmt, 10);
  assert.equal(out.charCodeAt(0), 0);
  assert.equal(out.charCodeAt(1), 10);
  assert.equal(bytes.read(fmt, out), 10);
})();

(() => {
  const fmt = bytes.Number(2, false, true);
  const out = bytes.write(fmt, 1032);
  assert.equal(out.charCodeAt(0), 4);
  assert.equal(out.charCodeAt(1), 8);
  assert.equal(bytes.read(fmt, out), 1032);
})();

(() => {
  const fmt = bytes.Number(2, false, false);
  const out = bytes.write(fmt, 10);
  assert.equal(out.charCodeAt(1), 0);
  assert.equal(out.charCodeAt(0), 10);
  assert.equal(bytes.read(fmt, out), 10);
})();

(() => {
  const fmt = bytes.Number(2, false, false);
  const out = bytes.write(fmt, 1032);
  assert.equal(out.charCodeAt(1), 4);
  assert.equal(out.charCodeAt(0), 8);
  assert.equal(bytes.read(fmt, out), 1032);
})();

(() => {
  const n = 1032;
  const fmt = bytes.Number(2, true, true);
  const out = bytes.write(fmt, n);
  assert.equal(out.charCodeAt(0), 4);
  assert.equal(out.charCodeAt(1), 8);
  assert.equal(bytes.read(fmt, out), n);
})();

(() => {
  const n = -1032;
  const fmt = bytes.Number(2, true, true);
  const out = bytes.write(fmt, n);
  assert.equal(out.charCodeAt(0), 132);
  assert.equal(out.charCodeAt(1), 8);
  assert.equal(bytes.read(fmt, out), n);
})();

(() => {
  const n = 1032;
  const fmt = bytes.Number(2, true, false);
  const out = bytes.write(fmt, n);
  assert.equal(out.charCodeAt(1), 4);
  assert.equal(out.charCodeAt(0), 8);
  assert.equal(bytes.read(fmt, out), n);
})();

(() => {
  const n = -1032;
  const fmt = bytes.Number(2, true, false);
  const out = bytes.write(fmt, n);
  assert.equal(out.charCodeAt(1), 132);
  assert.equal(out.charCodeAt(0), 8);
  assert.equal(bytes.read(fmt, out), n);
})();

