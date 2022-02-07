/* eslint-disable prettier/prettier */
import { ResponsiveBar } from "@nivo/bar";

const Chart = ({ data, genreName }) => {
  return (
    <ResponsiveBar
      data={data}
      keys={["rating"]}
      indexBy="genre"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      // colors={{ datum: "red" }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 50,
        legend: `${genreName}`,
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "평점",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      theme={{
        background: "transparent",
        axis: {
          fontSize: "14px",
          tickColor: "#eee",
          ticks: {
            line: {
              stroke: "#555555",
            },
            text: {
              fill: "#ffffff",
            },
          },
          legend: {
            text: {
              fill: "#aaaaaa",
            },
          },
        },
        grid: {
          line: {
            stroke: "#555555",
          },
        },
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          itemTextColor: "#ffffff",
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};
export default Chart;
