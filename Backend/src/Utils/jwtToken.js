const sendToken = (user, statusCode, res) => {
  const token = user?.getJWTToken();
  const options = {
    expires: new Date(Date.now() + 5 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
module.exports = sendToken;
