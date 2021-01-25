export const index = {
    name: "index",
    path: "/index",
    title: "index",
    meta: {
        title: "index",
        hideInBreadCrumb: true
    },
    redirect: "/index/home",
    component: () => import("@/components/layout/main-wrapper/index"),
    children: [
        {
            name: "index-home",
            path: "home",
            title: "首页",
            meta: {
                icon: "icon-home", // iconfont文件
                title: "欢迎",
                isMenuGroup: false // 是否含二级菜单
            },
            component: () => import("@/views/welcome"),
            children: []
        }
    ]
};
export const appRouter = {
    name: "main",
    path: "/",
    title: "demo",
    redirect: "/index",
    meta: {},
    component: () => import("@/components/layout"),
    children: [index]
};

export const routes = [
    appRouter,
    {
        name: "login",
        path: "/login",
        title: "登录",
        component: () => import("@/views/login/index")
    },
    {
        name: "500",
        path: "/500",
        component: () => import("@/views/errors/500")
    },
    {
        name: "401",
        path: "/401",
        component: () => import("@/views/errors/401")
    },
    {
        name: "403",
        path: "/403",
        component: () => import("@/views/errors/403")
    },
    {
        name: "404",
        path: "/*",
        component: () => import("@/views/errors/404")
    }
];
