// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var http = require('http');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/news', function(req, res)
			{
				var apiKey = '&apiKey=078ac7c010ae439ba1ddc3c30c8ddce0';
				var urlPath = '/v1/articles?source=';
				urlPath = urlPath + req.query.source + apiKey;
				console.log(urlPath);
				//var urlPath = '/v1/articles?source=cnn&apiKey=078ac7c010ae439ba1ddc3c30c8ddce0';

				var options = {
						host: 'newsapi.org',
						path: urlPath,
						method: 'GET'
						};
				
				console.log("Making a external call **** " + options);	
				var request = http.request(options, function(response)
											{
												var body = "";
												
												response.on('data', function(data) 
															{
																body += data;
															});
															
												response.on('end', function()
															{
																res.send(JSON.parse(body));
																console.log("Parsing the response done");
															});
											});
			
				request.on('error', function(e) 
							{
								console.log('Problem with request: ' + e.message);
							});

				console.log("Closing the request");
				request.end();				
				
			});




// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

