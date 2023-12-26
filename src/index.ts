import dotenv from "dotenv";
dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

import { DbConnect } from "./config/database";
import { server } from "./server";
const PORT = parseInt(process.env.PORT);

server.listen(PORT, () => {
  console.log("the server is listening at", PORT);
});
DbConnect();
