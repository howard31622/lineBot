const request = require('request');
const cheerio = require('cheerio');

var linebot = require('linebot');

var bot = linebot({
  channelId: '1580402853',
  channelSecret: 'ab99e1a6c8c619176cc3a4b000d9a37e',
  channelAccessToken: 'jpiRV9599Xu5Uvro1MC61NgIh1sybmRMw9i/R1+C+sAZlNmS7itqL4UGgEJYPgSu8VOmeUcNOw/0XJXpmTiRHhh9WTjWfLRFYzScCq/k1KyazH1SIa4kSy2Pni10iRwtHr6FoNsa0kIOk4QHklHCSQdB04t89/1O/w1cDnyilFU=''
});

bot.on('message', function (event) {
	var url = '';
	var userMsg = event.message.text;
	
	if(userMsg == '天氣') {
		url = 'https://www.cwb.gov.tw/V7/forecast/txt/w01.htm';
		request(url, (err, res, body) => {
			const $ = cheerio.load(body);
			var replyMsg = $('pre').text();
			event.reply(replyMsg).then(function (data) {
		
			}).catch(function (error) {
				
			});
		});
	}else if(userMsg == '影片') {
		url = 'https://www.youtube.com/feed/trending';
		var videoTitle = [];
		var videoLink = [];
		request(url, (err, res, body) => {
			const $ = cheerio.load(body);
			//console.log(body);
			$('.yt-lockup-content h3 a').each(function(i, elem) {
				videoTitle.push($(this).attr('title'));
				videoLink.push('http://youtube.com' + $(this).attr('href'));
			});
			var random = Math.floor((Math.random() * 69));
			var replyMsg = '精選發燒影片!\n'+videoTitle[random]+'\n'+videoLink[random];
			event.reply(replyMsg).then(function (data) {
		
			}).catch(function (error) {
				
			});
		});
	}	
});

bot.listen('/callback', process.env.PORT || 3000, function () {
    console.log('[BOT已準備就緒]');
});