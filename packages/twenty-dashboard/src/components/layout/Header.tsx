import styled from '@emotion/styled';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: ${({ theme }) => theme.spacing(0, 4)};
  border-bottom: 1px solid ${({ theme }) => theme.border.color.light};
  background-color: ${({ theme }) => theme.background.primary};
`;

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  font-size: ${({ theme }) => theme.font.size.lg};
  color: ${({ theme }) => theme.font.color.primary};
`;

const StyledLogoText = styled.span`
  margin-left: ${({ theme }) => theme.spacing(2)};
`;

const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const Header = () => {
  return (
    <StyledHeader>
      <StyledLogo>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.3431 3.65686C16.8507 0.164466 11.1492 0.164466 7.65685 3.65686L3.99999 7.31372V15.6863L7.65685 19.3431C11.1492 22.8355 16.8507 22.8355 20.3431 19.3431C23.8355 15.8507 23.8355 10.1492 20.3431 6.65686L16.6863 3L20.3431 6.65686C23.8355 10.1492 23.8355 15.8507 20.3431 19.3431L16.6863 23L20.3431 19.3431C23.8355 15.8507 23.8355 10.1492 20.3431 6.65686L16.6863 3" stroke="#11181C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <StyledLogoText>Twenty Dashboard</StyledLogoText>
      </StyledLogo>
      <StyledActions>
        {/* Add user profile or other actions here */}
      </StyledActions>
    </StyledHeader>
  );
}; 