import app from "./src/app";
import { connection } from "./src/config/db";
import { port } from "./src/config";

connection();

app.listen(port, () => {
  console.log(`Server in http://localhost:${port}`);
});