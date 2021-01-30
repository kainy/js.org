define(['./requestAnimationFrame'], function(){
	var ret = function (b, c) {
		var d = ['github', 'twitter', 'facebook-squared', 'gplus', 'instagram', 'paypal', 'qq', 'sina-weibo', 'renren', 'lastfm', 'vimeo', 'smashing', 'linkedin', 'skype', 'soundcloud', 'evernote', 'pinterest-circled', 'music', 'headphones', 'picasa', 'dropbox', 'note'];
		b = b || (c&& 5)|| d.length - Math.round(Math.random() * 10);
		//console.log(b);
		var elAnimation= document.getElementById('animation');
		var e = 0;
		var bodyClientHeight= document.body.clientHeight;
		var bodyClientWidth= document.body.clientWidth;
		var f = new Array(b);//水平位移
		var g = new Array(b);//垂直位移
		var h = new Array(b);//元素
		var update = function () {
			//elAnimation.style.visibility='hidden';
			for (var i = 0; i < b; i++) {
				var a = h[i];
				var ot= a.offsetTop;
				var oh= a.offsetHeight;
				var ol= a.offsetLeft;
				var ow= a.offsetWidth;
				a.style.left = ol + f[i] + 'px';
				a.style.top = ot - g[i] + e + 'px';
				if ((ot + oh) < 0) {
					a.style.top = bodyClientHeight + 'px'
				}
				if ((ol + ow + 60) > bodyClientWidth) {
					a.style.left = (ol + ow + 60) % bodyClientWidth + 'px';
					a.style.top = Math.random() * bodyClientHeight + 'px'
				}
				if ((ot) > bodyClientHeight) {
					a.style.top = (ot) % bodyClientHeight
				}
			}
			//elAnimation.style.visibility='hidden';
			requestAnimationFrame(update);
		};
		for (var i = 0; i < b; i++) {
			h[i] = document.createElement('div');
			h[i].style.left = Math.random() * bodyClientWidth + 'px';
			h[i].style.top = Math.random() * bodyClientHeight + 'px';
			h[i].style.fontSize = Math.round(Math.random() * 40 + 40) + 'px';
			f[i] = Math.random() * 1.4 + 1;//水平速度
			g[i] = Math.random() * 1.2;//垂直速度
			h[i].className = 'snow icon-' + d[i];
			elAnimation.appendChild(h[i]);
		}
		if(c){ //移动版
			for (var i = 0; i < b; i++) {
				h[i].style.webkitAnimationName = 'slidein';
			}
		}else{ //桌面版
			update();
			document.onmousemove = function (a) {
				a = a || window.event;
				e = (a.clientY - bodyClientHeight / 2) / (bodyClientHeight) * 2//鼠标加速度
			}
		}
	};

	return ret;
});
