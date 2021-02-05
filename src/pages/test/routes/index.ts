
export const demo = {
    name: "index",
    path: "/index",
    title: "index",
    meta: {
        title: "index"
    },
    redirect: "/index/welcome",
    component: () => import("@/components/layout/main-wrapper/index"),
    children: [
        {
            name: "index-about",
            path: "about",
            title: "关于",
            meta: {
                icon: "icon-home", // iconfont文件
                title: "关于"
            },
            component: () => import("../views/index/about/index")
        },
        {
            name: "index-welcome",
            path: "welcome",
            title: "欢迎",
            meta: {
                icon: "icon-home", // iconfont文件
                title: "欢迎"
            },
            component: () => import("../views/index/welcome/index")
        }
    ]
};

export const appRouter = {
    name: "main",
    path: "/",
    title: "main",
    redirect: "/index",
    meta: {},
    component: () => import("@/components/layout"),
    children: [demo]
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
