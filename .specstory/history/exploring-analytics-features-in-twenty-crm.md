## SpecStory

## Exploring Analytics Features in Twenty CRM (2/10/2025, 3:03:30 PM)

_**User**_

@Codebase does twenty have any dashboarding or analytics?

---

_**Assistant**_

Based on the provided codebase context, Twenty does have analytics capabilities. Here's what I found:

1. **Analytics Graph Component**
Twenty has an analytics graph component that can visualize different types of data:

```32:44:packages/twenty-front/src/modules/analytics/components/AnalyticsActivityGraph.tsx
export const AnalyticsActivityGraph = ({
  recordId,
  endpointName,
}: AnalyticsActivityGraphProps) => {
  const [analyticsGraphData, setAnalyticsGraphData] = useRecoilComponentStateV2(
    analyticsGraphDataComponentState,
  );
  const theme = useTheme();

  const [windowLengthGraphOption, setWindowLengthGraphOption] = useState<
    '7D' | '1D' | '12H' | '4H'
  >('7D');

```


2. **Types of Analytics Available**:
- Webhook Analytics
- Pageviews Analytics
- Users Analytics
- Serverless Function Analytics:
  - Duration
  - Success Rate
  - Error Count

This can be seen in:

```1:10:packages/twenty-front/src/modules/analytics/constants/AnalyticsGraphTitleMap.ts
import { AnalyticsTinybirdJwtMap } from '~/generated-metadata/graphql';

export const ANALYTICS_GRAPH_TITLE_MAP: AnalyticsTinybirdJwtMap = {
  getWebhookAnalytics: 'Activity',
  getPageviewsAnalytics: 'Page Views',
  getUsersAnalytics: 'Users',
  getServerlessFunctionDuration: 'Duration (ms)',
  getServerlessFunctionSuccessRate: 'Success Rate (%)',
  getServerlessFunctionErrorCount: 'Error Count',
};
```


3. **Backend Support**:
The analytics functionality is powered by Tinybird (a real-time analytics platform) as shown in:

```9:21:packages/twenty-server/src/engine/core-modules/analytics/analytics.module.ts
const TINYBIRD_BASE_URL = 'https://api.eu-central-1.aws.tinybird.co/v0';

@Module({
  providers: [AnalyticsResolver, AnalyticsService],
  imports: [
    JwtModule,
    HttpModule.register({
      baseURL: TINYBIRD_BASE_URL,
    }),
  ],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
```


4. **Time Range Options**:
Users can view analytics data for different time periods:
- Last 7 days
- Today
- Last 12 hours
- Last 4 hours

As defined in:

```1:6:packages/twenty-front/src/modules/analytics/constants/AnalyticsGraphOptionMap.ts
export const ANALYTICS_GRAPH_OPTION_MAP = {
  '7D': { granularity: 'day' },
  '1D': { granularity: 'hour' },
  '12H': { granularity: 'hour' },
  '4H': { granularity: 'hour' },
};
```


5. **Analytics Toggle**:
Analytics can be enabled/disabled through a configuration state:

```1:6:packages/twenty-front/src/modules/client-config/states/isAnalyticsEnabledState.ts
import { createState } from '@ui/utilities/state/utils/createState';

export const isAnalyticsEnabledState = createState<boolean>({
  key: 'isAnalyticsEnabled',
  defaultValue: false,
});
```


The analytics features seem to focus primarily on system and usage metrics rather than business intelligence dashboards. The graphs appear to be used for monitoring system performance, user activity, and integration health rather than providing CRM-specific analytics or custom dashboards for business metrics.

---

_**User**_

no, like CRM analytics or dashboarding for admin to get an overview of multiple user performance 

---

_**Assistant**_

Based on the codebase context, it appears that Twenty does not currently have built-in CRM analytics or admin dashboarding features for tracking user/sales performance metrics like:

- Sales performance dashboards
- Pipeline analytics
- Deal conversion rates
- User activity/performance comparisons
- Custom CRM metric dashboards
- Team performance overview

While Twenty does have some system analytics (like pageviews, webhooks, etc.), it seems to lack dedicated CRM/business analytics features that would help admins track and compare user/team performance metrics.

If you're looking to add such functionality, you might want to:

1. Create new analytics modules focused on CRM metrics
2. Add visualization components for sales/pipeline data
3. Build admin dashboard views for team performance
4. Implement data aggregation for key CRM metrics

Would you like me to elaborate on any of these potential additions or help sketch out what such features might look like in Twenty's architecture?

---

_**User**_

@Codebase is there any workspace member management on twenty? like what if i want an admin view with all the data but my workspace member only sees the leads assigned to them

---

_**Assistant**_

Based on the codebase analysis, Twenty does have workspace member management capabilities, but they're currently limited. Here's what exists:

1. **Workspace Members**:
The `WorkspaceMemberWorkspaceEntity` shows that workspace members have basic attributes like:

```73:84:packages/twenty-server/src/modules/workspace-member/standard-objects/workspace-member.workspace-entity.ts
@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.workspaceMember,
  namePlural: 'workspaceMembers',
  labelSingular: msg`Workspace Member`,
  labelPlural: msg`Workspace Members`,
  description: msg`A workspace member`,
  icon: STANDARD_OBJECT_ICONS.workspaceMember,
  labelIdentifierStandardId: WORKSPACE_MEMBER_STANDARD_FIELD_IDS.name,
})
@WorkspaceIsSystem()
@WorkspaceIsNotAuditLogged()
export class WorkspaceMemberWorkspaceEntity extends BaseWorkspaceEntity {
```


2. **Admin Panel**:
There is an admin panel that shows workspace information and user management:

```128:192:packages/twenty-front/src/modules/settings/admin-panel/components/SettingsAdminContent.tsx
    })) ?? [];

  const renderWorkspaceContent = () => {
    if (!activeWorkspace) return null;

    return (
      <>
        <H2Title title={activeWorkspace.name} description={'Workspace Name'} />
        <H2Title
          title={`${activeWorkspace.totalUsers} ${
            activeWorkspace.totalUsers > 1 ? 'Users' : 'User'
          }`}
          description={'Total Users'}
        />
        {canImpersonate && (
          <Button
            Icon={IconUser}
            variant="primary"
            accent="blue"
            title={'Impersonate'}
            onClick={() => handleImpersonate(userId, activeWorkspace.id)}
            disabled={
              isImpersonateLoading ||
              activeWorkspace.allowImpersonation === false
            }
            dataTestId="impersonate-button"
          />
        )}

        {canManageFeatureFlags && (
          <StyledTable>
            <TableRow
              gridAutoColumns="1fr 100px"
              mobileGridAutoColumns="1fr 80px"
            >
              <TableHeader>Feature Flag</TableHeader>
              <TableHeader align="right">Status</TableHeader>
            </TableRow>

            {activeWorkspace.featureFlags.map((flag) => (
              <TableRow
                gridAutoColumns="1fr 100px"
                mobileGridAutoColumns="1fr 80px"
                key={flag.key}
              >
                <TableCell>{flag.key}</TableCell>
                <TableCell align="right">
                  <Toggle
                    value={flag.value}
                    onChange={(newValue) =>
                      handleFeatureFlagUpdate(
                        activeWorkspace.id,
                        flag.key,
                        newValue,
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </StyledTable>
        )}
      </>
    );
  };
```


However, there doesn't seem to be built-in functionality for:
- Record-level access control
- Lead assignment visibility restrictions
- Role-based access control (RBAC)
- Admin vs regular member permissions (besides feature flag management)

The current admin features mainly focus on:
- Viewing workspace members
- Managing feature flags
- Basic user information
- Impersonation capabilities

If you need to restrict workspace members to only see their assigned leads, you would need to:

1. Add a role system to workspace members
2. Implement record-level access control
3. Modify the queries to filter based on assignments
4. Add admin override capabilities

This functionality isn't currently built into Twenty's core features. The closest thing is the workspace member system, but it doesn't handle granular permissions or record visibility rules.

Would you like me to elaborate on how you could implement such a system in Twenty?

---



---

