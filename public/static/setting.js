window.commonSetting = {
    // 后端地址
    ...{
        baseUrl: "http://www.egova.top:30047/gateway",
        securityServer: "/security-server"
    },
    ...{
        // 菜单显示和隐藏配置
        // hideNavigation: true,
        // hideSideMenu: true
    }
};
/**
 * 初始化屏幕分辨率
 */
var Screen = {
    designWidth: 1920,   // 设计稿屏幕宽度
    designHeight: 1080,   // 设计稿屏幕高度
    minHeight: 620,    // laptop高度
    resize() {
        document.documentElement.style.fontSize = (document.documentElement.clientWidth / 19.2) + "px";
    }
};
Screen.resize();
addEventListener("resize", Screen.resize);
