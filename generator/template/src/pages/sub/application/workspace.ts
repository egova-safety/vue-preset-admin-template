import Vue from "vue";

import flagwind from "@egova/flagwind-core";
import IWorkbench = flagwind.IWorkbench;
import ApplicationContext from "./context";
import Workbench from "./workbench";

/**
 * 提供工作空间的常用功能。
 * @class
 * @version 1.0.0
 */
export default class Workspace extends Vue {
    private _workbench: IWorkbench;

    /**
     * 获取工作空间所属的工作台实例。
     * @property
     * @returns IWorkbench
     */
    public get workbench(): Workbench {
        return this._workbench as Workbench;
    }
    public get applicationContext(): ApplicationContext {
        return (<any>this.workbench).applicationContext as ApplicationContext;
    }
    /**
     * 初始化工作空间的新实例。
     * @constructor
     * @param  {IWorkbench} workbench 工作台实例。
     * @param  {Router} router 主路由程序。
     */
    public constructor(workbench: Workbench) {
        let options = {
            el: (window as any).__POWERED_BY_QIANKUN__
                ? "#container #app"
                : "#app",
            router: (workbench.applicationContext as ApplicationContext).router,
            store: (workbench.applicationContext as ApplicationContext).store,
            template: '<div id="app"><router-view /></div>'
        };

        // 传入配置进行初始化
        super(options);

        // 保存工作台
        this._workbench = workbench;
    }
}