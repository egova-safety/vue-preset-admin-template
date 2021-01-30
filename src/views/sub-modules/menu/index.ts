/**
 * 侧边栏菜单，支持一级菜单和二级菜单
 */
import { component, Component, config, watch } from "@egova/flagwind-web";
import "./index.scss";
interface MenuGroup {
    name: string; // 菜单名称
    open: boolean; // 是否展开
    icon?: "string"; // 图标
    children: Array<MenuItem>;
}
interface MenuItem {
    name: string;
    routeName: "string";
    icon?: "string"; // 图标
}
@component({
    template: require("./index.html"),
    components: {}
})
export default class MenuComponent extends Component {
    @config({ type: Array, default: () => [] })
    public menuList!: Array<any>;
    public menus: any = [];
    public collapsed: boolean = false; // 是否折叠
    @watch("menuList", { deep: true, immediate: true })
    public initMenu() {
        this.menus = this.getMenus();
    }
    public getMenus() {
        let list: Array<any> = this.menuList || [];
        let menus: Array<MenuGroup | MenuItem> = [];
        for (let i of list) {
            if (i.meta?.isMenuGroup) {
                let menu: MenuGroup = {
                    name: i.meta?.title || i.title || "",
                    open: this.$router.currentRoute.matched[2]?.name === i.name,
                    icon: i.meta?.icon || "",
                    children: i.children.map(
                        (v: any): MenuItem => {
                            return {
                                name: v.meta?.title || v.title || "",
                                routeName: v.name,
                                icon: v.meta?.icon || i.meta?.icon || "default-icon"
                            };
                        }
                    )
                };
                menus.push(menu);
            } else {
                let menu: MenuItem = {
                    name: i.meta?.title || i.title || "",
                    routeName: i.name,
                    icon: i.meta?.icon || "default-icon"
                };
                menus.push(menu);
            }
        }
        return menus;
    }

    public onToggleClick() {
        this.collapsed = !this.collapsed;
    }
}
