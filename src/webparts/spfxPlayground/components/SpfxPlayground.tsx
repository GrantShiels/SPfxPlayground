import * as React from "react";
import styles from "./SpfxPlayground.module.scss";
import { ISpfxPlaygroundProps } from "./ISpfxPlaygroundProps";
import { escape } from "@microsoft/sp-lodash-subset";

import { SPComponentLoader } from "@microsoft/sp-loader";
import { sp, Web, Item } from "sp-pnp-js";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import {
  DateTimePicker,
  DateConvention,
  TimeConvention,
} from "@pnp/spfx-controls-react/lib/dateTimePicker";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
} from "office-ui-fabric-react/lib/Dropdown";

import * as $ from "jquery";

require("bootstrap");
require("../css/custom.css");
require("../css/loader.css");

SPComponentLoader.loadCss(
  "https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
);
SPComponentLoader.loadCss(
  "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
);

var ipaddress, baseURL;

export default class SpfxPlayground extends React.Component<
  ISpfxPlaygroundProps,
  {}
> {
  constructor(props: ISpfxPlaygroundProps) {
    super(props);
    this.state = {};
  }
  public render(): React.ReactElement<ISpfxPlaygroundProps> {
    return (
      <div id="container">
        <form id="frm"></form>
      </div>
    );
  }

  private GetIPAddress(): void {
    var call = $.ajax({
      url: "https://api.ipify.org/?format=json",
      method: "GET",
      async: false,
      dataType: "json",
      success: (data) => {
        console.log("IP Address : " + data.ip);
        ipaddress = data.ip;
      },
      error: (textStatus, errorThrown) => {
        console.log(
          "Ip Address fetch failed : " + textStatus + "--" + errorThrown
        );
      },
    }).responseJSON;
  }

  public async componentDidMount() {
    //used to get the URL of the site
    baseURL = this.props.context.pageContext.site.absoluteUrl;
    await this.GetIPAddress();
  }
}
