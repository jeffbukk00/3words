const getDatabaseUrl = () => {
  const local = process.env.MONGO_LOCAL;
  const cluster = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@3words.wwmjmmw.mongodb.net/3words?retryWrites=true&w=majority&appName=3words`;

  const mode = process.env.NODE_ENV;

  if (mode === "development") {
    return local;
  } else if (mode === "production") {
    return cluster;
  } else {
    return local;
  }
};

module.exports = getDatabaseUrl();
