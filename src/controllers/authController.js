const { authService } = require("../services");
const { messages } = require("../helpers");

async function login(req, res) {
  try {
    const { identifier, password } = req.body;
    const user = await authService.login(identifier, password);
    return res.status(user.status).json(messages.response(user));
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function register(req, res) {
  try {
    const { name, username, email, phone, password } = req.body;

    const user = await authService.register(
      name,
      username,
      email,
      phone,
      password
    );

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function resetPassword(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { password } = req.body;
    const result = await authService.resetPassword(token, password);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function changeUsername(req, res) {
  try {
    const { oldUsername, newUsername } = req.body;
    const result = await authService.changeUsername(oldUsername, newUsername);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function changeEmail(req, res) {
  try {
    const { oldEmail, newEmail } = req.body;
    const result = await authService.changeEmail(oldEmail, newEmail);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
  changeUsername,
  changeEmail,
};
