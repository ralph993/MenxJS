function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function schemaTemplate(apiName) {
  const apiNameCap = capitalizeFirstLetter(apiName);

  return `
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ${apiNameCap}Schema = new Schema({})
module.exports = mongoose.model("${apiNameCap}", ${apiNameCap}Schema);
`;
}
