const { profileService } = require("../services");

async function getProfile(req, res) {
  try {
    const account = req.account;
    const profile = await profileService.getUser(account);
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function getAllProfiles(req, res) {
  try {
    const users = await profileService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function updateAvatar(req, res) {
  try {
    const userId = req.account;
    const { file } = req;
    const updatedAvatar = await profileService.uploadAvatar(userId, file);

    return res.status(200).json(updatedAvatar);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function deleteUser(req, res) {
  try {
    const { username } = req.params;
    const result = await profileService.deleteUserByUsername(username);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
async function activateUser(req, res) {
  try {
    const { username } = req.body;
    const result = await profileService.activateUserByUsername(username);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function updateUser(req, res) {
  try {
    const { username, email, id } = req.body;
    const result = await profileService.updateUser(id, username, email);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
module.exports = {
  getProfile,
  getAllProfiles,
  activateUser,
  updateAvatar,
  deleteUser,
  updateUser,
};
