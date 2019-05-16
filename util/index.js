import config from './config';
// 存储localStorage
export const setStore = (name, content) => {
    if(!name) return;
    if(typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(config.storePrefix + name, content);
};
// 获取localStorage
export const getStore = name => {
    if(!name) return;
    return window.localStorage.getItem(config.storePrefix + name);
};

// 删除localStorage
export const removeStore = name => {
    if(!name) return;
    window.localStorage.removeItem(config.storePrefix + name);
};

export const myMixIn = {
    methods: {
        // DatePicker为type=timedate以后选择日期自动跳转选择时间
        showTimePanel(refName) {
            this.$refs[refName].onSelectionModeChange('time');
        },
        // table的render函数,用来显示或隐藏手机号
        // h,params必填,key为手机号对应的字段,data为表格的列表数据
        renderPhoneShow(h,params,key,data){
            return h('div', [
                h('i', params.row.showPhone ? `${params.row[key]}` : `${params.row[key].substr(0, 3)}****${params.row[key].substr(7)}`),
                h(
                    'Icon',
                    {
                        props: {
                            type: params.row.showPhone ? 'md-eye-off' : 'md-eye',
                            size: '15',
                        },
                        style: {
                            cursor: 'pointer',
                            marginLeft: '5px'
                        },
                        on: {
                            click: () => {
                                data.forEach(item => {
                                    this.$set(item, 'showPhone', false);
                                });
                                if(!params.row.showPhone) {
                                    this.$set(data[params.index], 'showPhone', true);
                                }
                            }
                        }
                    },
                )
            ]);
        },
        // 表格中出现学员姓名的地方都可以跳转至学员详情页面的render函数
        // leadsId和leadsName也要传,因为有的接口返回的字段是leadsId,有的却是StuId
        renderStuInfo(h,params,leadsId,leadsName){
            let _this = this;
            return h('span', {
                style: {
                    color: '#329af0',
                    cursor: 'pointer'
                },
                on: {
                    click() {
                        _this.$router.push({
                            name: 'leadsInfo',
                            params: {leadsId: leadsId}
                        });
                    }
                }
            }, leadsName);
        }
    }
};

// 返回 时间格式 2018-02-09
export const DataTime = date => {
    if(!date) return '';
    date = new Date(date);
    var m = date.getMonth() + 1;
    m = m > 9 ? m : `0${m}`;
    var d = date.getDate();
    d = d > 9 ? d : `0${d}`;
    return date.getFullYear() + '-' + m + '-' + d;
};

export function preloadImages(imgUrlArr) {
    // 已加载图片数量
    let loadedImage = 0;
    // 存放图片的数组
    let newImages = [];
    // 返回一个promise 对象
    return new Promise((resolve, reject) => {
        for(let i = 0; i < imgUrlArr.length; i++) {
            newImages[i] = new Image();
            // 设置图片src 属性
            newImages[i].src = imgUrlArr[i];
            // 图片绑定onload事件，确保加载完成
            newImages[i].onload = () => {
                loadedImage++;
                // 当全部加载完成后 ,resolve
                if(loadedImage == imgUrlArr.length) {
                    resolve();
                }
            };
            newImages[i].onerror = () => {
                reject(new Error('错误'));
            };
        }
    });
}

function formatBySplit(str, split, splitN, isInt = true) {
    if(str.length <= splitN) return str;
    let _str = str;
    let len = _str.length;
    str = '';
    if(isInt) {
        while(len > splitN) {
            len -= splitN;
            str += `${split}${_str.slice(len - _str.length)}`;
            _str = _str.substring(0, len);
        }
        return _str.length > 0 ? `${_str}${str}` : str;
    }else {
        while(len > splitN) {
            len -= splitN;
            str += `${_str.slice(0, splitN)}${split}`;
            _str = _str.substring(splitN);
        }
        return _str.length > 0 ? `${str}${_str}` : str;
    }
}

/**
 * 货币数字值格式化工具函数
 * @author Alan [link](https://github.com/gloomyline)
 * @param origin {Number|String} 原始数字值或字符串
 * @param decimal {Number} 保留有效小数的个数，默认两位
 * @param split {String} 数字值分割符，默认','
 * @param splitN {Number} 按照几位格式化，默认3位
 * @return {String} 格式化之后的货币值字符串
 */
export function currency(origin = '', decimal = 2, split = ',', splitN = 3) {
    if(!origin) return Number(0)
        .toFixed(decimal);
    const decimals = Number(origin)
        .toFixed(decimal);
    const results = decimals.match(/^(\d+)(.)(\d+)/);
    const integerPart = results[1];
    const decimalPart = results[3];
    return `${formatBySplit(integerPart, split, splitN)}.${formatBySplit(decimalPart, split, splitN, false)}`;
}

// 日期格式化
export function formatDate(date, fmt) {
    if(/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for(let k in o) {
        if(new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : padLeftZero(str)
            );
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

// 图片转化base64
export function getObjectURL(file) {
    var url = null;
    if(window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
    }else if(window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    }else if(window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

// 实现滚动条无法滚动
var mo = function(e) {
    e.preventDefault();
};

/** *禁止滑动***/
export function touchmovestop() {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    // document.addEventListener("touchmove", mo, false);//禁止页面滑动
}

/** *取消滑动限制***/
export function touchmovemove() {
    document.body.style.overflow = ''; // 出现滚动条
    document.body.style.position = 'relative';
    // document.removeEventListener("touchmove", mo, false);
}

// 解决遮罩层滚动穿透问题，分别在遮罩层弹出后和关闭前调用，
// 全局 加上 body.dialog-open { position: fixed; width: 100%; }

const ModalHelper = (bodyCls => {
    let scrollTop;
    return {
        afterOpen: function() {
            scrollTop = document.scrollingElement.scrollTop;
            document.body.classList.add('dialog-open');
            document.body.style.top = -scrollTop + 'px';
        },
        beforeClose: function() {
            document.body.classList.remove('dialog-open');
            // scrollTop lost after set position:fixed, restore it back.
            document.scrollingElement.scrollTop = scrollTop;
        }
    };
})('dialog-open');

// 下载
export const downloadFile = (fileName, blob) => {
    let aLink = document.createElement('a');
    // let blob = this.base64ToBlob(content); // new Blob([content]);
    let evt = document.createEvent('HTMLEvents');
    evt.initEvent('click', true, true);// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));// 兼容火狐
};

// base64转blob
export const base64ToBlob = code => {
    let parts = code.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for(let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {type: contentType});
};
