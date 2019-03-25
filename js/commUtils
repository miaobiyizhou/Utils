/**
*获取浏览器窗口的尺寸
/
function getWindHeightAndWidth() {
    var winWidth = 0, winHeight = 0;
    //获取窗口宽度
    if (window.innerWidth)
        winWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
    //获取窗口高度
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    //通过深入Document内部对body进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }
    return {"winHeight": winHeight, "winWidth": winWidth};
}


/**
 * 将fromObj对象中的数据  复制到toObj  浅复制 
 * @param fromObj 被复制对象
 * @param toObj 复制对象
 * @returns {*} 返回复制对象
 */
function copyObject(fromObj, toObj) {
    for (var p in toObj) {
        if (fromObj[p]) {
            toObj[p] = fromObj[p];
        }
    }
    return toObj;
}

/**
 * js获取网站根路径(站点及虚拟目录)，获得网站的根目录或虚拟目录的根地址
 * @returns {string} 返回网站根路径
 */
function getRootPath() {
    var pathName = window.location.pathname.substring(1);
    var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
    return window.location.protocol + '//' + window.location.host + '/' + webName;
}
