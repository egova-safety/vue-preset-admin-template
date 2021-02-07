/**
 * 主项需要的配置文件
 * 配置参考： https://qiankun.umijs.org/zh/api
 */
interface MicroAppItem {
    name: string;
    entry: string;
    props: any;
    activeRule: string | Array<string> | Function;
}
export const microApps: Array<MicroAppItem> = [
    {
        name: "sub子应用", // 子应用名称
        entry: "//localhost:8100/sub.html", // 子应用入口
        props: { hideHeader: true, hideSideMenu: false }, // 子应用参数
        activeRule: "/sub" // 子应用触发规则（路径）
    },
    {
        name: "test子应用", // 子应用名称
        entry: "//localhost:8100/test.html", // 子应用入口
        props: { hideHeader: true, hideSideMenu: true },// 子应用参数
        activeRule: "/test" // 子应用触发规则（路径）
    }
];

(<any>window)._CHECK_ROUTE = (to: any) => {
    return to.name || microApps.some(item => to.path.includes(item));
};
const apps: any = microApps.map(item => {
    return {
        ...item,
        container: "#container" // 子应用挂载的div
    };
});
export default apps;
