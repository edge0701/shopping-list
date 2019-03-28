export default {
  up: async () => { return; },
  down: async (queryInterface) => {
    const queries = await queryInterface.sequelize.query(
      "select 'alter sequence '||relname||' restart;' as query from pg_class where relkind='S';",
      { type: queryInterface.sequelize.QueryTypes.SELECT});
    for (const q of queries) {
      await queryInterface.sequelize.query(q.query);
    }
  },
};
