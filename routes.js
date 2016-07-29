'use strict';

module.exports = [
  {
    path: '/',
    view: 'pages/index',
    context: {
      title: 'NewsReview',
      hideNavbarSearch: true,
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
      title: 'Rating untuk Ketua DPR: Kenaikan Parliamentary ' +
             'Threshold Harus untuk Kepentingan Bangsa ' +
             '| NewsReview',
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
    path: '/artikel/{id}/ulasan/{reviewId}',
    view: 'pages/article/review',
    context: {
      title: 'Ulasan Bobby Priambodo untuk Ketua DPR: Kenaikan Parliamentary ' +
             'Threshold Harus untuk Kepentingan Bangsa ' +
             '| NewsReview',
      breadcrumbs: [
        { path: '/', title: 'Beranda' },
        { path: '/artikel', title: 'Artikel' },
        {
          path: '/artikel/1',
          title: 'Ketua DPR: Kenaikan Parliamentary ' +
                 'Threshold Harus untuk Kepentingan Bangsa',
        },
        { path: '/artikel/1/ulasan/1', title: 'Ulasan oleh Bobby Priambodo', active: true },
      ],
    },
  },
  {
    path: '/artikel/{id}/ulasan/tulis',
    view: 'pages/article/write',
    context: {
      title: 'Tulis Ulasan untuk Ketua DPR: Kenaikan Parliamentary ' +
             'Threshold Harus untuk Kepentingan Bangsa ' +
             '| NewsReview',
      breadcrumbs: [
        { path: '/', title: 'Beranda' },
        { path: '/artikel', title: 'Artikel' },
        {
          path: '/artikel/1',
          title: 'Ketua DPR: Kenaikan Parliamentary ' +
                 'Threshold Harus untuk Kepentingan Bangsa',
        },
        { path: '/artikel/1/ulasan/tulis', title: 'Tulis Ulasan', active: true },
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
      title: 'Detik.com | NewsReview',
      breadcrumbs: [
        { path: '/', title: 'Beranda' },
        { path: '/portal', title: 'Portal Berita' },
        { path: '/portal/1', title: 'Detik.com', active: true },
      ],
    },
  },
  {
    path: '/anggota/{id}',
    view: 'pages/member/detail',
    context: {
      title: 'Profil Bobby Priambodo | NewsReview',
      breadcrumbs: [
        { path: '/', title: 'Beranda' },
        { path: '/anggota/1', title: 'Profil Bobby Priambodo', active: true },
      ],
    },
  },
  {
    path: '/aturan',
    view: 'pages/rules',
    context: {
      title: 'Aturan Komunitas | NewsReview',
      breadcrumbs: [
        { path: '/', title: 'Beranda' },
        { path: '/aturan', title: 'Aturan Komunitas', active: true },
      ],
    },
  },
];
