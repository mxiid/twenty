import { Card } from '../cards/Card';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

const StyledChartContainer = styled.div`
  height: 300px;
`;

// Mock data for sales forecast
const mockData = [
  {
    id: 'Actual',
    data: [
      { x: 'Jan', y: 45000 },
      { x: 'Feb', y: 52000 },
      { x: 'Mar', y: 48000 },
      { x: 'Apr', y: 61000 },
      { x: 'May', y: 55000 },
      { x: 'Jun', y: 67000 },
    ],
  },
  {
    id: 'Forecast',
    data: [
      { x: 'Jun', y: 67000 },
      { x: 'Jul', y: 70000 },
      { x: 'Aug', y: 73000 },
      { x: 'Sep', y: 78000 },
      { x: 'Oct', y: 82000 },
      { x: 'Nov', y: 86000 },
      { x: 'Dec', y: 91000 },
    ],
  },
];

export const SalesForecastChart = () => {
  const theme = useTheme();

  return (
    <Card title="Sales Forecast">
      <StyledChartContainer>
        <ResponsiveLine
          data={mockData}
          margin={{ top: 20, right: 20, bottom: 50, left: 80 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Month',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Amount ($)',
            legendOffset: -60,
            legendPosition: 'middle',
            format: (value) => `$${value / 1000}k`,
          }}
          colors={[theme.color.green, theme.color.blue]}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 50,
              itemsSpacing: 20,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          theme={{
            text: {
              fill: theme.font.color.primary,
              fontSize: 12,
              fontFamily: theme.font.family,
            },
            axis: {
              domain: {
                line: {
                  stroke: theme.border.color.medium,
                },
              },
              ticks: {
                line: {
                  stroke: theme.border.color.medium,
                },
                text: {
                  fill: theme.font.color.secondary,
                },
              },
              legend: {
                text: {
                  fill: theme.font.color.primary,
                  fontSize: 12,
                  fontWeight: 500,
                },
              },
            },
            grid: {
              line: {
                stroke: theme.border.color.light,
              },
            },
            tooltip: {
              container: {
                background: theme.background.primary,
                color: theme.font.color.primary,
                fontSize: 12,
                borderRadius: 4,
                boxShadow: theme.boxShadow.light,
                padding: 8,
              },
            },
          }}
          tooltip={({ point }) => (
            <div
              style={{
                padding: 12,
                color: theme.font.color.primary,
                background: theme.background.primary,
                borderRadius: 4,
                boxShadow: theme.boxShadow.light,
              }}
            >
              <strong style={{ color: point.serieColor }}>
                {point.serieId}: ${point.data.y.toLocaleString()}
              </strong>
              <div>{point.data.x}</div>
            </div>
          )}
        />
      </StyledChartContainer>
    </Card>
  );
}; 