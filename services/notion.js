const dotenv = require("dotenv").config();
const { Client } = require("@notionhq/client");

// Init client
const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_ID;

module.exports = getLinks = async () => {
	const payload = {
		path: `databases/${database_id}/query`,
		method: "POST",
	};
	const { results } = await notion.request(payload);

	const links = results.map((link) => {
		console.log(link.properties.Name.title[0].text.content);

		return {
			id: link.id,
			title: link.properties.Name.title[0].text.content,
			date: link.created_time,
			tags: link.properties.Tags.multi_select,
			url: link.properties["URL schedule"].url,
		};
	});
	return links;
};
