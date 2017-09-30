const getConnection = () => {
  if (process.env.PG_HOST) {
    return (
      `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process
        .env.PG_HOST}` + `:${process.env.PG_PORT}/${process.env.PG_DB}`
    );
  } else {
    return "postgres://postgres:12345@localhost:5432/alimentador";
  }
};

module.exports = getConnection;
