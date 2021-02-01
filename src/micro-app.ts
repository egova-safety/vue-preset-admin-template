/**
 * 主项需要的配置文件
 * 配置参考： https://qiankun.umijs.org/zh/api
 */
interface MicroAppItem {
    name: string;
    entry: string;
    activeRule: string | Array<string> | Function;
}
export const microApps: Array<MicroAppItem> = [
    {
        name: "vue app", // 子应用名称
        entry: "//localhost:8000/sub.html", // 子应用入口
        activeRule: "/sub" // 子应用触发规则（路径）
    }
];

(<any>window)._check_rule = (to: any) => {
    return to.name || microApps.some(item => to.path.includes(item));
};
const apps: any = microApps.map(item => {
    return {
        ...item,
        container: "#container" // 子应用挂载的div
        // props: {
        //   routerBase: item.activeRule, // 下发基础路由
        //   getGlobalState: store.getGlobalState // 下发getGlobalState方法
        // }
    };
});
export default apps;
