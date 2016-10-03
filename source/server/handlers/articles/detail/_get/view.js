const handler = require('./handler')

module.exports = (request, reply) =>
  handler.handleRequest(request)
    .then(data => {
      const context = {}
      context.article = data.article
      if (request.auth.isAuthenticated) {
        context.user = request.auth.credentials
        context.user.reviewed = data.article.reviews
          .filter(review =>
            review.member.id === context.user.id
          ).length > 0
      }
      return reply.view('pages/article/detail', context)
    })
    .catch(() => reply('Not found.'))
