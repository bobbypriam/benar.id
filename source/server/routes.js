const Joi = require('joi')

const handlers = require('./handlers')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: require('./handlers/home/_get/view'),
    config: {
      auth: {
        mode: 'try',
        strategy: 'session',
      },
    },
  },
  {
    method: 'GET',
    path: '/cari',
    handler: handlers.getSmartSearch,
    config: {
      auth: {
        mode: 'try',
        strategy: 'session',
      },
    },
  },
  {
    method: 'GET',
    path: '/artikel/{id}',
    handler: require('./handlers/articles/detail/_get/view'),
    config: {
      auth: {
        mode: 'try',
        strategy: 'session',
      },
    },
  },
  {
    method: 'GET',
    path: '/artikel/{id}/ulasan/{reviewerSlug}',
    handler: require('./handlers/articles/reviews/detail/_get/view'),
    config: {
      auth: {
        mode: 'try',
        strategy: 'session',
      },
    },
  },

  /**
   * Auth routes
   */
  {
    method: 'GET',
    path: '/masuk',
    handler: require('./handlers/login/_get/view'),
    config: {
      auth: {
        mode: 'try',
        strategy: 'session',
      },
    },
  },
  {
    method: 'POST',
    path: '/masuk',
    handler: require('./handlers/login/_post/view'),
    config: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/gabung',
    handler: handlers.postSignUp,
    config: {
      validate: {
        payload: {
          name: Joi.string().required(),
          email: Joi.string().email().required(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/keluar',
    handler: require('./handlers/logout/_get/view'),
    config: {
      auth: {
        mode: 'try',
        strategy: 'session',
      },
    },
  },

  /**
   * Protected routes
   */
  {
    method: 'GET',
    path: '/artikel/baru',
    handler: require('./handlers/articles/new/_get/view'),
    config: {
      auth: 'session',
    },
  },
  {
    method: 'POST',
    path: '/artikel',
    handler: require('./handlers/articles/_post/view'),
    config: {
      auth: 'session',
      validate: {
        payload: {
          title: Joi.string().required(),
          url: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/artikel/{id}/ulasan',
    handler: require('./handlers/articles/reviews/_post/view'),
    config: {
      auth: 'session',
      validate: {
        payload: {
          content: Joi.string().required(),
          rating: Joi
            .number().integer().min(1).max(10)
            .required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/artikel/{id}/ulasan/{reviewerSlug}/upvote',
    handler: handlers.postUpvoteReview,
    config: {
      auth: 'session',
      validate: {
        payload: {
          reviewId: Joi.number().integer().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/artikel/{id}/ulasan/{reviewerSlug}/revoke-upvote',
    handler: handlers.postRevokeUpvoteReview,
    config: {
      auth: 'session',
      validate: {
        payload: {
          reviewId: Joi.number().integer().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/artikel/{id}/ulasan/{reviewerSlug}/downvote',
    handler: handlers.postDownvoteReview,
    config: {
      auth: 'session',
      validate: {
        payload: {
          reviewId: Joi.number().integer().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/artikel/{id}/ulasan/{reviewerSlug}/revoke-downvote',
    handler: handlers.postRevokeDownvoteReview,
    config: {
      auth: 'session',
      validate: {
        payload: {
          reviewId: Joi.number().integer().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/artikel/{id}/ulasan/{reviewerSlug}/feedback',
    handler: handlers.postFeedback,
    config: {
      auth: 'session',
      validate: {
        payload: {
          content: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/artikel/{id}/ulasan/{reviewerSlug}/feedback/{parentFeedbackId}/reply',
    handler: handlers.postFeedbackReply,
    config: {
      auth: 'session',
      validate: {
        payload: {
          content: Joi.string().required(),
        },
      },
    },
  },
]
