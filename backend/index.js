import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import resolvers from "./resolvers";

const app = express();

const PORT = process.env.PORT || 8000;

const root = resolvers;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}/graphql`);
});
