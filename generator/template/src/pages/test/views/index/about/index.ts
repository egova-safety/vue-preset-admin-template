import { component, watch, config, View } from "@egova/flagwind-web";

import "./index.scss";

@component({ template: require("./index.html") })
export default class AboutView extends View {
  protected mounted() {
    // console.log("mounted");
  }
}
