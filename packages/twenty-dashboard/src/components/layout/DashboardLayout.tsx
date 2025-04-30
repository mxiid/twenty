import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

type DashboardLayoutProps = {
  children: ReactNode;
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.background.primary};
`;

const StyledContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const StyledMainContent = styled.main`
  flex: 1;
  overflow: auto;
  padding: ${({ theme }) => theme.spacing(4)};
`;

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <StyledContainer>
      <Header />
      <StyledContent>
        <Sidebar />
        <StyledMainContent>{children}</StyledMainContent>
      </StyledContent>
    </StyledContainer>
  );
}; 