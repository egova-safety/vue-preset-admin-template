import { component, Component, config } from "@egova/flagwind-web";
import "./index.scss";
import Setting from "../setting";
import { microApps } from "@/micro-app";
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
        "u-setting": Setting
    }
})
export class HeaderComponent extends Component {
    public get navs(): Array<any> {
        return microApps;
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
}
