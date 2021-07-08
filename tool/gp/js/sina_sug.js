var SuggestServer = function() {
    this._P = "http://suggest3.sinajs.cn/suggest/type=@TYPE@&key=@KEY@&name=@NAME@";
    this._Q = "";
    this._R = null;
    this._S = null;
    this._T = "";
    this._U = "";
    this._V = null;
    this._W = null;
    this._X = {};
    this._Y = {};
    this._Z = false;
    this._00 = {
        "11": "A 股",
        "12": "B 股",
        "13": "权证",
        "14": "期货",
        "15": "债券",
        "21": "开基",
        "22": "ETF",
        "23": "LOF",
        "24": "货基",
        "25": "QDII",
        "26": "封基",
        "31": "港股",
        "32": "窝轮",
        "41": "美股",
        "42": "外期"
    };
    this._01 = {
        "input": null,
        "loader": null,
        "default": "",
        "type": 0,
        "max": 5,
        "width": 220,
        "link": null,
        "head": ["选项", "代码", "名称"],
        "body": [ - 1, 2, 4],
        "fix": {
            "firefox": [1, 1]
        },
        "callback": null
    };
    this._02 = function(_a) {
        return document.getElementById(_a);
    };
    this._03 = function() {
        return (new Date()).getTime();
    };
    this._04 = function(_b, _c) {
        var _d = this;
        return function() {
            var _e = null;
            if (typeof _c != "undefined") {
                for (var i = 0; i < arguments.length; i++) {
                    _c.push(arguments[i]);
                }
                _e = _c;
            } else {
                _e = arguments;
            }
            return _b.apply(_d, _e);
        };
    };
    this._05 = function(_f, _g, _h) {
        if (window.addEventListener) {
            _f.addEventListener(_g, _h, false);
        } else if (window.attachEvent) {
            _f.attachEvent("on" + _g, _h);
        }
    };
    this._06 = function() {
        var _i = navigator.userAgent;
        if (/^Opera.*/.test(_i) == true) {
            return "opera";
        } else if (/^Mozilla\/4\.0.*/.test(_i) == true) {
            if (_i.indexOf("MSIE 7.0") != -1) {
                return "ie7";
            } else if (_i.indexOf("MSIE 6.0") != -1) {
                return "ie6";
            } else if (_i.indexOf("MSIE") != -1) {
                return "ie";
            } else {
                return "mozilla4";
            }
        } else if (/^Mozilla\/5\.0.*/.test(_i) == true) {
            if (_i.indexOf("Chrome") != -1) {
                return "chrome";
            } else if (_i.indexOf("Safari") != -1) {
                return "safari";
            } else if (_i.indexOf("Firefox") != -1) {
                return "firefox";
            } else {
                return "mozilla5";
            }
        } else {
            return "unknown"
        }
        return "unknown"
    };
    this._07 = function() {
        var _j = 0;
        var _k = 0;
        var _f = this._08;
        do {
            _j += _f.offsetTop || 0;
            _k += _f.offsetLeft || 0;
            if (_f.style.position != "relative") {
                break;
            }
            _f = _f.offsetParent;
        } while ( _f );
        var _l = [this._08.parentNode.style.borderTopWidth.replace("px", "") * 1, this._08.parentNode.style.borderLeftWidth.replace("px", "") * 1];
        var _m = this._06();
        var _n = "all" in this._01["fix"] ? this._01["fix"]["all"] : [0, 0];
        var _o = _m in this._01["fix"] ? this._01["fix"][_m] : [0, 0];
        _o = [_n[0] + _o[0], _n[1] + _o[1]];
        if (this._S.style.top != _j + "px") {
            this._S.style.top = _j - _l[0] + _o[0] + "px";
        }
        if (this._S.style.left != _k + "px") {
            this._S.style.left = _k - _l[1] + _o[1] + "px";
        }
        var _p = this._08.style.borderTopWidth;
        var _q = this._08.style.borderBottomWidth;
        var _r = this._08.clientHeight;
        _r += _p != "" ? _p.replace("px", "") * 1 : 2;
        _r += _q != "" ? _q.replace("px", "") * 1 : 2;
        if (this._S.style.marginTop != _r + "px") {
            this._S.style.marginTop = _r + "px";
        }
    };
    this._09 = function(_g) {
        return {
            "1": "stock",
            "2": "fund",
            "3": "hk",
            "4": "us"
        } [_g.substr(0, 1)];
    };
    this._0a = function() {
        var _s = this._08.value;
        if (("key_" + _s) in this._Y && this._Y["key_" + _s] != "") {
            if (this._S == null) {
                this._S = document.createElement("div");
                this._S.style.cssText += "display:none; filter:alpha(opacity=95); opacity:0.95; position:absolute; width:" + this._01["width"] + "px; z-index:999;";
                this._08.parentNode.insertBefore(this._S, this._08);
                this._S["suggest"] = this;
            }
            this._07();
            var _t = '';
            _t += '<table style="border-collapse:collapse; line-height:18px; border:1px solid #dcdcdc; border-bottom:2px solid #dcdcdc; background-color:#FFF; font-size:12px; text-align:center; color:#666; width:' + (this._01["width"] - 2) + 'px;">'
            if (this._01["head"] != null) {
                _t += '<tr class="head" style="background-color:#eee;">';
                for (var i in this._01["head"]) {
                    _t += '<td class="grid'+i+'">' + this._01["head"][i] + '</td>';
                }
                _t += '</tr>';
            }
            var _u = this._Y["key_" + _s].replace(/&amp;/g, "&").replace(/;$/, "").split(";");
            var _v = _u.length > this._01["max"] ? this._01["max"] : _u.length;
            var _w = 'parentNode.parentNode.parentNode[\'suggest\']';
            for (var i = 0; i < _v; i++) {
                var _x = _u[i].split(",");
                _x[ - 1] = _x[0].replace(_s, '<span style="color:#F00;">' + _s + '</span>');
                _x[ - 2] = _x[1] in this._00 ? this._00[_x[1]] : "——";
                var _y = this._01["link"] == null || this._01["link"] == "" ? ['<td style="padding:0px;"><span style="display:block; padding:1px;">', '</span></td>'] : ['<td style="padding:0px;"><a href="' + this._01["link"].replace(/@type@/g, this._09(_x[1])).replace(/@code@/g, this._0b(_x)) + '" hidefocus="true" onmousedown="return this.parentNode.parentNode.' + _w + '[\'hidepause\'](this);" onclick="return this.parentNode.parentNode.' + _w + '[\'hideresume\'](this);" style="color:#999; display:block; outline:none; padding:1px; text-decoration:none; width:100%;" target="_blank">', '</a></td>'];
                _t += '<tr id="' + _u[i] + '" style="cursor:pointer;" onmouseover="this.' + _w + '[\'mouseoverLine\'](this);" onmouseout="this.' + _w + '[\'mouseoutLine\'](this);" onmousedown="this.' + _w + '[\'setLineMouse\'](this);">';
                for (var j in this._01["body"]) {
                    _t += _y[0] + _x[this._01["body"][j]] + _y[1];
                }
                _t += '</tr>';
            }
            _t += '</table>';
            this._X["key_" + _s] = _t;
            this._W = null;
            var _z = document.createElement("div");
            this._S.innerHTML = this._X["key_" + _s];
            this._0c();
        } else {
            this._0d();
        }
    };
    this._0e = function(_A) {
        var _B = "";
        if (_A._0f && _A._0g) {
            _B = "#F8FBDF";
        } else if (_A._0f) {
            _B = "#F1F5FC";
        } else if (_A._0g) {
            _B = "#FCFEDF";
        }
        if (_A.style.backgroundColor != _B) {
            _A.style.backgroundColor = _B;
        }
    };
    this["mouseoverLine"] = function(_A) {
        _A._0g = true;
        this._0e(_A);
    };
    this["mouseoutLine"] = function(_A) {
        _A._0g = false;
        this._0e(_A);
    };
    this["setLineMouse"] = function(_A) {
        this["setLine"](_A);
        if (this._V != null) {
            this._V(this._08.value);
        }
    };
    this._0b = function(_C) {
        switch (_C[1]) {
        case "11":
            return _C[3];
            break;
        case "12":
            return _C[3];
            break;
        case "13":
            return _C[3];
            break;
        case "14":
            return _C[3];
            break;
        case "15":
            return _C[3];
            break;
        case "21":
            return _C[3];
            break;
        case "22":
            return _C[3];
            break;
        case "23":
            return _C[3];
            break;
        case "24":
            return _C[3];
            break;
        case "25":
            return _C[3];
            break;
        case "26":
            return _C[3];
            break;
        default:
            return _C[2];
            break;
        }
    };
    this["setLine"] = function(_A) {
        var _C = _A.id.split(",");
        var _D = this._0b(_C);
        this._U = _D;
        this._08.value = _D;
        if (this._W != null) {
            this._W._0f = false;
            this._0e(this._W);
        }
        _A._0f = true;
        this._0e(_A);
        this._W = _A;
    };
    this._0c = function() {
        if (this._S != null) {
            this._S.style.display = "";
        }
    };
    this["hidepause"] = function() {
        this._Z = true;
    };
    this["hideresume"] = function() {
        this._Z = false;
        this._0h();
    };
    this._0d = function() {
        if (this._Z == false) {
            this._0h();
        }
    };
    this._0h = function() {
        if (this._S != null) {
            this._S.style.display = "none";
        }
    };
    this._0i = function(_s, _E, _F) {
        if (this._R == null) {
            this._R = document.createElement("div");
            this._R.style.display = "none";
            this._08.parentNode.insertBefore(this._R, this._08);
        }
        var _G = "suggestdata_" + this._03();
        var _H = document.createElement("script");
        _H.type = "text/javascript";
        _H.charset = "utf-8";
        _H.src = this._Q.replace("@NAME@", _G).replace("@KEY@", _s);
        _H._0j = this;
        if (_E) {
            _H._0k = _E;
        }
        if (_F) {
            _H._0l = _F;
        }
        _H._0m = _s;
        _H._0n = _G;
        _H[document.all ? "onreadystatechange": "onload"] = function() {
            if (document.all && this.readyState != "loaded" && this.readyState != "complete") {
                return;
            }
            var _I = window[this._0n];
            if (typeof _I != "undefined") {
                this._0j._Y["key_" + this._0m] = _I;
                this._0k(_I);
                window[this._0n] = null;
            } else if (this._0o) {
                this._0o("");
            }
            this._0j = null;
            this._0m = null;
            this._0n = null;
            this[document.all ? "onreadystatechange": "onload"] = null;
            this.parentNode.removeChild(this);
        };
        this._R.appendChild(_H);
    };
    this._0p = function() {
        var _s = this._08.value;
        if (this._U != _s) {
            this._U = _s;
            if (_s != "") {
                if (("key_" + _s) in this._Y) {
                    this._0a();
                } else {
                    this._0i(_s, this._04(this._0a), this._04(this._0d));
                }
            } else {
                if (this._S != null) {
                    this._W = null;
                    this._S.innerHTML = "";
                }
                this._0d();
            }
        } else {
            this._0c();
        }
    };
    this._0q = function() {
        if (this._08.value == this._T) {
            this._08.value = "";
        }
        this._U = "";
        this._0p();
    };
    this._0r = function() {
        if (this._08.value == "") {
            this._08.value = this._T;
        };
        this._U = "";
        this._0d();
    };
    this._0s = function() {
        var _J = arguments[0] || window.event;
        var _K = this._01["head"] == null ? 0 : 1;
        switch (_J.keyCode) {
        case 38:
            if (this._S != null) {
                this["setLine"](this._S.firstChild.rows[(!this._W || this._W.rowIndex == _K) ? this._S.firstChild.rows.length - 1 : this._W.rowIndex - 1]);
            }
            break;
        case 40:
            if (this._S != null) {
                this["setLine"](this._S.firstChild.rows[(!this._W || this._W.rowIndex == this._S.firstChild.rows.length - 1) ? _K: this._W.rowIndex + 1]);
            }
            break;
        case 13:
            if (this._S != null) {
                if (this._W != null) {
                    this["setLine"](this._W);
                }
                if (this._V != null) {
                    this._V(this._08.value);
                }
            }
            this._0d();
            break;
        default:
            this._0p();
            break;
        }
    };
    this.getCodeFromCache = function(_s) {
        if (("key_" + _s) in this._Y) {
            return this._Y["key_" + _s];
        }
    };
    this.getCode = function(_s, _L) {
        if (("key_" + _s) in this._Y) {
            _L(this._Y["key_" + _s]);
        } else {
            this._0i(_s, _L, _L);
        }
    };
    this.changeType = function(_g) {
        this._X = {};
        this._Y = {};
        this._08.value = this._T;
        if (typeof _g != "undefined") {
            var _M = "";
            switch (_g.toLowerCase()) {
            case "stock":
                _M = "11,12,13,14,15";
                break;
            case "fund":
                _M = "21,22,23,24,25,26";
                break;
            case "hkstock":
                _M = "31";
                break;
            case "hk":
                _M = "31,32";
                break;
            case "usstock":
                _M = "41";
                break;
            case "us":
                _M = "41,42";
                break;
            default:
                _M = _g;
                break;
            }
            this._Q = this._P.replace("@TYPE@", _M);
        } else {
            this._Q = this._P.replace("type=@TYPE@&", "");
        }
        this._01["type"] = _g;
    };
    this.changeLink = function(_N) {
        this._01["link"] = _N;
        this._0a();
        this._0d();
    };
    this.bind = function(_O) {
        if (typeof _O != "undefined") {
            for (var i in _O) {
                this._01[i] = _O[i];
            }
        }
        this._08 = typeof this._01["input"] == "string" ? document.getElementById(this._01["input"]) : this._01["input"];
        if (this._01["loader"] != null) {
            this._R = typeof this._01["loader"] == "string" ? document.getElementById(this._01["loader"]) : this._01["loader"];
        }
        if (this._08) {
            this.changeType(this._01["type"]);
            this._T = this._01["default"] == null || this._01["default"] == "" ? this._08.value: this._01["default"];
            this._08.value = this._T;
            this._08.setAttribute("autocomplete", "off");
            this._08.autoComplete = "off";
            this._05(this._08, "focus", this._04(this._0q));
            this._05(this._08, "blur", this._04(this._0r));
            this._05(this._08, "keyup", this._04(this._0s));
            this._05(this._08, "mouseup", this._04(this._0s));
            this._V = this._01["callback"];
        }
    };
};
