import { component, Component, watch } from "@egova/flagwind-web";
import "./index.scss";
import { SkinUtil } from "@/common/utils/skin-utils";
@component({
    template: require("./index.html")
})
export default class Setting extends Component {
    public menuList: Array<any> = [];
    public photo: string = "https://i.loli.net/2017/08/21/599a521472424.jpg";
    public show: boolean = false;
    public skins: Array<any> = [];
    public skinId: string = "";

    public errorAvatar = "https://i.loli.net/2017/08/21/599a521472424.jpg";

    public async created(): Promise<void> {
        SkinUtil.initSkin();
        this.skins = await SkinUtil.getSkins();
        this.skinId = await SkinUtil.getSkinId();
    }

    public onChangeColor() {
        this.show = true;
    }
    public onConfirm() {
        localStorage.setItem("skinId", this.skinId);
        this.show = false;
    }
    public async onCancel() {
        SkinUtil.initSkin();
        this.skinId = await SkinUtil.getSkinId();
        this.show = false;
    }
    @watch("skinId")
    public onSkinChanged() {
        SkinUtil.previewSkin(this.skinId);
    }
    @watch("$store.state.user", { immediate: false, deep: true })
    public getUserName(nv: any) {
        //
    }
    public onClick(name: string) {
        switch (name) {
            case "theme":
                this.onChangeColor();
                break;
            case "logout":
                this.onLogout();
                break;
        }
    }
    public onLogout() {
        this.$modal.confirm({
            title: "确认",
            content: "您确定要退出登录吗？",
            onOk: () => {
                this.$store.commit("user/logout");
                localStorage.removeItem("user");
                window.location.href = "index.html#/login";
            }
        });
    }
}
