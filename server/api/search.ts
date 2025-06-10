export default eventHandler(async(event) => {
  const sections = await queryCollectionSearchSections(event, 'documentation')
  return sections
})