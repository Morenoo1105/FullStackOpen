const { Session } = require("../models");
const jwt = require("jsonwebtoken");

const tokenCleanup = async () => {
  const sessions = await Session.findAll({});

  sessions.map(async (session) => {
    try {
      const decodedToken = jwt.verify(session.token);
    } catch (e) {
      await session.destroy();
    }
  });
};

module.exports = { tokenCleanup };
