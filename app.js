const request = require('request');
const cheerio = require('cheerio');

var linebot = require('linebot');

var bot = linebot({
  channelId: '1580402853',
  channelSecret: 'ab99e1a6c8c619176cc3a4b000d9a37e',
  channelAccessToken: 'jpiRV9599Xu5Uvro1MC61NgIh1sybmRMw9i/R1+C+sAZlNmS7itqL4UGgEJYPgSu8VOmeUcNOw/0XJXpmTiRHhh9WTjWfLRFYzScCq/k1KyazH1SIa4kSy2Pni10iRwtHr6FoNsa0kIOk4QHklHCSQdB04t89/1O/w1cDnyilFU='
});
var Dictionary = (function () {
    function Dictionary() {
        if (!(this instanceof Dictionary))
            return new Dictionary();
    }

    Dictionary.prototype.Count = function() {
        var key,
            count = 0;

        for (key in this) {
            if (this.hasOwnProperty(key))
                count += 1;
        }
        return count;
    };

    Dictionary.prototype.Keys = function() {
        var key,
            keys = [];

        for (key in this) {
            if (this.hasOwnProperty(key))
                keys.push(key);
        }
        return keys;
    };

    Dictionary.prototype.Values = function() {
        var key,
            values = [];

        for (key in this) {
            if (this.hasOwnProperty(key))
                values.push(this[key]);
        }
        return values;
    };

    Dictionary.prototype.KeyValuePairs = function() {
        var key,
            keyValuePairs = [];

        for (key in this) {
            if (this.hasOwnProperty(key))
                keyValuePairs.push({
                    Key: key, 
                    Value: this[key]
                });
        }
        return keyValuePairs;
    };

    Dictionary.prototype.Add = function(key, value) {
        this[key] = value;
    }

    Dictionary.prototype.Clear = function() {
        var key,
            dummy;

        for (key in this) {
            if (this.hasOwnProperty(key))
                dummy = delete this[key];
        }
    }

    Dictionary.prototype.ContainsKey = function(key) {
        return this.hasOwnProperty(key);
    }

    Dictionary.prototype.ContainsValue = function(value) {
        var key;

        for (key in this) {
            if (this.hasOwnProperty(key) && this[key] === value)
                return true;
        }
        return false;
    }

    Dictionary.prototype.Remove = function(key) {
        var dummy;

        if (this.hasOwnProperty(key)) {
            dummy = delete this[key];
            return true;
        } else 
            return false;
    }

    return Dictionary;
}());

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
	}else if(userMsg == '台北') {
		url = 'https://www.cwb.gov.tw/V7/forecast/taiwan/Taipei_City.htm';
		request(url, (err, res, body) => {
			const $ = cheerio.load(body);
			let weathers = []
			$('#box8 .FcstBoxTable01 tbody tr').each(function(i, elem) {
				weathers.push($(this).text().split('\n'))
			})
			var output = weathers[0][1].substring(2).split(' ')[0]+'，溫度大約'+weathers[0][2].substring(2)+'度，降雨機率 '+weathers[0][6].substring(2)+'\n'+
						weathers[1][1].substring(2).split(' ')[0]+'，溫度大約'+weathers[1][2].substring(2)+'度，降雨機率 '+weathers[1][6].substring(2)+'\n'+
						weathers[2][1].substring(2).split(' ')[0]+'，溫度大約'+weathers[2][2].substring(2)+'度，降雨機率 '+weathers[2][6].substring(2);
			/*weathers = weathers.map(weather => ({
				time: weather[1].substring(2).split(' ')[0],
				temp: weather[2].substring(2),
				rain: weather[6].substring(2),
			}))*/
			//console.log(weathers{0});
			console.log(output);
			var weather ='test';
			event.reply(output).then(function (data) {
		
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
		
	}else if(userMsg == '新埔美食') {
		//Dictionary reference https://stackoverflow.com/questions/18490614/create-new-dictionary-with-javascript
		var d = new Dictionary(),keyValuePair;
		d.Add('起點','http://kklove0620.pixnet.net/blog/post/465873836-%E3%80%90%E6%8D%B7%E9%81%8B%E6%96%B0%E5%9F%94%E7%AB%99%E3%80%91begin-again-%E8%B5%B7%E9%BB%9Ecafe-%EF%B8%B3%E6%95%A3%E7%99%BC%E9%9D%92%E6%98%A5');
		d.Add('向陽','https://www.flickr.com/photos/110399388@N06/19627397893');
		d.Add('石二鍋','https://www.12hotpot.com.tw/');
		d.Add('小倉庫早午餐','https://aniseblog.tw/186189');
		d.Add('8鍋臭臭鍋致理店','https://zh-tw.facebook.com/8%E9%8D%8B%E8%87%B4%E7%90%86%E5%BA%97-739928379440458/');
		d.Add('MATTER CAFE','http://jeremyckt2.pixnet.net/blog/post/227109113-%5B%E9%A3%9F%E8%A8%98%5D%5B%E6%96%B0%E5%8C%97%E5%B8%82%5D%5B%E6%9D%BF%E6%A9%8B%E5%8D%80%5D-matter-cafe');
		d.Add('威力早餐店','https://www.dcard.tw/f/chihlee/p/229535002');
		d.Add('星馬廚房','http://jeremyckt2.pixnet.net/blog/post/227266076-%5B%E9%A3%9F%E8%A8%98%5D%5B%E6%96%B0%E5%8C%97%E5%B8%82%5D%5B%E6%9D%BF%E6%A9%8B%E5%8D%80%5D-%E6%98%9F%E9%A6%AC%E5%BB%9A%E6%88%BF');
		d.Add('麻吉蛋餅','https://jatravelstory.com/maggi-eggpie/');
		d.Add('貓欸','http://remember781126.pixnet.net/blog/post/346192712-%E3%80%90%E6%9D%BF%E6%A9%8B%E7%BE%8E%E9%A3%9F%E3%80%91%E8%B2%93%E6%AC%B8camulet--%E4%BA%92%E5%8B%95%E9%A4%B5%E9%A3%9F%E5%A5%BD%E6%9C%89%E8%B6%A3-%E9%A4%90');
		d.Add('吉米拿義大利麵','https://www.foodpanda.com.tw/restaurant/x1oz/ji-mi-na-yi-da-li-mian?r=1');
		d.Add('Found house','http://peko721.pixnet.net/blog/post/37555855-%E3%80%90%E6%9D%BF%E6%A9%8B%E3%80%82%E6%96%B0%E5%9F%94%E7%AB%99%E7%BE%8E%E9%A3%9F%E3%80%91found-house-%E6%96%B9%E5%B1%8B%E9%A4%90%E5%BB%B3%E3%80%82%E4%B8%AD');
		d.Add('兩餐','http://clear0526.pixnet.net/blog/post/225057668-2018-03-24%E6%96%B0%E5%8C%97%E5%B8%82%E6%9D%BF%E6%A9%8B%E5%8D%80-%E3%80%8E-%E5%85%A9%E9%A4%90%E3%80%8F-%EB%91%90%EB%81%BC%E9%9F%93%E5%9C%8B%E5%B9%B4');
		d.Add('ispasta','https://nash.tw/ispasta/' );
		d.Add('阿貓碳烤土司','https://www.facebook.com/amaotoast/');
		d.Add('健康主義','http://bajenny.com/blog/post/43005571-%E3%80%8A%E6%8D%B7%E9%81%8B%E6%9D%BF%E5%8D%97%E7%B7%9A%E7%BE%8E%E9%A3%9F-%E6%96%B0%E5%9F%94%E7%AB%99-%E5%B0%8F%E5%A7%91%E9%A3%9F%E8%A8%98%E3%80%8B%E8%87%B4%E7%90%86%E7%A7%91');
		d.Add('貓嘰咕','https://tisshuang.tw/blog/post/20180519');
	
		
		var random = Math.floor((Math.random() * d.Count()));
		keyValuePair = d.KeyValuePairs()[random]
		var replyMsg = '你要的新埔美食為 :　'+keyValuePair.Key+'\n'+'網址為'+keyValuePair.Value;
		event.reply(replyMsg).then(function (data) {
			}).catch(function (error) {
			});
		
	}else if(userMsg == '新埔飲料') {	
		var d = new Dictionary(),i,keyValuePair;
		var replyMsg = '你要的新埔飲料為 :　';
		event.reply(replyMsg).then(function (data) {
			}).catch(function (error) {
		});
	}else if(userMsg == '多多') {	
		
		var replyMsg = '我就是一隻最可愛的貓~~喵嗚~記得要給我魚罐罐唷　';
		event.reply(replyMsg).then(function (data) {
			}).catch(function (error) {
		});	
	}else{//default message
		
		var replyMsg = 'Hello 歡迎來到多多小幫手\n'+"下列有幾項功能請輸入關鍵字去做使用\n"+
						"輸入：新埔美食　新埔美食推薦\n"+
						"輸入：天氣　從中央氣象局取得最新天氣報告\n"+
						"輸入：台北　從中央氣象局取得台北相關天氣\n"+
						"輸入：影片　隨機挑選Youtube精選影片";
		event.reply(replyMsg).then(function (data) {
			}).catch(function (error) {
			});
		
	}
});

bot.listen('/callback', process.env.PORT || 3000, function () {
    console.log('[BOT已準備就緒]');
});