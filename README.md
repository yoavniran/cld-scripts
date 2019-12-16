# Cloudinary Scripts

**Useful scripts for Cloudinary**

## Usage

> You'll need to add a .env file with the following information

```
DEV=[false/true]
CLOUD=[cloud name]
KEY=[cloudinary api key]
SECRET=[cloudinary api secret]
FOLDER=[folder name]
```

* DEV -  if true will make scripts work with local dev environment
* CLOUD - cloud name
* KEY - API key from cloudinary account
* SECRET - API secret from cloudinary account
* FOLDER - the root folder to use (used by folders script)
 
## Scripts

1. folders:
    - bulk create folders - uses uinames.com to retrieve list of names to use for folder names