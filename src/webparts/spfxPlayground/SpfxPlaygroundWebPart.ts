import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "SpfxPlaygroundWebPartStrings";
import SpfxPlayground from "./components/SpfxPlayground";
import { ISpfxPlaygroundProps } from "./components/ISpfxPlaygroundProps";

export interface ISpfxPlaygroundWebPartProps {
  description: string;
}

export default class SpfxPlaygroundWebPart extends BaseClientSideWebPart<ISpfxPlaygroundWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ISpfxPlaygroundProps> =
      React.createElement(SpfxPlayground, {
        description: this.properties.description,
        context: this.context,
      });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
