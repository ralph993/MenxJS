export function controllerTemplate(apiName) {
  return `
  module.exports = {
    index(req, res) {
      res.send('${apiName} route');
    },
  };`;
}
