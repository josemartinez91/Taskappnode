const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((err) => err.msg);

    const message = errorMessage.join(". ");
    res.status(400).json({
      status: "error",
      message,
    });
  }

  next();
};

const createUserValidators = [
  body("name")
    .isString()
    .withMessage("name must be a string")
    .notEmpty()
    .withMessage("name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("password must be a string")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  checkValidations,
];

module.exports = {createUserValidators}