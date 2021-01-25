import { component, Component, config } from "@egova/flagwind-web";
import "./index.scss";
import Setting from "../setting";
import { PermissionUtil } from "@/common/utils/permission-util";
import { appRouter } from "@/routes";
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
    public get navs(): Array<INavItem> {
        let routes = appRouter.children;
        let list = PermissionUtil.handPermissionMenu(this, routes);
        return list && list.map(this.format);
    }

    public get activedHeadeMenuIndex() {
        return this.navs.findIndex(v => v.active);
    }

    public onRoute(item: INavItem) {
        if((this.$route.matched.length > 1 && this.$route.matched[1].name) ===  item.name) return;
        this.$store.commit("menu/MODELNAME", item.name || "");
        if (item.name) {
            this.$router.push({ name: item.name });
            return;
        }
        item.url && window.open(item.url);
    }
    public onGoToHome() {
        window.location.href = "index.html";
    }
    protected format(nav: any) {
        const children = (nav.children && nav.children.map(this.format)) || [];
        return {
            name: nav.name || "",
            title: nav.meta && nav.meta.title || "",
            url: nav.url || "",
            children: children,
            active: (nav.name && nav.name === this.$route.matched[1].name) || children.find((it: INavItem) => it.active)
        };
    }
}
