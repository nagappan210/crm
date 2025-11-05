import express from "express";
import dotenv from "dotenv";
import swaggerui from "swagger-ui-express";
import swaggerFile from "../src/swagger/swagger-output.json";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
;

app.use("/swagger", swaggerui.serve, swaggerui.setup(swaggerFile));

app.listen(PORT, () => {
  console.log(`Server is on Port http://localhost:${PORT}`);
});
