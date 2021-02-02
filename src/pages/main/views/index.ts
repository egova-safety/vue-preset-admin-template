import { component, View, watch, autowired } from "@egova/flagwind-web";
import "./index.scss";
import { CommonService } from "@/services";
import { HeaderComponent } from "./header";
import { addGlobalUncaughtErrorHandler } from "qiankun";
@component({
    template: require("./index.html"),
    components: {
        "u-header": HeaderComponent
    }
})
export default class MainView extends View {
    @autowired(CommonService)
    public service!: CommonService;

    public handError(e: any) {
        console.error(e);
        this.$message.error("微服务加载失败");
        history.pushState(null, "/", "/");
    }

    public async mounted() {
        let result = await this.service.getCurrentUser();
        if (result && !result.hasError) {
            this.$store.commit("user/save", result.result);
        }
        addGlobalUncaughtErrorHandler(this.handError);
    }
}
