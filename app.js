const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './高姗-遇见你的时候所有星星都落到我头上.lrc'), 'utf8', (error, data) => {
	if (error) {
		console.log(error);
	} else {
		var lines = data.split('\n');
		// 考虑性能，把regex变量提到forEach循环外面
		var regex = /\[(\d{2}):(\d{2})\.(\d{2})\](.+)/;
		// console.log(lines.length);
		var begin = new Date().getTime();
		// 遍历每行歌词
		lines.forEach((line) => {
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
		});
	}
})