// readline动态显示歌词

const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
const readline = require('readline');

var filename = path.join(__dirname, './高姗-遇见你的时候所有星星都落到我头上.lrc');

// 流里面存的是buffer
var streamReader = fs.createReadStream(filename)
  .pipe(iconv.decodeStream('utf8'));
  // 管道

// 利用readline读取，官方实例：createInterface函数第一个参数封装成一个对象
var rl = readline.createInterface({ input: streamReader });

var begin = new Date().getTime();
rl.on('line', (line) => {
  task(line, begin);
});

// 考虑性能，把regex变量提到forEach循环外面
var regex = /\[(\d{2}):(\d{2})\.(\d{2})\](.+)/;
function task (line, begin) {
	// 为了性能，此处使用一个API：regex.exec，不混合使用regex.test+regex.exec
	var matches = regex.exec(line);
	if (matches) {
		// 把字符串转化成数字
		var m = parseFloat(matches[1]);
		var s = parseFloat(matches[2]);
		var f = parseFloat(matches[3]);
		var lyric = matches[4];
		// 由于下达输出任务的时刻不同，采取now-begin的方式
		var offset = new Date().getTime() - begin;
		setTimeout(() => {
			console.log(lyric);
		}, m*60*1000+s*1000+f - offset);
	} else {
		// 不是一行歌词
		console.log(line);
	};
}