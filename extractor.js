var extractor = require('unfluff');
var request = require('request');
var fs = require('fs');

var args = process.argv.splice(2);

var extract = {
    
    url: function(url, callback){
            request(url, function(err, res, body){
                
                if(err && res.statusCode !== 200){
                    return callback(err);
                }
                
                var data = extractor(body);
                return callback(null, data);

            });
         },

    local: function(path, callback){
            fs.readFile(path, 'utf8', function(err, html){
                if(err) return callback(err);
                
                var data = extractor(html);
                return callback(null, data);
            });
           }

};


function argumentData(args){
    var arguments = {};

    if(args.length%2 != 0){
        return arguments;
    }
    
    var key = args[0].slice(2);
    arguments[key] = args[1];
    return arguments;
}

var arguments = argumentData(args);
console.log(arguments);

if(arguments != null || arguments !== {}){
    console.log(arguments);
    var opts = arguments;
    Object.keys(arguments).forEach(function(key){
        if(key === 'url'){
            console.log(key);
            extract.url(opts[key], function(err, details){
                if(err) console.log(err);
                console.log(details);
                return;
            });
        }
        
        if(key === 'local'){
            extract.local(arguments.key, function(err, details){
                if(err) console.log(err);
                console.log(details);
                return;
            });    
        }
        
    });
}


/*
request(process.argv[2], function(error, response, body){
    if(error && response.statusCode !== 200){
        console.log(error);
    }

    console.log(extractor(body));
});
*/
