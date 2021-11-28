const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async function scrape(symbol) {
  let listingLinks = [];
  let listings = [];

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function fetchHTML(url) {
    const { data } = await axios.get(url);
    return cheerio.load(data); s
  }

  const $ = await fetchHTML("https://classifieds.theadvocate.com/marketplace/category/Public%20Notices/Sheriff%20Sales");

  // get list of urls for current listings
  $(".searchresults_frame").find('.description').each((i, e) => {
    let link = $(e).find('a').attr('href');
    listingLinks.push(link);
  });
  console.log(listingLinks);
  // use list of urls and get listing text for each property
  listingLinks.forEach(async function (link) {
    let $$ = await fetchHTML(link);
    let property = $$(".panel-body").find('p').text();
    listings.push(property);
  });
  await delay(2000);
  return { Listings: listings };

};
