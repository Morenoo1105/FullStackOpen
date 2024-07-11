const { Session } = require("../models");
const router = require("express").Router();
const { tokenExtractor } = require("../util/middleware");

router.delete("/api/logout", tokenExtractor, async (req, res) => {
  const token = req.decodedToken.token;

  const deletedUser = await Session.destroy({ where: { token } });

  if (!deletedUser) return res.status(200).send();

  return res.status(200).send();
});

module.exports = router;
