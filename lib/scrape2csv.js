var jsdom = require('jsdom'),
    csv = require('ya-csv'),
    request = require('request');

exports.scrape = function (csv_output_file_path, url_to_scrape, jquery_selector, handler, csv_header){
	if(!csv_output_file_path){
		console.log('Missing file path of the csv output!');
	}else if(!url_to_scrape){
		console.log('Missing url to scrape!');
	}else if(!jquery_selector){
		console.log('Missing jquery/css selector!');
	}else if(!handler){
		console.log('Missing handler function!');
	}else{
		var writer = new csv.createCsvFileWriter(csv_output_file_path);
		//writing the optional header
		if(csv_header){
			writer.writeRecord(csv_header);
		}
		
		request({ uri:url_to_scrape }, function (error, response, body) {
		  if (error && response.statusCode !== 200) {
		    console.log('Error when fetching remote page');
		  }
		  
		  jsdom.env({
		    html: body,
		    scripts: [
		      'http://code.jquery.com/jquery-latest.js'
		    ]
		  }, function (err, window) {
		    var $ = window.jQuery;

		    // jQuery is now loaded on the jsdom window created from 'agent.body'
		    $(jquery_selector).each(function(index,elem){
		    	var csv_line = handler($, elem,index);

				//console.log(line);
				writer.writeRecord(csv_line);
		    });
		  });
		});
	}	
}