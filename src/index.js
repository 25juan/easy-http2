import Axios from "axios";
const win = window || global ;
win.Apis = {  } ;
win._Apis = {  } ;


let filterMsg = null ;
let axiosConfig = null ;
const HttpCode = { OK:"ok", FAil:"fail", };
/**
 * 处理后端返回{ state:"ok",msg:"删除成功" } 这种数据结构
 * @param result
 * @returns {boolean}
 */
export const bool = function(result){
    return result.state == HttpCode.OK ;
} ;
/**
 * 处理后端返回的{ state:"ok",data:{ name:"sgellar",age:18 } } 这种数据结构
 * @param result
 * @returns {boolean|*}
 */
export const data = function(result){
    if(result.state == HttpCode.OK){
        return result.data ;
    }
    return false ;
};

/***
 * 编译路径参数，内部使用
 * @param str
 * @param obj
 * @returns {*}
 */
function compile(str,obj){
    Object.keys(obj).map(item=>{
        let reg = new RegExp(`{${item}}`,"g") ;
        str = str.replace(reg,obj[item]) ;
    });
    return str ;
}

/**
 * 生成完整的URL
 * @param prefix
 * @param urls
 */
function generateURL(prefix,urls) {
    const obj = {} ;
    Object.keys(urls).forEach((key)=>{
        let value = urls[key] ;
        obj[key] = /^https:|^http:/.test(value)?value:prefix +  value ;
    });
    return obj ;
}

/**
 * 设置axios的配置
 * @param config
 */
export const setAxiosConfig = function (config) {
    axiosConfig = config ;
};
/**
 * 获取axios的配置
 * @param config
 */
const getAxiosConfig = function () {
    return axiosConfig ;
};

const ajax = (url,data = {  })=>{
    url = compile(url, data); // 将restful 里面的参数给替换掉
    const config = getAxiosConfig() ;
    return Axios({ method: 'post', url, data,...config }).then(response=>response.data);
};
const dataFilter = function(result){
    if(result.msg){
        typeof filterMsg == "function" && filterMsg(result.msg,result.state === HttpCode.OK);
    }
    return result ;
} ;

export const setMsg = function (msg) {
    if(typeof msg != "function"){
        throw new Error("setMsg方法只能接受一个函数!");
    }else{
        filterMsg = msg ;
    }
};

const cloneMap = function (source,target) {
    Object.keys(target).map(key=>{
        source[key] = target[key] ;
    }) ;
};

export function registerApis(prefixURL="", urls = {  }, namespace) {
    let _Apis = win._Apis ;
    let Apis = win.Apis ;
    const _urls = generateURL(prefixURL,urls);
    if(namespace){ // 命名空间
        if(!_Apis[namespace] ){
            _Apis[namespace] = {};
            Apis[namespace] = {};
        }
        _Apis = _Apis[namespace] ;
        Apis = Apis[namespace] ;
    }
    _Apis = cloneMap(_Apis,_urls) ;
    Object.keys(_urls).map((key)=>{
        let value = _urls[key] ;
        Apis[key] = function (data) {
            return ajax(value,data).then(dataFilter) ;
        } ;
    });
}
export const Apis = win.Apis ;
export const _Apis = win._Apis ;
export default { axios:Axios,registerApis, data, bool, Apis:win.Apis, _Apis:win._Apis, setMsg, setAxiosConfig } ;

