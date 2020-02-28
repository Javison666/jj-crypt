"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Uint8arrayCrypt = /** @class */ (function () {
    function Uint8arrayCrypt() {
    }
    // Uint8Array 转 String
    Uint8arrayCrypt.encodeToStr = function (array) {
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = array.length;
        i = 0;
        while (i < len) {
            c = array[i++];
            switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12:
                case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    };
    // Uint8Array转数值(自定义)
    Uint8arrayCrypt.encodeToNum = function (uint8Array) {
        var arr = [];
        for (var i = 0; i < uint8Array.length; i++) {
            arr.push(Number(uint8Array[i]).toString(16));
        }
        return this.hex2int(arr.join(''));
    };
    // 16进制转10进制
    Uint8arrayCrypt.hex2int = function (hex) {
        var len = hex.length;
        var a = new Array(len);
        var code;
        for (var i = 0; i < len; i++) {
            code = hex.charCodeAt(i);
            if (48 <= code && code < 58) {
                code -= 48;
            }
            else {
                code = (code & 0xdf) - 65 + 10;
            }
            a[i] = code;
        }
        return a.reduce(function (acc, c) {
            acc = 16 * acc + c;
            return acc;
        }, 0);
    };
    // 字符串转Uint8Array
    Uint8arrayCrypt.decodeFromStr = function (str) {
        var rawLength = str.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));
        for (var i = 0; i < rawLength; i++) {
            array[i] = str.charCodeAt(i);
        }
        return array;
    };
    // 字符串转指定位数的Uint8Array
    Uint8arrayCrypt.decodeFromStrByLen = function (str, len) {
        var array = new Uint8Array(len);
        var start = len - str.length;
        for (var i = start; i < len; i++) {
            array[i] = str.charCodeAt(i);
        }
        return array;
    };
    Uint8arrayCrypt.decodeFromNumByLen = function (num, len) {
        var array = new Uint8Array(len);
        var str = Number(num).toString(16);
        str = str.length % 2 === 0 ? str : '0' + str;
        var start = len - str.length / 2;
        for (var i = start; i < len; i++) {
            array[i] = this.hex2int(str.substr((i - start) * 2, 2));
        }
        return array;
    };
    // 自动根据string/number返回uint8Array
    Uint8arrayCrypt.autoToUint8ArrayLen = function (val, len) {
        if (typeof val === "number") {
            return this.decodeFromNumByLen(val, len);
        }
        if (typeof val === "string") {
            return this.decodeFromStrByLen(val, len);
        }
    };
    return Uint8arrayCrypt;
}());
exports.default = Uint8arrayCrypt;
//# sourceMappingURL=uint8array.js.map