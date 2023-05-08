// Components
import {
  ResponsiveHeatMapCanvas,
  HeatMapSerie,
  HeatMapDatum,
} from '@nivo/heatmap';

interface ResponsiveHeatMapProps {
  data: HeatMapSerie<HeatMapDatum, object>[];
}

const ResponsiveHeatMap = ({ data }: ResponsiveHeatMapProps) => {
  const cellWidthPixels = 60;
  const cellHeightPixels = 20;

  return (
    <div
      style={{
        minWidth: '350px',
        width: data[0] ? data[0]?.data.length * cellWidthPixels + 50 : 0,
        height: data?.length * cellHeightPixels + 150,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <ResponsiveHeatMapCanvas
        data={data}
        animate={false}
        margin={{ top: 120, right: 100, bottom: 30, left: 100 }}
        xInnerPadding={0.1}
        yInnerPadding={0.2}
        yOuterPadding={0.2}
        axisTop={{
          tickSize: 5,
          tickPadding: 15,
          tickRotation: -30,
        }}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Genes',
          legendPosition: 'middle',
          legendOffset: 95,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Genes',
          legendPosition: 'middle',
          legendOffset: -93,
        }}
        colors={{
          type: 'sequential',
          scheme: 'blues',
        }}
        emptyColor="#ece9e9"
        enableLabels={false}
        annotations={[]}
        legends={[
          {
            anchor: 'bottom',
            translateX: 0,
            translateY: 30,
            length: 500,
            thickness: 10,
            direction: 'row',
            tickPosition: 'before',
            tickSize: 3,
            tickSpacing: 4,
            tickOverlap: false,
            title: 'Value →',
            titleAlign: 'start',
            titleOffset: 3,
          },
        ]}
      />
    </div>
  );
};

export default ResponsiveHeatMap;
