export function routerTemplate(apiName) {
  return `
const express = require("express");
const router = express.Router();
const { index } = require("./${apiName}.controller");
const {  } = require("./${apiName}.middleware");

router.get("/", index);

module.exports = router;
`;
}
