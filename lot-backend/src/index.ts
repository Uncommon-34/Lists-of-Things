import express, { Request, Response } from "express";
import cors from "cors";
import misc_router from "./routes/misc";
import item_router from "./routes/item";
import lists_router from "./routes/lists";
import user_router from "./routes/user";
import tags_router from "./routes/tags";

// main api router and maps
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/misc", misc_router);
app.use("/api/item", item_router);
app.use("/api/lists", lists_router);
app.use("/api/user", user_router);
app.use("/api/tags", tags_router);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
