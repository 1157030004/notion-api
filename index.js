const express = require("express");
const getLinks = require("./services/notion");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static("public"));

app.get("/links", async (req, res) => {
	const links = await getLinks();
	res.json(links);
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
