const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const template = path.resolve(`src/templates/article.js`)
  const result = await graphql(`
    query {
      allStrapiArticle {
        edges {
          node {
            id
          }
        }
      }
    }
  `)
  result.data.allStrapiArticle.edges.forEach(edge => {
    createPage({
      path: `${edge.node.id}`,
      component: template,
      context: {
        id: edge.node.id,
      },
    })
  });
}
