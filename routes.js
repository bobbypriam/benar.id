'use strict';

module.exports = [
  {
    path: '/',
    view: 'index',
    context: { title: 'NewsReview' },
  },
  {
    path: '/artikel',
    view: 'article/list',
    context: { title: 'Artikel | NewsReview' },
  },
  {
    path: '/artikel/{id}',
    view: 'article/detail',
    context: { title: 'Judul Artikel | NewsReview' },
  },
  {
    path: '/portal',
    view: 'portal/list',
    context: { title: 'Portal Berita | NewsReview' },
  },
  {
    path: '/portal/{id}',
    view: 'portal/detail',
    context: { title: 'Portal Berita | NewsReview' },
  },
];
