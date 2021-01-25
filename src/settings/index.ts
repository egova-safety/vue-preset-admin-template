export const global = <any>window;
/**
 * 公共配置
 */
export let commonSetting = {
    ...{
        // 后端地址
        baseUrl: "",
        securityServer: ""
    },
    ...{
        // 菜单显示和隐藏配置
        hideNavigation: (window as any).__POWERED_BY_QIANKUN__,
        hideSideMenu: (window as any).__POWERED_BY_QIANKUN__
    },
    ...global.commonSetting
};
export const cachePageList = [];
