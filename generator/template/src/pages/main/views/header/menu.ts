interface MenuItem {
    name: string;
    activeRule?: string;
    menus?: Array<any>;
}
export const subMenus: MenuItem = {
    name: "整合应用",
    activeRule: "",
    menus: [
        {
            name: "sub子应用",
            links: [
                {
                    name: "sub-welcome",
                    path: "sub#/index/welcome"
                },
                {
                    name: "sub-about",
                    path: "sub#/index/about"
                }
            ]
        },
        {
            name: "test子应用",
            links: [
                {
                    name: "test-welcome",
                    path: "test#/index/welcome"
                },
                {
                    name: "test-about",
                    path: "test#/index/about"
                }
            ]
        }
    ]
};

export const menuData: any = {
    subMenus
};
