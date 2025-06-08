// export default eventHandler(async (event) => {
//   const { slug } = getRouterParams(event);
//   const page = await queryCollection(event, "documentation")
//     .path(`/documentation/${slug}`)
//     .first();

//   return page;
// });

export default eventHandler(async (event) => {
  const { slug } = getRouterParams(event); // bisa berupa array

  const fullPath = Array.isArray(slug)
    ? `/documentation/${slug.join("/")}`
    : `/documentation/${slug}`;

  const doc = await queryCollection(event, "documentation")
    .path(fullPath)
    .first();

  return doc;
});
