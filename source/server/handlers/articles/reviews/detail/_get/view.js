const handleRequest = require('./handler')

module.exports = (request, reply) =>
  handleRequest(request)
    .then(data => {
      const context = {}
      context.review = data.review
      if (request.auth.isAuthenticated) {
        context.user = request.auth.credentials
        context.user.ownReview = context.user.id === context.review.member.id
        if (!context.user.ownReview) {
          context.user.upvoted = context.review.upvotes
            .filter(
              vote => vote.member_id === context.user.id
            ).length > 0
          context.user.downvoted = context.review.downvotes
            .filter(
              vote => vote.member_id === context.user.id
            ).length > 0
          context.user.voted = context.user.upvoted || context.user.downvoted
        }
      }
      return reply.view('pages/article/review', context)
    })
    .catch(err => {
      request.log(['error'], err)
      return reply('There\'s something wrong.')
    })
