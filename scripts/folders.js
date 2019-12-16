const request = require("request");
const { getCloudinaryApiUrl, cloudinaryConfig } = require("../helpers");

const CREATE_AMOUNT = 2,
	BATCH_SIZE = 15;

const API_BASE = getCloudinaryApiUrl();

const getNames = (amount) => {
	amount = Math.min(250, amount); //uinames.com limits at 500 per minute
	const api = `https://uinames.com/api/?amount=${amount}&minlen=10&maxlen=30&region=United States`;

	return new Promise((resolve) => {
		request(api, (error, response, body) => {
			let names;

			if (!error && body) {
				try {
					names = JSON.parse(body);
					resolve(names);
				} catch (ex) {
					console.log("!!!!!! ERROR - FAILED TO parse names response ", ex);
				}
			}

			if (!names) {
				resolve(false);
			}
		});
	})
		.then((result) => {
			return result &&
				result.map((obj) =>
					`${obj.region} ${obj.name} ${obj.surname}`);
		});
};

const createFolder = (path, api) => new Promise((resolve, reject) => {
	request(api, {
		method: "POST",
		strictSSL: false,
		auth: {
			user: cloudinaryConfig.api_key,
			password: cloudinaryConfig.api_secret,
		},
	}, (error, response, body) => {

		if (error) {
			reject(error);
		} else {
			let result = null;

			try {
				result = JSON.parse(body);
			} catch (ex) {
			}

			if (response.statusCode >= 200 && response.statusCode < 210) {
				resolve(result);
			} else {
				reject({ result, headers: response.headers });
			}
		}
	});

});

const createFoldersBatch = (batchId, names, basePaths, total) => {
	setTimeout(() => {
		console.log(`########### PROCESSING BATCH ${batchId}`);
		names.forEach((name, i) => {
			const index = i + 1 + ((batchId - 1) * BATCH_SIZE);
			const folderPath = encodeURIComponent(basePaths.concat(name).join("/"));
			const api = `${API_BASE}/folders/${folderPath}`;
			const position = `${index}/${total}`;

			console.log(`about to create...${position} - ${folderPath}`);

			createFolder(folderPath, api)
				.then((result) => {
					console.log(`\t${position} - ${folderPath} CREATED !`, result);
				})
				.catch((ex) => {
					console.log(`\t${position} - ${folderPath} ERROR !!!`, ex);
				});
		});
	}, batchId === 1 ? 0 : (batchId * 1000));
};

const bulkCreateFolders = async (path = "") => {
	const names = await getNames(CREATE_AMOUNT);

	if (names && names.length) {
		const count = names.length;
		const basePaths = path.split("/");

		let batchCount = 0;

		while (names.length) {
			batchCount += 1;
			const batch = names.splice(0, BATCH_SIZE);

			createFoldersBatch(batchCount, batch, basePaths, count);
		}
	}
};

module.exports = {
	bulkCreateFolders
};



