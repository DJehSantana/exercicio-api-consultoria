import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Wait for database connection...");

  const URI = process.env.MONGODB;

  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Conectado ao MongoDB..."))
    .catch((err) =>
      console.error("Não foi possível conectar ao MongoDB...", err)
    );
};

export default connectDatabase;
