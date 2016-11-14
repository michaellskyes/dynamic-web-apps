console.log('bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

var tweet = {
    status: '#potatomama from node.js'
}
 
T.post('statuses/update', tweet, tweeted);
       
    function tweeted(err, data, response) {
        if(err) {
            console.log("something blew up");
        } else{
            console.log("it worked!");
        }
}

//daniel shiffman's tutorials were really helpful for me to get this working!!