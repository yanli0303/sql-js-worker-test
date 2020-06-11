const requireDependencies = (isIE) => {
  console.log('Importing sql.js resources in Worker synchronously...');
  const noCache = Date.now();
  const script = isIE ? 'sql-asm.js' : 'sql-wasm.js';
  self.importScripts(`static/${script}?t=${noCache}`);
  console.log('Imported sql.js resources.');
};

export const loadSQLite = async ({ isIE }) => {
  requireDependencies(isIE);

  console.log('Initializing sql.js library...');
  const module = await self.initSqlJs({ locateFile: (file) => `static/${file}?t=${Date.now()}` });
  console.log('Initialized sql.js library.');
  return module.Database;
};
