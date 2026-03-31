function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function appendToArray(content, key, value) {
  const regex = new RegExp(`${key}\\s*:\\s*\\[([^\\]]*)\\]`, "s");

  return content.replace(regex, (match, inner) => {
    if (inner.includes(`"${value}"`)) return match;

    const items = inner
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    items.push(`"${value}"`);

    return `${key}: [${items.join(", ")}]`;
  });
}

module.exports = { capitalize, appendToArray };
