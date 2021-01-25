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
    @autowired(CommonService)
    public service!: CommonService;

    public get hideNavigation() {
        return commonSetting.hideNavigation;
    }

    public async mounted() {
        let result = await this.service.getCurrentUser();
        if (result && !result.hasError) {
            this.$store.commit("user/save", result.result);
        }
    }

    public beforeDestroy() {
        PermissionUtil.clearPermisstionsMap();
    }
}
