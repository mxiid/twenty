import { Card } from '../cards/Card';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

const StyledChartContainer = styled.div`
  height: 300px;
`;

const StyledFilterContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledFilterButton = styled.button<{ isActive: boolean }>`
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.background.tertiary : 'transparent'};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  padding: ${({ theme }) => theme.spacing(1, 2)};
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.font.color.secondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.background.tertiary};
  }
`;

// Mock data for sales performance
const mockData = {
  '30d': [
    {
      id: 'Revenue',
      data: Array.from({ length: 30 }, (_, i) => ({
        x: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        y: Math.floor(Math.random() * 50000) + 20000,
      })),
    },
    {
      id: 'Target',
      data: Array.from({ length: 30 }, (_, i) => ({
        x: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        y: 40000,
      })),
    },
  ],
  '90d': [
    {
      id: 'Revenue',
      data: Array.from({ length: 90 }, (_, i) => ({
        x: new Date(Date.now() - (90 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        y: Math.floor(Math.random() * 50000) + 20000,
      })),
    },
    {
      id: 'Target',
      data: Array.from({ length: 90 }, (_, i) => ({
        x: new Date(Date.now() - (90 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        y: 40000,
      })),
    },
  ],
  '1y': [
    {
      id: 'Revenue',
      data: Array.from({ length: 12 }, (_, i) => ({
        x: new Date(Date.now() - (12 - i) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        y: Math.floor(Math.random() * 500000) + 200000,
      })),
    },
    {
      id: 'Target',
      data: Array.from({ length: 12 }, (_, i) => ({
        x: new Date(Date.now() - (12 - i) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        y: 400000,
      })),
    },
  ],
};

type TimeRange = '30d' | '90d' | '1y';

export const SalesPerformanceChart = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  return (
    <Card
      title="Sales Performance"
      action={
        <StyledFilterContainer>
          <StyledFilterButton
            isActive={timeRange === '30d'}
            onClick={() => setTimeRange('30d')}
          >
            30 Days
          </StyledFilterButton>
          <StyledFilterButton
            isActive={timeRange === '90d'}
            onClick={() => setTimeRange('90d')}
          >
            90 Days
          </StyledFilterButton>
          <StyledFilterButton
            isActive={timeRange === '1y'}
            onClick={() => setTimeRange('1y')}
          >
            1 Year
          </StyledFilterButton>
        </StyledFilterContainer>
      }
    >
      <StyledChartContainer>
        <ResponsiveLine
          data={mockData[timeRange]}
          margin={{ top: 20, right: 20, bottom: 50, left: 80 }}
          xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            useUTC: false,
            precision: 'day',
          }}
          xFormat="time:%Y-%m-%d"
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: '%b %d',
            tickValues: timeRange === '1y' ? 'every month' : timeRange === '90d' ? 'every 15 days' : 'every 5 days',
            legend: 'Date',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            legend: 'Amount ($)',
            legendOffset: -60,
            legendPosition: 'middle',
            format: (value) => `$${value / 1000}k`,
          }}
          colors={[theme.color.blue, theme.color.gray]}
          pointSize={4}
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
              <div>{point.data.xFormatted}</div>
            </div>
          )}
        />
      </StyledChartContainer>
    </Card>
  );
}; 