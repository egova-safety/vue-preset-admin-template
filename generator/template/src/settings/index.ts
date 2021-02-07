export const global = <any>window;
/**
 * 公共配置
 */
export let commonSetting = {
    ...{
        // 后端地址
        baseUrl: "http://www.egova.top:30052/gateway",
        securityServer: "/security-server"
    },
    ...global.commonSetting
};
export const cachePageList = [];
// 配置项目的rootSchemaId
export const rootSchemaId = "";
