const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function GeneratenewShortURL(req, res) {
  const shortID = nanoid(8);
  if (!body.url) return res.status(400).json({ error: "url" });
  await URL.create({
    shortID: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

async function GetAnalytics(req, res) {
  const shortID = req.params.shortID;
  const result = await URL.findOne({ shortID });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  GeneratenewShortURL,
  GetAnalytics,
};
