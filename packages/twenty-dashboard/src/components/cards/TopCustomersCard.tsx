import styled from '@emotion/styled';
import { Card } from './Card';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTableHeader = styled.thead`
  border-bottom: 1px solid ${({ theme }) => theme.border.color.light};
`;

const StyledTableHeaderCell = styled.th`
  padding: ${({ theme }) => theme.spacing(2)};
  text-align: left;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.font.color.light};
  font-size: ${({ theme }) => theme.font.size.xs};
`;

const StyledTableBody = styled.tbody``;

const StyledTableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.border.color.light};
  
  &:last-child {
    border-bottom: none;
  }
`;

const StyledTableCell = styled.td`
  padding: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.font.color.primary};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

const StyledCustomerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledCustomerAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.background.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.font.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-size: ${({ theme }) => theme.font.size.xs};
`;

const StyledCustomerName = styled.div`
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const StyledCustomerEmail = styled.div`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.font.color.light};
`;

const StyledValue = styled.div`
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

// Mock data for top customers
const mockData = [
  {
    id: '1',
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    value: 125000,
    deals: 3,
  },
  {
    id: '2',
    name: 'Globex Industries',
    email: 'info@globex.com',
    value: 98000,
    deals: 2,
  },
  {
    id: '3',
    name: 'Initech LLC',
    email: 'sales@initech.com',
    value: 87500,
    deals: 2,
  },
  {
    id: '4',
    name: 'Umbrella Corp',
    email: 'contact@umbrella.com',
    value: 76000,
    deals: 1,
  },
  {
    id: '5',
    name: 'Stark Industries',
    email: 'info@stark.com',
    value: 65000,
    deals: 1,
  },
];

export const TopCustomersCard = () => {
  return (
    <Card title="Top Customers">
      <StyledTable>
        <StyledTableHeader>
          <tr>
            <StyledTableHeaderCell>Customer</StyledTableHeaderCell>
            <StyledTableHeaderCell>Value</StyledTableHeaderCell>
            <StyledTableHeaderCell>Deals</StyledTableHeaderCell>
          </tr>
        </StyledTableHeader>
        <StyledTableBody>
          {mockData.map((customer) => (
            <StyledTableRow key={customer.id}>
              <StyledTableCell>
                <StyledCustomerInfo>
                  <StyledCustomerAvatar>
                    {customer.name.charAt(0)}
                  </StyledCustomerAvatar>
                  <div>
                    <StyledCustomerName>{customer.name}</StyledCustomerName>
                    <StyledCustomerEmail>{customer.email}</StyledCustomerEmail>
                  </div>
                </StyledCustomerInfo>
              </StyledTableCell>
              <StyledTableCell>
                <StyledValue>${customer.value.toLocaleString()}</StyledValue>
              </StyledTableCell>
              <StyledTableCell>
                <StyledValue>{customer.deals}</StyledValue>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </StyledTableBody>
      </StyledTable>
    </Card>
  );
}; 