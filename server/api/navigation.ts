export default eventHandler(async (event) => {
  const navigation = await queryCollectionNavigation(event, 'documentation')
  return navigation
})
