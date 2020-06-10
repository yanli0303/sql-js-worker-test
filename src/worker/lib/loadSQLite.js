const requireDependencies = (isIE) => {
  const noCache = Date.now();
  const script = isIE ? 'sql-asm.js' : 'sql-wasm.js';
  self.importScripts(`static/${script}?t=${noCache}`);
};

export const loadSQLite = async ({ isIE }) => {
  requireDependencies(isIE);
  const module = await self.initSqlJs({ locateFile: (file) => `static/${file}?t=${Date.now()}` });
  return module.Database;
};
