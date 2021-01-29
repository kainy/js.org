var LoaderScript = function () {
	this.elementContainer = null;
	this.init = function (stringContainerId) {
		if (stringContainerId) {
			this.elementContainer = document.getElementById(stringContainerId);
		}
		else {
			this.elementContainer = document.createElement("div");
			this.elementContainer.style.display = "none";
			document.body.appendChild(this.elementContainer);
		}
	};
	this.load = function (src, callback, valueCallback) {
		var elementLoader = document.createElement("script");
		elementLoader.type = "text/javascript";
		elementLoader.language = "javascript";
		elementLoader.charset = "utf-8";
		elementLoader.src = src;
		elementLoader.valueCallback = valueCallback;
		elementLoader[document.all ? "onreadystatechange" : "onload"] = this.unload;
		elementLoader.callback = callback;
		this.elementContainer.appendChild(elementLoader);
	};
	this.unload = function () {
		if (document.all) {
			if (this.readyState != "loaded" && this.readyState != "complete") {
				return;
			}
		}
		if (this.callback) {
			this.callback(this.valueCallback);
		}
		this.callback = null;
		this[document.all ? "onreadystatechange" : "onload"] = null;
		this.parentNode.removeChild(this);
	};
};


var LoaderAjax = function () {
	this.createXMLHttpObject = function () {
		try {
			return new XMLHttpRequest();
		}
		catch (e) {
		}
		try {
			return new ActiveXObject('Msxml2.XMLHTTP');
		}
		catch (e) {
		}
		try {
			return new ActiveXObject('Microsoft.XMLHTTP');
		}
		catch (e) {
		}
		return null;
	};
	this.load = function (url, callback, content) {
		var xmlhttp = this.createXMLHttpObject();
		if (xmlhttp != null) {
			xmlhttp.open("post", url, true);
			xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xmlhttp.setRequestHeader("Content-Type","text/xml");
			xmlhttp.setRequestHeader("Content-Type","utf-8");
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == 4) {
					if (xmlhttp.status == 200) {
						var text = xmlhttp.responseText;
						xmlhttp.abort();
						xmlhttp = null;
						callback(text);
					}
				}
			};
			content = content == undefined ? null : content;
			xmlhttp.send(content);
		}
	};
};

var Model = function (stringType, stringContainerId) {
	this.getRandomString = function () {
		var date = new Date();
		return date.getTime();
	};
	this.stringType = stringType.toLowerCase();
	this.responseText = null;
	this.booleanReturnForced = false;
	switch (this.stringType) {
		case "ajax":
			this.loader = new LoaderAjax();
			break;
		case "script":
			this.loader = new LoaderScript();
			this.loader.init(stringContainerId);
			break;
	}
	this.stringUrl = "";
	this.stringMark = "@RANDOM@";
	this.callback = function (responseText) {
		var model = arguments.callee.model;
		switch (model.stringType) {
			case "ajax":
				if ((model.responseText != responseText || model.booleanReturnForced) && responseText != "") {
					model.responseText = responseText;
					model.processData.model = model;
					model.processData(responseText);
					model.updateView();
				}
				break;
			case "script":
				model.processData(responseText);
				model.updateView(responseText);
				break;
		}
	};
	this.callback.model = this;
	this.processData = function () {};
	this.updateView = function () {};
	this.stringContent = null;
	this.intThread = -1;
	this.intInterval = 5000;
	this.start = function () {
		this.stop();
		this.load();
		this.intThread = setInterval(this.load, this.intInterval);
	};
	this.stop = function () {
		if (this.intThread != -1) {
			clearInterval(this.intThread);
		}
		this.intThread = -1;
	};
	this.arrayUrl = [];
	this.loadScriptUrl = function () {
		var model = arguments.callee.model;
		if (model.arrayUrl.length > 0) {
			var stringUrl = model.arrayUrl.shift();
			model.loader.load(stringUrl.replace(model.stringMark, model.getRandomString()), model.callback, stringUrl);
		}
	};
	this.loadScriptUrl.model = this;
	this.load = function () {
		
		var model = arguments.callee.model;
		switch (model.stringType) {
			case "ajax":
				model.loader.load(model.stringUrl.replace(model.stringMark, model.getRandomString()), model.callback, model.stringContent);
				break;
			case "script":
				if (model.stringUrl.constructor == Array) {
					model.arrayUrl = [];
					for (var i = 0; i < model.stringUrl.length; i++) {
						model.arrayUrl.push(model.stringUrl[i]);
						setTimeout(model.loadScriptUrl, i * 5000);
					}
				}
				else if (model.stringUrl != "") {
					model.loader.load(model.stringUrl.replace(model.stringMark, model.getRandomString()), model.callback, model.stringUrl);
				}
				break;
		}
	};
	this.load.model = this;
};
