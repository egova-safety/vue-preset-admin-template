import { component, View, watch } from "@egova/flagwind-web";
import { cachePageList, commonSetting } from "@/settings";
import "./index.scss";
import { PermissionUtil } from "@/common/utils/permission-util";
import MenuComponent from "../../menu";
@component({
    template: require("./index.html"),
    components: {
        "u-menu": MenuComponent
    }
})
export default class MainWrapperView extends View {
    public cachePageList: Array<any> = cachePageList;
    public get hideSideMenu() {
        return commonSetting.__HIDE_SIDE_MENU;
    }
    public get menuList(): Array<any> {
        const appRouter = ((<any>this.$router)?.options?.routes || []).find(
            (v: any) => v.path === "/"
        );
        const name = this.$route.matched[1]?.name;
        if (!name) return [];
        let routes = appRouter.children.find((v: any) => {
            return v.name === name;
        });
        let menu = PermissionUtil.handleMenuByPermissions(
            routes?.children || []
        );
        menu = this.filterMenuList([], menu);
        return menu;
    }

    /**
     * 过滤菜单, 根据hideInMenu隐藏菜单
     * @param target
     * @param raw
     */
    public filterMenuList(target: Array<any>, raw: Array<any>) {
        raw.forEach(item => {
            if (!item.meta?.hideInMenu) {
                let tmp = item.$clone();
                if (item.hasOwnProperty("children")) {
                    tmp.children = [];
                    this.filterMenuList(tmp.children, item.children);
                }
                target.push(tmp);
            }
        });
        return target;
    }
}
