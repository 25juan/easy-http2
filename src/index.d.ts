declare module "easy-http2" {
    interface HttpResultInterface {
        state: string;
        msg?: string ;
        data?:any
    }
    export const Apis:Object ;
    export const _Apis : Object ;
    export const axios: Object ;
    export function data(result:HttpResultInterface) ;
    export function bool(result:HttpResultInterface);
    export function registerApis(prefixURL:string, urls:Object, namespace:string) ;
    export function setMsg(fn:Function) ;
    export function setAxiosConfig(config:Object);
}
