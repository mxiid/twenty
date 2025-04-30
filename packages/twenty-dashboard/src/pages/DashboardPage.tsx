import styled from '@emotion/styled';
import { SalesOverviewCard } from '../components/cards/SalesOverviewCard';
import { OpportunitiesByStageChart } from '../components/charts/OpportunitiesByStageChart';
import { SalesPerformanceChart } from '../components/charts/SalesPerformanceChart';
import { TopCustomersCard } from '../components/cards/TopCustomersCard';
import { RecentActivitiesCard } from '../components/cards/RecentActivitiesCard';
import { SalesForecastChart } from '../components/charts/SalesForecastChart';

const StyledPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const StyledSectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  color: ${({ theme }) => theme.font.color.primary};
  margin: 0 0 ${({ theme }) => theme.spacing(3)} 0;
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(4)};

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledFullWidthContainer = styled.div`
  grid-column: 1 / -1;
`;

const StyledTwoColumnsContainer = styled.div`
  grid-column: span 2;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

export const DashboardPage = () => {
  return (
    <StyledPageContainer>
      <div>
        <StyledSectionTitle>Sales Dashboard</StyledSectionTitle>
        <StyledGridContainer>
          <SalesOverviewCard />
          <StyledTwoColumnsContainer>
            <SalesPerformanceChart />
          </StyledTwoColumnsContainer>
        </StyledGridContainer>
      </div>

      <div>
        <StyledSectionTitle>Pipeline Analysis</StyledSectionTitle>
        <StyledGridContainer>
          <StyledTwoColumnsContainer>
            <OpportunitiesByStageChart />
          </StyledTwoColumnsContainer>
          <SalesForecastChart />
        </StyledGridContainer>
      </div>

      <div>
        <StyledSectionTitle>Customer Insights</StyledSectionTitle>
        <StyledGridContainer>
          <TopCustomersCard />
          <StyledTwoColumnsContainer>
            <RecentActivitiesCard />
          </StyledTwoColumnsContainer>
        </StyledGridContainer>
      </div>
    </StyledPageContainer>
  );
}; 