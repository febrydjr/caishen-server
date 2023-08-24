function isAdmin(req, res, next) {
    try {
        const { account } = req;
        if (!account["is_admin"])
            return res.status(400).json({ message: "Access Denied" });
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = isAdmin;