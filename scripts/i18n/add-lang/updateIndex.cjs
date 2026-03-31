const fs = require("fs");
const path = require("path");

module.exports = function (ROOT, lang, namespaces) {
  const file = path.join(ROOT, "src/i18n/index.ts");

  let content = fs.readFileSync(file, "utf8");

  namespaces.forEach((ns) => {
    const line = `import ${ns}_${lang} from "./locales/${lang}/${ns}.json";`;

    if (!content.includes(line)) {
      content = content.replace("// @i18n-imports-end", `${line}\n// @i18n-imports-end`);
    }
  });

  if (!content.includes(`${lang}: {`)) {
    const block = `${lang}: {\n${namespaces
      .map((ns) => `      ${ns}: ${ns}_${lang}`)
      .join(",\n")}\n    }`;

    content = content.replace(
      "// @i18n-resources-lang-end",
      `,\n    ${block}\n    // @i18n-resources-lang-end`
    );
  }

  fs.writeFileSync(file, content);
  console.log("✓ Updated index.ts");
};
