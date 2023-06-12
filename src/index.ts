import { DbConnect } from "./config/database";
import { server } from "./server";

const PORT = 4000;

server.listen(PORT, () => {
  console.log("the server is listening at", PORT);
});
DbConnect();
