module.exports = function report(namespace, defined, used) {
  const unused = [...defined].filter((k) => !used.has(k));
  const green = (s) => `\x1b[32m${s}\x1b[0m`;
  const red = (s) => `\x1b[31m${s}\x1b[0m`;

  if (unused.length === 0) {
    console.log(green(`✔ ${namespace}`));
    return;
  }

  console.log(red(`✘ Namespace: ${namespace}`));
  console.log(`Defined keys: ${defined.size}`);
  console.log(`Used keys:    ${used.size}\n`);

  console.log("Unused keys:");
  unused.forEach((k) => console.log("  -", k));

  console.log("-------------------------------");
};
