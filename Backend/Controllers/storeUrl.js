import URL from "../Models/urls.model.js";

async function storeUrl(originalUrl, shortUrl, username) {
  URL.create({ originalUrl, shortUrl, username });
}

export default storeUrl;
