import { Card } from '../cards/Card';
import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

const StyledChartContainer = styled.div`
  height: 300px;
`;

// Mock data for opportunities by stage
const mockData = [
  {
    stage: 'Lead',
    count: 45,
    value: 125000,
  },
  {
    stage: 'Meeting',
    count: 32,
    value: 210000,
  },
  {
    stage: 'Proposal',
    count: 18,
    value: 320000,
  },
  {
    stage: 'Negotiation',
    count: 12,
    value: 280000,
  },
  {
    stage: 'Won',
    count: 8,
    value: 180000,
  },
];

export const OpportunitiesByStageChart = () => {
  const theme = useTheme();

  return (
    <Card title="Opportunities by Stage">
      <StyledChartContainer>
        <ResponsiveBar
          data={mockData}
          keys={['value']}
          indexBy="stage"
          margin={{ top: 10, right: 20, bottom: 50, left: 80 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'blues' }}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Stage',
            legendPosition: 'middle',
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Value ($)',
            legendPosition: 'middle',
            legendOffset: -60,
            format: (value) => `$${value / 1000}k`,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
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
          tooltip={({ id, value, color }) => (
            <div
              style={{
                padding: 12,
                color: theme.font.color.primary,
                background: theme.background.primary,
                borderRadius: 4,
                boxShadow: theme.boxShadow.light,
              }}
            >
              <strong style={{ color }}>
                {id}: ${value.toLocaleString()}
              </strong>
            </div>
          )}
        />
      </StyledChartContainer>
    </Card>
  );
}; 