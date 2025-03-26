const { prisma } = require("../prisma/prisma-client");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Пользователь не авторизован!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.users.findUnique({
      where: {
        id: decoded.id,
      },
    });

    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Возникла непредвиденная ошибка на сервере!",
      err,
    });
  }
};

module.exports = {
  auth,
};
