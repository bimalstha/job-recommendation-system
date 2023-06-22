import { DbConnect } from "./config/database";
import { server } from "./server";

const PORT = process.env?.PORT || 3000;
console.log("the port is ", PORT);
server.listen(PORT, () => {
  console.log("the server is listening at", PORT);
});
DbConnect();
