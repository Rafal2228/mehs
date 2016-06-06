exports.getHome = (req, res) => {
  return res.render('home', {
    title: 'Home'
  });
};
