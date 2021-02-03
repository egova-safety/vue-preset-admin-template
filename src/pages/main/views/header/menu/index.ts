import { component, Component, config, watch } from "@egova/flagwind-web";
import "./index.scss";

@component({
    template: require("./index.html"),
    components: {}
})
export class MenuComponent extends Component {
    @config({ default: () => [] })
    public data!: Array<any>;

    public currentGroup: any = Object.create(null);

    @watch("data")
    public onDataChange() {
        if (!this.data || !this.data.length) {
            this.currentGroup = [];
        }
        this.currentGroup = this.data[0];
    }

    public onMouseover(item: any) {
        this.currentGroup = item;
    }

    public goto(item?: any, nwindow?: boolean) {
        if (!item) {
            nwindow
                ? window.open("/index.html")
                : history.pushState(null, "", "/index.html");
            return;
        }
        nwindow
            ? window.open(item.path)
            : history.pushState(null, "/", `${item.path}`);
        // history.pushState(null, item.activeRule, `${item.activeRule}#/index/menu2/menu2.1`);
    }
}
