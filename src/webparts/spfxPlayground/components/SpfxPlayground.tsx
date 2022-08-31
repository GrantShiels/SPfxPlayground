import { SPComponentLoader } from "@microsoft/sp-loader";
import * as $ from "jquery";
import * as React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import * as moment from "moment";

import { Document, Page } from "react-pdf";

import { ISpfxPlaygroundProps } from "./ISpfxPlaygroundProps";

require("bootstrap");
require("../css/custom.css");
require("../css/loader.css");

var ipaddress, baseURL;

const pdfArray = [
  {
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

SPComponentLoader.loadCss(
  "https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
);
SPComponentLoader.loadCss(
  "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
);

const useToggle = (initialState) => {
  const [isToggled, setIsToggled] = React.useState(initialState);
  const isToggledRef = React.useRef(isToggled);

  // put [isToggledRef, setIsToggled] into the useCallback's dependencies array
  // these values never change so the calllback is not going to be ever re-created
  const toggle = React.useCallback(
    () => setIsToggled(!isToggledRef.current),
    [isToggledRef, setIsToggled]
  );

  // keep the value in isToggledRef actual
  // when isToggled changes, isToggledRef is updated accordingly
  React.useEffect(() => {
    isToggledRef.current = isToggled;
  }, [isToggled]);

  return [isToggled, toggle];
};

const OptimizedBooleanState = () => {
  const [isToggled, toggle] = useToggle(false);

  const [randomNumber, setRandomNumber] = React.useState(Math.random());
  const generateRandomNumber = React.useCallback(
    () => setRandomNumber(Math.random()),
    []
  );

  return (
    <div>
      <div>
        Current random number is <b>{randomNumber}</b>
        <button style={{ marginLeft: "10px" }} onClick={generateRandomNumber}>
          regenerate
        </button>
      </div>
      <div>
        Boolean is set to <b>{String(isToggled)}</b>.
      </div>

      {/* <button style={{ marginLeft: "10px" }} onClick={toggle}>
        toggle
      </button> */}

      <button
        type="button"
        className="btn btn-primary btn-success btn-lg"
        id="importButton"
        onClick={toggle}
      >
        TOGGLE
      </button>
    </div>
  );
};

//used to host the pdf viewer
const PdfView = () => {
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    debugger;
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div>
      {pdfArray.map((currentPdf) => {
        <>
          <Document file={currentPdf} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <div>
            <p>
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </p>
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </>;
      })}
    </div>
  );
};

//USed for the chart
export interface ITimeLine {}

class TestTimeline extends React.Component<ITimeLine, { options: any }> {
  constructor(props: ITimeLine) {
    super(props);
    this.state = {
      options: {
        chart: {
          height: 550,
          type: "rangeBar",
          id: "summaryTimeline",
          fontFamily:
            '"Segoe UI Web (West European)",Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif',
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
            dataLabels: {
              hideOverflowingLabels: false,
              position: "top",
            },
          },
        },
        xaxis: {
          type: "datetime",
          labels: {
            style: {
              fontWeight: "700",
              fontSize: "14px",
              fontFamily:
                '"Segoe UI Web (West European)",Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif',
            },
          },
        },
        yaxis: {
          labels: {
            maxWidth: "auto",
            align: "right",
            style: {
              fontWeight: "700",
              fontSize: "14px",
              fontFamily:
                '"Segoe UI Web (West European)",Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif',
            },

          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            var label = opts.w.globals.labels[opts.dataPointIndex];
            var a = moment(val[0]);
            var b = moment(val[1]);
            var diff = b.diff(a, "days");
            return diff + (diff > 1 ? " days" : " day");
          },
          textAnchor: "start",
          offsetX: 50,
          style: {
            colors: ["#000"],
          },
        },
        grid: {
          row: {
            colors: ["#f3f4f5", "#fff"],
            opacity: 1,
          },
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
      },
    };
  }

  public render() {
    let seriesArray = [
      {
        data: [
          {
            x: "Phase One Update",
            y: [1671926400000, 1679702400000],
            fillColor: "#57a0d1",
          },
          {
            x: "Mob to Execution Location",
            y: [1679702400000, 1680649200000],
            fillColor: "#57a0d1",
          },
          {
            x: "Project Execution",
            y: [1680649200000, 1685833200000],
            fillColor: "#57a0d1",
          },
          {
            x: "Mob to Location",
            y: [1685833200000, 1686438000000],
            fillColor: "#57a0d1",
          },
          {
            x: "Customer Acceptance",
            y: [1686438000000, 1699401600000],
            fillColor: "#57a0d1",
          },
          {
            x: "Post Project Support",
            y: [1699401600000, 1707177600000],
            fillColor: "#57a0d1",
          },
          {
            x: "ACOM - 01",
            y: [1663282800000, 1671926400000],
            fillColor: "#dd3c27",
          },
        ],
      },
    ];

    return (
      <div className="charter-summary-data long-lead-data">
        <div className="charter-summary-title">
          <span>Test Timeline</span>
        </div>
        <div className="row">
          <div className="col summary-timeline mixed-chart">
            <ReactApexChart
              options={this.state.options}
              series={seriesArray}
              type="rangeBar"
              height={550}
            />
            {/* <Chart
              options={this.state.options}
              series={seriesArray}
              type="rangeBar"
              height={550}
            /> */}
            <div id="hiddenTimeline" className="hidden-timeline"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default class SpfxPlayground extends React.Component<
  ISpfxPlaygroundProps,
  {}
> {
  constructor(props: ISpfxPlaygroundProps) {
    super(props);
    this.state = {};
  }
  public render(): React.ReactElement<ISpfxPlaygroundProps> {
    // const [numPages, setNumPages] = React.useState(null);
    // const [pageNumber] = React.useState(1);

    // const onDocumentLoadSuccess = ({ numPages }) => {
    //   setNumPages(numPages);
    // };

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
            <div className="top-buffer row center-row">
              <div className="col-md-12">
                <TestTimeline></TestTimeline>
              </div>
            </div>
            <div className="top-buffer">
              <OptimizedBooleanState></OptimizedBooleanState>
            </div>
            <div className="top-buffer">
              <div>
                <Document file="https://www.jianjunchen.com/papers/CORS-USESEC18.slides.pdf">
                  <Page pageNumber={1} />
                </Document>
                {/* <p>
                  Page {pageNumber} of {numPages}
                </p> */}
              </div>
            </div>
            <div className="top-buffer">
              <h1>PDF Example with iframe</h1>
              <iframe
                src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                width="100%"
                height="800px"
              ></iframe>
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
    console.log("Added step zilla");
  }
}
