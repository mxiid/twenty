# Twenty Dashboard

A dashboard module for Twenty CRM that provides visualizations and insights for sales and business data.

## Features

- Sales overview with key metrics
- Pipeline analysis with opportunity stages
- Sales performance tracking
- Sales forecasting
- Customer insights with top customers
- Recent activities tracking

## Development

To start the development server:

```bash
cd packages/twenty-dashboard
yarn dev
```

This will start the dashboard on port 3002.

## Integration

The dashboard is designed to be easily integrated with the main Twenty CRM application. It uses the same UI components and theme from `twenty-ui` to maintain a consistent look and feel.

## Data Integration

Currently, the dashboard uses mock data for demonstration purposes. To integrate with real data from the CRM:

1. Create API services to fetch data from the GraphQL API
2. Replace the mock data with real data from the API
3. Implement authentication and authorization

## Future Enhancements

- Real-time data updates
- Customizable dashboard layouts
- User-specific dashboards
- Export and sharing capabilities
- Advanced filtering options 