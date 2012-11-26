scrape2csv
==========

A simple node package scraping a web page and spitting the results in a CSV file.

## Getting Started
Install the module with: `npm install -g scrape2csv`

## Usage
Scraping is pretty straightforward :

    var scrape2csv = require('scrape2csv');
    
    //let's scrape a very cool website
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


Each element matching the jquery selector will call the handler provided as a parameter. 
The array returned by the handler will create a new csv line.

That's all folks!

## License
Copyright (c) 2012 Fabien Allanic  
Licensed under the MIT license.