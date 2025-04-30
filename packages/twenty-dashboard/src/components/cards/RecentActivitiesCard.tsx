import styled from '@emotion/styled';
import { Card } from './Card';

const StyledActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const StyledActivityItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.background.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.font.color.primary};
  flex-shrink: 0;
`;

const StyledActivityContent = styled.div`
  flex: 1;
`;

const StyledActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StyledActivityTitle = styled.div`
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.font.color.primary};
`;

const StyledActivityTime = styled.div`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.font.color.light};
`;

const StyledActivityDescription = styled.div`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.font.color.secondary};
`;

const StyledActivityMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(1)};
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.font.color.light};
`;

const StyledActivityMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

// Mock data for recent activities
const mockData = [
  {
    id: '1',
    type: 'email',
    title: 'Email Sent',
    description: 'Follow-up email sent to Acme Corporation regarding the proposal.',
    time: '2 hours ago',
    user: 'John Doe',
    company: 'Acme Corporation',
  },
  {
    id: '2',
    type: 'meeting',
    title: 'Meeting Scheduled',
    description: 'Product demo scheduled with Globex Industries for next week.',
    time: '5 hours ago',
    user: 'Jane Smith',
    company: 'Globex Industries',
  },
  {
    id: '3',
    type: 'note',
    title: 'Note Added',
    description: 'Added notes from the call with Initech LLC about their requirements.',
    time: '1 day ago',
    user: 'John Doe',
    company: 'Initech LLC',
  },
  {
    id: '4',
    type: 'task',
    title: 'Task Completed',
    description: 'Prepared and sent the revised proposal to Umbrella Corp.',
    time: '2 days ago',
    user: 'Jane Smith',
    company: 'Umbrella Corp',
  },
];

// Icons for different activity types
const getActivityIcon = (type: string) => {
  switch (type) {
    case 'email':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'meeting':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'note':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'task':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
};

export const RecentActivitiesCard = () => {
  return (
    <Card title="Recent Activities">
      <StyledActivityList>
        {mockData.map((activity) => (
          <StyledActivityItem key={activity.id}>
            <StyledActivityIcon>{getActivityIcon(activity.type)}</StyledActivityIcon>
            <StyledActivityContent>
              <StyledActivityHeader>
                <StyledActivityTitle>{activity.title}</StyledActivityTitle>
                <StyledActivityTime>{activity.time}</StyledActivityTime>
              </StyledActivityHeader>
              <StyledActivityDescription>
                {activity.description}
              </StyledActivityDescription>
              <StyledActivityMeta>
                <StyledActivityMetaItem>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {activity.user}
                </StyledActivityMetaItem>
                <StyledActivityMetaItem>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10H9M7 14H13M17 14H17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {activity.company}
                </StyledActivityMetaItem>
              </StyledActivityMeta>
            </StyledActivityContent>
          </StyledActivityItem>
        ))}
      </StyledActivityList>
    </Card>
  );
}; 