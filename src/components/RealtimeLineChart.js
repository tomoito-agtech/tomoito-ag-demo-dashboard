import React from "react";
import Chart from "react-apexcharts";

export default props => {
  const options = {
    chart: {
      zoom: {
        enabled: false
      },
      animations: {
        easing: "linear",
        dynamicAnimation: {
          speed: 500
        }
      }
    },
    tooltip: {
      x: {
        format: "yyyy-MM-dd HH:mm:ss"
      }
    },
    xaxis: {
      type: "datetime",
      range: props.range,
      labels:{
        datetimeUTC: false
      }
    },
    yaxis: {
      labels: {
        formatter: val => val,
        datetimeUTC: false
      },
      title: { text: "Value" }
    }
  };
  return <Chart type="line" options={options} series={props.dataList} />;
};
