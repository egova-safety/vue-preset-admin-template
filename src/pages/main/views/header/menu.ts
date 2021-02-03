interface MenuItem {
    name: string;
    activeRule?: string;
    menus?: Array<any>;
}
export const subMenus: MenuItem = {
    name: "子项目",
    activeRule: "",
    menus: [
        {
            name: "index",
            links: [
                {
                    name: "welcome",
                    path: "sub#/index/home"
                },
                {
                    name: "about",
                    path: "sub#/index/menu2/menu2.1"
                }
            ]
        },
        {
            name: "demo",
            links: [
                {
                    name: "demo",
                    path: "sub#/demo/index"
                }
            ]
        }
    ]
};

export const menuData: any = {
    subMenus
};
