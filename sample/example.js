/*
To run this script :

npm install
node ./sample/example.js

When the script ends

less /tmp/echojs.csv

 */
var scrape2csv = require('../lib/scrape2csv');

//let's scrape a cool website
var url_to_scrape = "http://www.echojs.com";

var jquery_selector = "article";

//each article of the page will go through this
var handler = function($, elem, index){
	var title = $(elem).find("h2 a").text();
	var news_url = $(elem).find("p>a").attr("href");

	//returning a new row for the csv
	return [index,title,"http://www.echojs.com"+news_url];
}

//optional CSV header
var header = ["#", "Title of the article", "URL"];

scrape2csv.scrape("/tmp/echojs.csv", url_to_scrape, jquery_selector, handler, header);