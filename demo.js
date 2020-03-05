import Http from "./src" ;
Http.axios.interceptors.request.use(req=>{
    console.log(req);
    return req ;
});
var urlPrefix = "http://abit.tpddns.cn:9000/app/mock/44" ;
var urls = {
    submit:"/api/auth/submit",
    fileVerify:"/api/auth/fileVerify",//导入数据页面文件校验
    uploadPath:"/api/auth/uploadPath",//导入数据页面文件上传路径
};
var urls2 = {
    submit:"/api/auth/submit",
    fileVerify:"/api/auth/fileVerify",//导入数据页面文件校验
    uploadPath:"/api/auth/uploadPath",//导入数据页面文件上传路径
};
var urls3 = {
    prefixHttp:"https://parceljs.org/api/auth/submit",
};
var urlPrefix2 = "http://abit.tpddns.cn:9000/app/mock/48" ;
var urls4 = {
    collegePermissionControlList:"http://abit.tpddns.cn:9000/app/mock/42/api/auth/major",
};


document.getElementById("result").onclick = function () {
    Http.registerApis(urlPrefix,urls); // 注册到window.Apis 作用域下，调用为window.Apis.delFile()
    Http.registerApis(urlPrefix,urls,"namespace"); // 注册到window.Apis 作用域下，调用为window.Apis.delFile()
    console.log(Http);
};
document.getElementById("result2").onclick = function () {
    Http.registerApis(urlPrefix,urls3); // 注册到window.Apis 作用域下，调用为window.Apis.delFile()
    console.log(Http);
};
document.getElementById("result3").onclick = function () {
    Http.registerApis(urlPrefix,urls); // 注册到window.Apis 作用域下，调用为window.Apis.delFile()
    Http.registerApis(urlPrefix2,urls4); // 注册到window.Apis 作用域下，调用为window.Apis.delFile()
    Http.registerApis(urlPrefix,urls); // 注册到window.Apis 作用域下，调用为window.Apis.delFile()
    Http.setMsg((msg,state)=>{
        console.log(msg,state);
    });
    Http.registerApis(urlPrefix,urls3); // 注册到window.Apis 作用域下，调用为window.Apis.delFile()
    Http.Apis.submit({ name:"1",age:"12" });
    Http.Apis.collegePermissionControlList({ name:"1",age:"12" }).then(data=>{
        console.log(data) ;
        return data ;
    }).then(Http.data).then(data=>{
        console.log(data)
    });
    Http.Apis.submit({ name:"1",age:"12" }).then(data=>{
        console.log(data) ;
        return data ;
    }).then(Http.bool).then(data=>{
        console.log(data)
    });
};
document.getElementById("result4").onclick = function () {
    Http.registerApis(urlPrefix,urls); // 注册到window.Apis 作用域下，调用为window.Apis.delFile()
    Http.setAxiosConfig({
        headers:{
            Authorization:"11"
        }
    });
    Http.Apis.submit({ name:"1",age:"12" }).then(data=>{
        console.log(data) ;
        return data ;
    }).then(Http.bool).then(data=>{
        console.log(data)
    });
};



