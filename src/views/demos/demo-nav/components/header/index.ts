import { component, Component } from "@egova/flagwind-web";
import "./index.scss";
import { PermissionUtil } from "@/common/utils/permission-util";
import { appRouter } from "@/routes";
import Setting from "../setting";
export interface INavItem {
    name: string;
    title: string; //
    url?: string;
}
@component({
    template: require("./index.html"),
    components: {
        "u-setting": Setting
    }
})
export class HeaderComponent extends Component {
    
    public onGoToHome() {
        window.location.href = "index.html";
    }
}
