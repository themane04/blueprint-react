const fs = require("fs");

module.exports = function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};
