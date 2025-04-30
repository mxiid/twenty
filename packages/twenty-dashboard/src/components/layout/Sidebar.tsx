import styled from '@emotion/styled';

const StyledSidebar = styled.aside`
  width: 240px;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.border.color.light};
  background-color: ${({ theme }) => theme.background.secondary};
  overflow-y: auto;
`;

const StyledNavList = styled.ul`
  list-style: none;
  padding: ${({ theme }) => theme.spacing(2)};
  margin: 0;
`;

const StyledNavItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StyledNavLink = styled.a`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  color: ${({ theme }) => theme.font.color.secondary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.background.tertiary};
  }

  &.active {
    background-color: ${({ theme }) => theme.background.tertiary};
    color: ${({ theme }) => theme.font.color.primary};
  }
`;

const StyledNavIcon = styled.span`
  margin-right: ${({ theme }) => theme.spacing(2)};
  display: flex;
  align-items: center;
`;

const StyledNavSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StyledNavSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  color: ${({ theme }) => theme.font.color.light};
  text-transform: uppercase;
  padding: ${({ theme }) => theme.spacing(2, 2, 1)};
  margin: 0;
`;

export const Sidebar = () => {
  return (
    <StyledSidebar>
      <StyledNavList>
        <StyledNavSection>
          <StyledNavSectionTitle>Overview</StyledNavSectionTitle>
          <StyledNavItem>
            <StyledNavLink href="#" className="active">
              <StyledNavIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </StyledNavIcon>
              Dashboard
            </StyledNavLink>
          </StyledNavItem>
        </StyledNavSection>
        
        <StyledNavSection>
          <StyledNavSectionTitle>Sales</StyledNavSectionTitle>
          <StyledNavItem>
            <StyledNavLink href="#">
              <StyledNavIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8M9 2H15C15.5523 2 16 2.44772 16 3V5C16 5.55228 15.5523 6 15 6H9C8.44772 6 8 5.55228 8 5V3C8 2.44772 8.44772 2 9 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </StyledNavIcon>
              Opportunities
            </StyledNavLink>
          </StyledNavItem>
          <StyledNavItem>
            <StyledNavLink href="#">
              <StyledNavIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </StyledNavIcon>
              Customers
            </StyledNavLink>
          </StyledNavItem>
        </StyledNavSection>
        
        <StyledNavSection>
          <StyledNavSectionTitle>Analytics</StyledNavSectionTitle>
          <StyledNavItem>
            <StyledNavLink href="#">
              <StyledNavIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 20V10M12 20V4M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </StyledNavIcon>
              Performance
            </StyledNavLink>
          </StyledNavItem>
          <StyledNavItem>
            <StyledNavLink href="#">
              <StyledNavIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </StyledNavIcon>
              Forecasting
            </StyledNavLink>
          </StyledNavItem>
        </StyledNavSection>
      </StyledNavList>
    </StyledSidebar>
  );
}; 