export default eventHandler(async (event) => {
  const page = await queryCollection(event, "documentation")
    .select("title", "path")
    .all();
  return page;
});
