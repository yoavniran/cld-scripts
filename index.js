require("dotenv").config();
const cloudinary = require("cloudinary");

const { cloudinaryConfig } = require("./helpers");

//scripts
const folders = require("./scripts/folders");

const configCloudinary = () => {
	console.log("### Cloudinary config = ", cloudinaryConfig);

	cloudinary.config(cloudinaryConfig);
};

const start = () => {
	configCloudinary();

	folders.bulkCreateFolders(process.env.FOLDER);
};

start();