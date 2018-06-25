/**
 * Created by lsx on 2017/10/10.
 */
import Vue from 'vue';

let vueUU = {
    /**
     * 两个对象之间的值合并
     * a 给值者
     * b 赋值者
     * 返回 b对象
     */
    extendObj (a, b){
        for (let o in a) {
            b[o] = a[o];
        }
        return b;
    },
    /**
     * 获取链接上的参数
     * @param {string} name 需要查询的参数
     * @param {string} str  查询的链接
     * @param {string} v 没有查到时的返回 默认值 ""
     * @returns {string}
     */
    getQueryString (name, str, v) {
        if (!str) {
            str = window.location.href;
        }
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = str.substr(str.indexOf("?") + 1).match(reg);
        if (r !== null) return decodeURI(r[2]);
        return v ? v : "";
    },
    /**
     * 时间转换ISO8601
     * @returns {string}
     */
    getISO8601 (time){
        let dtStr = new Date(time);
        let dtISO = dtStr.toISOString();

        return dtISO.substring(0, dtISO.lastIndexOf(".")) + "Z";
    },
    /**
     * 获取毫秒数
     * @returns {number}
     */
    getMillisecond (a){
        return new Date(a).getTime();
    },
    /**
     * 产生随机字符串
     * @param len
     * @returns {string}
     */
    randomStr (len) {
        len = len || 16;
        let chars = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm012345678';
        let maxPos = chars.length;
        let pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    /**
     * 时间缀转换
     * @param a date
     * @param b format: "YYYY-MM-DD HH:mm:ss"  separator: " - "
     * @returns {string}
     */
     dateTransform (a, b){

        if(b && b.goTime){
            a = a + (Number(b.goTime) * 86400000);
        }

        let d = new Date(a),
            year = d.getFullYear(),
            month = d.getMonth() > 8 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1),
            date = d.getDate() > 9 ? d.getDate() : '0' + d.getDate(),
            hours = d.getHours() > 9 ? d.getHours() : '0' + d.getHours(),
            minutes = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes(),
            seconds = d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds(),
            format = b ? (b.format ? b.format : "YYYY-MM-DD HH:mm:ss") : "YYYY-MM-DD HH:mm:ss",
            separator = b ? (b.separator ? b.separator : "-") : "-";

        switch (format) {
            case "YYYY-MM-DD" :
                return year + separator + month + separator + date;
            case "YYYY-MM-DD HH:mm" :
                return year + separator + month + separator + date + " " + hours + ":" + minutes;
            case "YYYY-MM-DD HH:mm:ss" :
                return year + separator + month + separator + date + " " + hours + ":" + minutes + ":" + seconds;
            case "MM-DD HH:mm:ss" :
                return month + separator + date + " " + hours + ":" + minutes + ":" + seconds;
            case "HH:mm" :
                return hours + ":" + minutes;
            case "HH:mm:ss" :
                return hours + ":" + minutes + ":" + seconds;
        }
    },
    /**
     * 存放全局变量
     */
    global: {

    },
    /**
     * 判断是否滑动到底部
     * @returns {boolean}
     */
     scrollBottom () {
        let _h = $(".app-main").scrollTop() - $(".page").height() + $(window).height();
        return (_h === 100 || _h === 120);
    },
    /**
     * 数组合并去重
     */
     mergeArray (a, b){

        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b.length; j++) {
                if (a[i] === b[j]) {
                    a.splice(i, 1);
                }
            }
        }

        return a.concat(b);
    },
    /**
     * 数组去重
     */
    uniqueArr (arr){
        let res = [arr[0]],
            repeat = false;

        for (let i = 1; i < arr.length; i++) {
            repeat = false;

            for (let j = 0; j < res.length; j++) {
                if (arr[i] === res[j]) {
                    repeat = true;
                    break;
                }
            }
            if (!repeat) {
                res.push(arr[i]);
            }
        }

        return res;
    },
    /**
     * 获取对象的第一个值
     */
    getObjectFirst (obj){
        for(let o in obj){
            return {
                key: o,
                val: obj[o]
            }
        }
    },
    setLocalStorage (a, b){
        window.localStorage.setItem(a, b);
    },
    clearLocalStorage (a){
        window.localStorage.removeItem(a);
    },
    getLocalStorage (a){
        return window.localStorage.getItem(a);
    },
    setSessionStorage (a, b){
        window.sessionStorage.setItem(a, b);
    },
    clearSessionStorage (a){
        window.sessionStorage.removeItem(a);
    },
    getSessionStorage (a){
        return window.sessionStorage.getItem(a);
    },
    /**
     * 设置请求头
     */
     setHeader (name, val){
        Vue.http.headers.common[name] = val;
    },
    getAuth (){
         let _this = this;
        _this.http({
            url: "developer/my"
        }, function (data) {
            _this.setLocalStorage("HOUSE_BP_AUTH", data.access_level);
            let _login = JSON.parse(_this.getLocalStorage("HOUSE_BP_LOGIN"));
            _login.house_privileged = data.house_privileged;
            _this.setLocalStorage("HOUSE_BP_LOGIN", JSON.stringify(_login));
        });
    },
    /**
     * 数据请求
     */
    http (param, callback) {
        const _this = this;
        const apiUrl = _this.global.qgApiUrl;

        if (!param.urlLet) {
            param.url = apiUrl + param.url;
        }

        Vue.http({
            method: param.method || "GET",
            url: param.url,
            credentials: param.cookie || false,  //是否需要带cookie
            params: param.params || {},
            body: param.data || {},
            emulateJSON: true
        }).then(function (data) {
            if(data.headers.map.Token || data.headers.map.token){
                let _token = data.headers.map.Token ? data.headers.map.Token[0] : data.headers.map.token[0];
                _this.global.token = _token;
                _this.setHeader("token", _token);
                _this.setLocalStorage("HOUSE_BP_TOKEN", _token);
            }

            let d = data.data;

            if (!d) {
                d = eval("(" + data.bodyText + ")");
            }

            if(param.rawData){
                callback && callback(d);
            } else if(d.code === 0) {
                callback && callback(d.data);
            } else if(d.code === 2){
                if(param.vueThis && param.loading){
                    param.vueThis[param.loading].close();
                }
                _this.clearLocalStorage("HOUSE_BP_TOKEN");
                window.location.href = "#/login";
            } else if(d.code === 112) {
                _alert("你没有权限");
                _this.getAuth();
                window.location.reload();
            } else if(d.code === 115) {
                _alert("目前为抢购阶段，不支持任何更改!");
            } else {
                _alert(d.msg);
            }

            function _alert(text){
                if(param.vueThis){
                    param.vueThis.$message({
                        type: 'warning',
                        message: text
                    });
                } else {
                    alert(text);
                }
            }

        }, function (data) {
            if(confirm("请求出错,请刷新重试")){
                window.location.reload();
            }
        });
    }
};

(function (){
    let isHttps = /(https\:)/.test(window.location.origin) ? "https" : "http";

    const hostUrl = {
        dev: {
            uploadUrl: isHttps + "://qgapidev.playwx.com/api/",
            sourceUrl: isHttps + "://qgdev.playwx.com/html/",
            oApiUrl:   isHttps + "://oapi.playwx.com/api/",
            qgApiUrl:  isHttps + "://qgapidev.playwx.com/api/"
        },
        master: {
            uploadUrl: "https://qgapi.playwx.com/api/",
            sourceUrl: "https://qg.playwx.com/html/",
            oApiUrl:   "https://oapi.playwx.com/api/",
            qgApiUrl:  "https://qgapi.playwx.com/api/"
        }
    };

    let hostType = "master";

    if(window.location.origin !== "https://qg.playwx.com"){
        hostType = "dev";
    }

    for(let o in hostUrl[hostType]){
        vueUU.global[o] = hostUrl[hostType][o];
    }
})();


export default vueUU