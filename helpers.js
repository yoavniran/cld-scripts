const isDev = process.env.DEV === "true";

const cloudinaryConfig = {
	cloud_name: process.env.CLOUD,
	api_key: process.env.KEY,
	api_secret: process.env.SECRET,
};

const getCloudinaryApiUrl = () => {
	return `https://api${isDev ? "-dev" : ""}.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}`;
};


module.exports = {
	cloudinaryConfig,
	getCloudinaryApiUrl,
	isDev,
};