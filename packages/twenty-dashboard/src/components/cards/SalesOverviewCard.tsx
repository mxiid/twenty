import styled from '@emotion/styled';
import { Card } from './Card';
import { ResponsivePie } from '@nivo/pie';
import { useTheme } from '@emotion/react';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const StyledStatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledStatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledStatValue = styled.div`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  color: ${({ theme }) => theme.font.color.primary};
`;

const StyledStatLabel = styled.div`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.font.color.light};
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

const StyledChartContainer = styled.div`
  height: 180px;
`;

// Mock data for sales overview
const mockData = [
  {
    id: 'Won',
    label: 'Won',
    value: 35,
    color: 'hsl(152, 70%, 50%)',
  },
  {
    id: 'Lost',
    label: 'Lost',
    value: 15,
    color: 'hsl(0, 70%, 50%)',
  },
  {
    id: 'In Progress',
    label: 'In Progress',
    value: 50,
    color: 'hsl(210, 70%, 50%)',
  },
];

export const SalesOverviewCard = () => {
  const theme = useTheme();

  return (
    <Card title="Sales Overview">
      <StyledContainer>
        <StyledStatsContainer>
          <StyledStatItem>
            <StyledStatValue>$1.2M</StyledStatValue>
            <StyledStatLabel>Total Revenue</StyledStatLabel>
          </StyledStatItem>
          <StyledStatItem>
            <StyledStatValue>65</StyledStatValue>
            <StyledStatLabel>Deals Closed</StyledStatLabel>
          </StyledStatItem>
          <StyledStatItem>
            <StyledStatValue>42%</StyledStatValue>
            <StyledStatLabel>Win Rate</StyledStatLabel>
          </StyledStatItem>
        </StyledStatsContainer>
        
        <StyledChartContainer>
          <ResponsivePie
            data={mockData}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            innerRadius={0.6}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'set2' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            enableArcLinkLabels={false}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 30,
                itemsSpacing: 0,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: theme.font.color.secondary,
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 12,
                symbolShape: 'circle',
              },
            ]}
            theme={{
              text: {
                fill: theme.font.color.primary,
                fontSize: 12,
                fontFamily: theme.font.family,
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
          />
        </StyledChartContainer>
      </StyledContainer>
    </Card>
  );
}; 