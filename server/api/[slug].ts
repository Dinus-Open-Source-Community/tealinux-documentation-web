export default eventHandler(async (event) => {
    const { slug } = getRouterParams(event)
    const page = await queryCollection(event, 'documentation').path(`/documentation/${slug}`).first()
    
    return page
  })
  