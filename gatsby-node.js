const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  
  const templateArticle = path.resolve(`src/templates/article.js`)
  const templateAuthor = path.resolve(`src/templates/author.js`)

  return await graphql(`
    query {
      allStrapiUser {
        edges {
          node {
            id
          }
        }
      }
      allStrapiArticle {
        edges {
          node {
            id
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      Promise.reject(result.errors)
    }

    result.data.allStrapiUser.edges.forEach(edge => {
      createPage({
        path: `/authors/${edge.node.id}`,
        component: templateAuthor,
        context: {
          id: edge.node.id,
        },
      })
    });

    result.data.allStrapiArticle.edges.forEach(edge => {
      createPage({
        path: `${edge.node.id}`,
        component: templateArticle,
        context: {
          id: edge.node.id,
        },
      })
    });
  })
}
