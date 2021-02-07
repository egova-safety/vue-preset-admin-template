import flagwind from "@egova/flagwind-core";
import ApplicationContext from "./application/context";
import modules from "@/store";

import { registerMicroApps, start } from "qiankun";
import microApps from "@/micro-app";

// 获取应用上下文
let context = new ApplicationContext(null, modules);

// 启动应用程序
flagwind.Application.start(context);

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
