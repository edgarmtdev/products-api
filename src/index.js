import app from "./app";
import { connection } from "./config/db"
import { port } from "./config"

connection()

app.listen(port, () => {
  console.log(`Server in http://localhost:${port}`);
});

