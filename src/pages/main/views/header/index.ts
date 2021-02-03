import { component, Component, config } from "@egova/flagwind-web";
import "./index.scss";
import Setting from "../setting";
import { microApps } from "@/micro-app";
import { menuData } from "./menu";
import { MenuComponent } from "./menu/index";
export interface INavItem {
    name: string;
    title: string;
    url?: string;
    active?: boolean;
    children?: Array<INavItem>;
}
@component({
    template: require("./index.html"),
    components: {
        "u-setting": Setting,
        "u-menu": MenuComponent
    }
})
export class HeaderComponent extends Component {
    public menuData: any = menuData;
    public currentMenu: any = Object.create(null);
    public currentMenuKey: string = "";
    public get navs(): Array<any> {
        return microApps;
    }

    public get dropDownStyle() {
        if (this.currentMenu?.menus?.length) {
            return "height: 500px; opacity: 1";
        }
        // return "height: 500px; opacity: 1";
        return "height: 0; opacity: 0";
    }

    public goto(item?: any, path?: string) {
        if (!item) {
            history.pushState(null, "", "/index.html");
            return;
        }
        history.pushState(null, "/", `${item.activeRule}${path || ""}`);
        // history.pushState(null, item.activeRule, `${item.activeRule}#/index/menu2/menu2.1`);
    }
    public onGoToHome() {
        history.pushState(null, "", "/");
    }

    public onMouseover(item: string) {
        console.log(`over ${item}`);
        if (item === this.currentMenuKey && this.currentMenu?.name) {
            return;
        }
        this.currentMenu = menuData[item];
        this.currentMenuKey = item;
    }
    public onMouseleave(e: any) {
        const headerHeight =
            (0.6 * document.documentElement.clientWidth) / 19.2 - 1;
        if (e.clientY >= headerHeight && e.clientY < headerHeight + 500) {
            return;
        }
        this.currentMenuKey = "";
        this.currentMenu = Object.create(null);
    }
}
