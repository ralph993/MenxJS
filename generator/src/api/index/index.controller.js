const helloWord = (req, res) => {
  res.status(200).json({ msg: "Hello Word" });
};

export { helloWord };
