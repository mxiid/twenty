import styled from '@emotion/styled';
import { ReactNode } from 'react';

type CardProps = {
  title: string;
  children: ReactNode;
  action?: ReactNode;
};

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.background.primary};
  border-radius: ${({ theme }) => theme.border.radius.md};
  box-shadow: ${({ theme }) => theme.boxShadow.light};
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(3)};
  border-bottom: 1px solid ${({ theme }) => theme.border.color.light};
`;

const StyledCardTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.font.color.primary};
  margin: 0;
`;

const StyledCardContent = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  flex: 1;
`;

export const Card = ({ title, children, action }: CardProps) => {
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>{title}</StyledCardTitle>
        {action}
      </StyledCardHeader>
      <StyledCardContent>{children}</StyledCardContent>
    </StyledCard>
  );
};
 