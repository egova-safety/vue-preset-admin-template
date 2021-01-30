import flagwind from "@egova/flagwind-core";
import ApplicationContext from "@/application/context";
import { routes } from "./routes";
import modules from "./store";

/* main-project */
import { registerMicroApps, start } from "qiankun";
import microApps from "./micro-app";
/* main-project-end */

if ((window as any).__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = (window as any)
        .__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// 获取应用上下文
let context = new ApplicationContext(routes, modules);

// 独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
    // 启动应用程序
    flagwind.Application.start(context);
}

export async function bootstrap() {
    console.log("[vue] vue app bootstraped");
}
export async function mount(props: any) {
    console.log("[vue] props from main framework", props);
    flagwind.Application.start(context);
}
export async function unmount() {
    flagwind.Application.exit();
}

/* main-project */
// 注册子应用
registerMicroApps(microApps, {
    beforeLoad: () => {
        console.log("加载前");
        return Promise.resolve();
    },
    afterMount: () => {
        console.log("加载后");
        return Promise.resolve();
    }
});
// 开启服务
start();
/* main-project-end */
