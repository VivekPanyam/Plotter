You can send any data to Plotter and it will magically add an auto-scaled chart to all currently listening dashboards.

<img src="http://i.imgur.com/6wfMb2D.png"></img>
###Getting Started

Download Plotter and change the auth token in `index.js`.

Start the server by running `node index.js`. In your application, make a GET request to

	http://IP_OF_SERVER:PORT/data/INSERT_AUTH_KEY_HERE/JSON
    
Here are some JSON formats that can be sent to the server:

	1. {"chartID" : value, "chartID2": value2}
    2. {"chartID" : {"breakdown1": value1, "breakdown2": value2}}
    3. {"chartID" : {"title": "Title"}}
    4. {"chartID" : {"value": value, "title": "Title"}}
    
Plotter will add the current value to the appropriate chart. If the current value is passed in as a breakdown, then Plotter will chart the sum of the breakdown.

Examples:

	{"Signups" : {"Web" : 12, "Mobile" : 10}} // Will graph 22 and show the breakdown above the chart
    {"logins": {"title": "Number of Logins", "Web": 10}}
    
You can easily run it on Heroku:

	heroku apps:create myapp
	git push heroku master
    
Check it out and let me know what you think!

*Note: Plotter is still in alpha, please find issues and submit pull requests.*

Plotter was inspired by [Tasseo](https://github.com/obfuscurity/tasseo) and [Scout Realtime](http://scoutapp.github.io/scout_realtime/).

### License
See the LICENSE file
