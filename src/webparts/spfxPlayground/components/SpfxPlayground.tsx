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
import {
  DatePicker,
  Checkbox,
  TextField,
  MaskedTextField,
} from "office-ui-fabric-react";

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
        <form id="frm">
          {/* Title Section */}
          <div className="title-bar row">
            <div className="top-logo col col-lg-3">
              {/* <img src={require("../img/StepCHangeLogo.png")} width="200" /> */}
            </div>
            <div className="title-text col col-lg-6">
              <h4 className="heading-text"> SPFx Playground </h4>
            </div>
            <div className="col col-lg-3"></div>
          </div>

          <div className="panel-body">
            <div className="tab-pane fade in active ui-tabs-panel ui-widget-content ui-corner-bottom">

              
            </div>
          </div>
        </form>
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
