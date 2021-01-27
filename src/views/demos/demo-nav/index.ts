import { component, watch, config, View } from "@egova/flagwind-web";
import { HeaderComponent } from "./components/header";

import "./index.scss";

@component({
    template: require("./index.html"),
    components: {
        "u-header": HeaderComponent
    }
})
export default class DemoNavView extends View {
    protected mounted() {
        // console.log("mounted");
    }
}
