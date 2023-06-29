exports.get404 = (req, res, next) => {
  res.render('page404', {
    pageTitle: '404 Page Not Found',
    path: '/NotFound',
  });
};
