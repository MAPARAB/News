
//Writing all the new based services

var http = require('http');

exports.newsInfo = function(req, res)
			{
				var options = {
						host: 'newsapi.org',
						path: '/v1/articles?source=cnn&apiKey=078ac7c010ae439ba1ddc3c30c8ddce0',
						method: 'GET'
						};
					
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
															});
											});
			
				request.on('error', function(e) 
							{
								console.log('Problem with request: ' + e.message);
							});

				request.end();				
				
			}


