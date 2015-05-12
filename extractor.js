var extractor = require('unfluff');
var request = require('request');

request(process.argv[2], function(error, response, body){
    if(error && response.statusCode !== 200){
        console.log(error);
    }

    console.log(extractor(body));
});


