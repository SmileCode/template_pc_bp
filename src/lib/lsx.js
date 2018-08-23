/**
 * Created by lsx on 2017/10/10.
 */
import Vue from 'vue';

let lsx = {
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
                _this.setHeader(window.H_TOKEN_NAME, _token);
                _this.setLocalStorage(window.S_TOKEN_NAME, _token);
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
                _this.clearLocalStorage(window.TOKEN_NAME);
                window.location.href = "#/login";
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

(() => {

})();


export default lsx