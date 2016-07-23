'use strict';

module.exports = [
  {
    path: '/',
    view: 'index',
    context: {
      title: 'NewsReview',
    },
  },
  {
    path: '/artikel',
    view: 'article/list',
    context: {
      title: 'Artikel | NewsReview',
      breadcrumbs: [
        { path: '/', title: 'Beranda' },
        { path: '/artikel', title: 'Artikel', active: true },
      ],
    },
  },
  {
    path: '/artikel/{id}',
    view: 'article/detail',
    context: {
      title: 'Judul Artikel | NewsReview',
      breadcrumbs: [
        { path: '/', title: 'Beranda' },
        { path: '/artikel', title: 'Artikel' },
        { path: '/artikel/1', title: 'Judul Artikel', active: true },
      ],
    },
  },
  {
    path: '/portal',
    view: 'portal/list',
    context: {
      title: 'Portal Berita | NewsReview',
      breadcrumbs: [
        { path: '/', title: 'Beranda' },
        { path: '/portal', title: 'Portal Berita', active: true },
      ],
    },
  },
  {
    path: '/portal/{id}',
    view: 'portal/detail',
    context: {
      title: 'Portal Berita | NewsReview',
      breadcrumbs: [
        { path: '/', title: 'Beranda' },
        { path: '/portal', title: 'Portal Berita' },
        { path: '/portal/1', title: 'Detik.com', active: true },
      ],
    },
  },
];
