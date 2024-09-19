import controller from "./controller";
import { importSchemaFromYaml } from "../../../../utils/importYaml";

export default { controller, schema: importSchemaFromYaml(__dirname) };