export const index = {
    name: "index",
    path: "/index",
    title: "导航1",
    meta: {
        title: "导航1"
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
                title: "菜单1",
                isMenuGroup: false // 是否含二级菜单
            },
            component: () => import("@/views/demos/welcome"),
            children: []
        },
        {
            name: "index-menu2",
            path: "menu2",
            title: "菜单2",
            meta: {
                icon: "icon-home", // iconfont文件
                title: "菜单2",
                isMenuGroup: true // 是否含二级菜单
            },
            component: () => import("@/components/layout/blank/index"),
            children: [
                {
                    name: "index-menu2-1",
                    path: "menu2.1",
                    title: "菜单2.1",
                    meta: {
                        icon: "icon-home", // iconfont文件
                        title: "菜单2.1"
                    },
                    component: () => import("@/views/demos/about")
                }
            ]
        }
    ]
};

export const demo = {
    name: "demo",
    path: "/demo",
    title: "demo",
    meta: {
        title: "demo"
    },
    redirect: "/demo/index",
    component: () => import("@/components/layout/main-wrapper/index"),
    children: [
        {
            name: "demo-index",
            path: "index",
            title: "导航栏",
            meta: {
                icon: "icon-home", // iconfont文件
                title: "导航栏"
            },
            component: () => import("@/views/demos/demo-nav/index")
        }
    ]
};

export const demonav = {
    name: "demonav",
    path: "/nav",
    title: "nav",
    meta: {
        title: "nav"
    },
    component: () => import("@/views/demos/demo-nav/index")
};

export const appRouter = {
    name: "main",
    path: "/",
    title: "main",
    redirect: "/index",
    meta: {},
    component: () => import("@/components/layout"),
    children: [index, demo]
};

export const routes = [
    appRouter,
    demonav,
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
