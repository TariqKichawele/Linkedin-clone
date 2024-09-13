import User from "../models/user.model.js"

export const getSuggestedConnections = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id).select('connections');

        const suggestedUser = await User.find({
            _id: {
                $nin: currentUser.connections,
                $ne: req.user._id
            },
        }).select("name username profilePicture headline ").limit(3);

        res.json(suggestedUser);
    } catch (error) {
        console.error("Error in getSuggestedConnections controller:", error);
		res.status(500).json({ message: "Server error" });
    }
}

export const getPublicProfile = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select('-password');

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error in getPublicProfile controller:", error);
		res.status(500).json({ message: "Server error" });
    }
};