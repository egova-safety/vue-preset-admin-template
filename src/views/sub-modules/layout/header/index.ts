import { component, Component } from "@egova/flagwind-web";
import "./index.scss";
import Setting from "../setting";
import { PermissionUtil } from "@/common/utils/permission-util";
import { appRouter } from "@/routes";
export interface INavItem {
    name: string;
    title: string; //
    url?: string;
}
@component({
    template: require("./index.html"),
    components: {
        "u-setting": Setting
    }
})
export class HeaderComponent extends Component {
    public extraNavs: Array<any> = [
        {
            name: "demonav",
            title: "导航栏"
        }
    ];
    public get navs(): Array<INavItem> {
        let routes = appRouter.children;
        let list = PermissionUtil.handPermissionMenu(this, routes) || [];
        list = list.concat(this.extraNavs);
        return list;
    }

    public onRoute(item: INavItem) {
        item.url && window.open(item.url);
    }
    public onGoToHome() {
        window.location.href = "index.html";
    }
}
