'use strict';

module.exports = [
  {
    path: '/',
    view: 'pages/index',
    context: {
      title: 'NewsReview',
    },
  },
  {
    path: '/artikel',
    view: 'pages/article/list',
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
    view: 'pages/article/detail',
    context: {
      title: 'Judul Artikel | NewsReview',
      breadcrumbs: [
        { path: '/', title: 'Beranda' },
        { path: '/artikel', title: 'Artikel' },
        {
          path: '/artikel/1',
          title: 'Ketua DPR: Kenaikan Parliamentary ' +
                 'Threshold Harus untuk Kepentingan Bangsa',
          active: true,
        },
      ],
    },
  },
  {
    path: '/portal',
    view: 'pages/portal/list',
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
    view: 'pages/portal/detail',
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
