module.exports = {
  helloWord(_, res) {
    res.send(`
    <h1 style='margin-top:5em;text-align:center'>Hello Word!</h1>
    <p style='text-align:center'>Welcome to MenxJS</p>
    `);
  },
};
