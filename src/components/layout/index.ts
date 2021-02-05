import { component, View, watch, autowired } from "@egova/flagwind-web";
import "./index.scss";
import { CommonService } from "@/services";
import { PermissionUtil } from "@/common/utils/permission-util";
import { HeaderComponent } from "./header";
import { commonSetting } from "@/settings";
@component({
    template: require("./index.html"),
    components: {
        "u-header": HeaderComponent
    }
})
export default class MainView extends View {
    // public screen: any = {
    //     designWidth: 1920, // 设计稿屏幕宽度
    //     designHeight: 1080, // 设计稿屏幕高度
    //     minHeight: 620, // laptop高度
    //     resize() {
    //         document.documentElement.style.fontSize =
    //             document.documentElement.clientWidth / 19.2 + "px";
    //     }
    // };
    @autowired(CommonService)
    public service!: CommonService;

    public get hideHeader() {
        return commonSetting.__HIDE_HEADER;
    }

    // public async mounted() {
    //     let result = await this.service.getCurrentUser();
    //     if (result && !result.hasError) {
    //         this.$store.commit("user/save", result.result);
    //     }
    //     // this.screen.resize();
    //     // addEventListener("resize", this.screen.resize);
    // }

    public beforeDestroy() {
        PermissionUtil.clearPermisstionsMap();
    }
}
