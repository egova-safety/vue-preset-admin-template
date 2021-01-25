import { component, autowired, watch, config, View } from "@egova/flagwind-web";
import "./index.scss";
import { CommonService } from "@/services";
import { commonSetting } from "@/settings";
import axios from "axios";
import { SkinUtil } from "@/common/utils/skin-utils";

@component({
    template: require("./index.html")
})
export default class Login extends View {
    @autowired(CommonService)
    private commonService!: CommonService;
    private title: string = "系统";
    private username: string = "";
    private password: string = "";
    public publicKey: string = "";
    public loading: boolean = false;
    public logging: boolean = false;
    public mounted() {
        this.getPublicKey();
        SkinUtil.initSkin();
    }
    public onLogin() {
        if (!this.validate()) {
            return;
        }
        this.login();
    }
    public async getPublicKey() {
        this.loading = true;
        let result = await this.commonService.getPublicKey();
        this.loading = false;
        if (!result) {
            this.$message.error("获取公钥失败");
            return;
        }
        this.publicKey = result.result;
    }
    public async login() {
        if (this.loading) return;
        this.logging = true;
        axios
            .post(
                `${commonSetting.baseUrl}${commonSetting.securityServer}/oauth/extras/token`,
                {
                    client_id: "unity-client",
                    client_secret: "unity",
                    grant_type: "password",
                    password: this.commonService.getEncryptPassword(
                        this.password
                    ),
                    username: this.username
                }
            )
            .then(async res => {
                const disabled = res.data.person?.disabled;
                if (disabled) {
                    this.$message.error("账号已被禁用，请联系管理员");
                    return;
                }
                this.$store.commit("user/save", res.data);
                this.$router.push({
                    path: "/"
                });
            })
            .catch(error => {
                if (error && error.response && error.response.status === 401) {
                    this.$message.error(error.response.data.error_description);
                } else {
                    this.$message.error("调用服务异常");
                }
            })
            .finally(() => {
                this.logging = false;
            });
    }
    public validate() {
        if (!this.username) {
            this.$message.warning("请输入账号!");
            return false;
        }
        if (!this.password) {
            this.$message.warning("请输入密码!");
            return false;
        }
        return true;
    }
    public onReset() {
        this.password = "";
        this.username = "";
    }
}
