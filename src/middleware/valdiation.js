const dataMethod = ["body", "query", "headers", "params"];

export const validation = (schema) => {
  return (req, res, next) => {
    try {
      const validationArr = [];
      dataMethod.forEach((key, i) => {
        if (schema[key]) {
          const validationResult = schema[key].validate(req[key], {
            abortEarly: false,
          });
          if (validationResult?.error?.details) {
            validationArr.push(validationResult.error.details);
          }
        }
      });
      if (validationArr.length) {
        res
          .status(400)
          .json({ message: "Validation Error", err: validationArr });
      } else {
        next();
      }
    } catch (error) {
      next(new Error("CATCH ERROR: " + error.message, { cause: 500 }));
    }
  };
};
