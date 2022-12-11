const query = `{
  pressReleaseCollection(
    where:{${`releaseDate_lte:"${new Date().toISOString()}"`}}

    limit: ${Config.pagination.recentPostsSize},
    order: releaseDate_DESC,
    preview: ${process.env.APP_ENV === 'development'},
  ) {
    total
    items{
      title
      releaseDate
      slug
      description{
      json
    }
  }
}
}`

console.log(query)
let config = { headers: { 'Content-Type': 'application/json' } }
let data = await axios.post(Config.contentful.endpoint, { query