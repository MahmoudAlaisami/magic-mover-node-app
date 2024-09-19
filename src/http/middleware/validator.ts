import Ajv from "ajv";
import { HttpStatusCode } from "axios";

const validator = (schema, isProtected = true) => {
  const ajv = new Ajv({
    strictTypes: false,
  });
  const validate = ajv.compile(schema);

  return (req, res, next) => {
    const valid = validate(req);

    if (!valid) {
      console.log("....not valid..controller", {
        url: req.url,
        error: validate.errors,
      });
      return res.status(HttpStatusCode.BadRequest).send({
        success: false,
        message: "Invalid request",
        errors: validate.errors,
      });
    }

    next();
  };
};

export default validator;
