const profilePageRenderController = (req, res) => {
  res.render("profile");
};

const profileLogoutController = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};

export { profilePageRenderController, profileLogoutController };