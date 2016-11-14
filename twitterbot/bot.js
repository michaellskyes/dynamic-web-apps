console.log('bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);


tweetIt();
setInterval(tweetIt, 1000*60);

function tweetIt(){
    
    var r = Math.floor(Math.random()*100);
    
    var tweet = {
        status: '#potatomama likes numbers' + r
    }

    T.post('statuses/update', tweet, tweeted);

        function tweeted(err, data, response) {
            if(err) {
                console.log("something blew up");
            } else{
                console.log("it worked!");
            }
    }
}

//daniel shiffman's tutorials were really helpful for me to get this working!!