import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'src/redux/hooks';
import { selectBarberAnalyticsState } from 'src/redux/slices/BarberAnalyticsSlice'; // Update the import path accordingly

import AppWidgetSummary from '../app-widget-summary';
import AppWebsiteVisits from '../app-website-visits';
import AppCurrentVisits from '../app-current-visits';
import AppConversionRates from '../app-conversion-rates';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AppCurrentSubject from '../app-current-subject';

export default function BarberAnalyticsView() {
  const { t } = useTranslation();
  const analyticsState = useAppSelector(selectBarberAnalyticsState);
  const { data } = analyticsState;

  const [barbersPerformanceFilter, setBarbersPerformanceFilter] = useState('byRev');

  const handleChangeBarbersPerformance = (event: SelectChangeEvent) => {
    setBarbersPerformanceFilter(event.target.value as string);
  };

  if (!data) {
    return <div>Loading...</div>; // or a loader component
  }

  const {
    numberOfCustomers,
    totalSales,
    monthlySales,
    weeklySales,
    topServices,
    customerInsights,
    serviceRatings,
    bookingTrends,
    barbersPerformance,
    serviceGenderTypes,
  } = data;

  const currentDate = `${new Date().getFullYear()}-0${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t('welcome')}
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={t('monthlySales')}
            total={
              monthlySales
                ? monthlySales[`${new Date().getFullYear()}-${new Date().getMonth() + 1}`]
                : 0
            }
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            sx={undefined}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={t('numberOfCustomers')}
            total={numberOfCustomers ? numberOfCustomers : 0}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            sx={undefined}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={t('totalSales')}
            total={totalSales ? totalSales : 0}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
            sx={undefined}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={t('dailyBookings')}
            total={bookingTrends.dailyBookings[currentDate]}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
            sx={undefined}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title={t('curveChart')}
            subheader={t('curveChartSubHeader')}
            chart={{
              colors: ['#91fa34', '#34dcfa', '#7934fa'],
              labels: bookingTrends?.dailyBookings ? Object.keys(bookingTrends.dailyBookings) : [],
              series: [
                {
                  name: t('weeklyBookings'),
                  type: 'area',
                  fill: 'gradient',
                  data: bookingTrends?.weeklyBookings
                    ? Object.values(bookingTrends.weeklyBookings)
                    : [],
                },
                {
                  name: t('monthlyBookings'),
                  type: 'area',
                  fill: 'gradient',
                  data: bookingTrends?.monthlyBookings
                    ? Object.values(bookingTrends.monthlyBookings)
                    : [],
                },
                {
                  name: t('dailyBookings'),
                  type: 'area',
                  fill: 'gradient',
                  data: bookingTrends?.dailyBookings
                    ? Object.values(bookingTrends.dailyBookings)
                    : [],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title={t('pieChart')}
            subheader={t('pieChartSubHeader')}
            chart={{
              series: serviceGenderTypes
                ? serviceGenderTypes.map((type) => ({
                    label: type.genderType.toLocaleLowerCase() + 's',
                    value: type.count,
                  }))
                : [],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <Select value={barbersPerformanceFilter} onChange={handleChangeBarbersPerformance}>
            <MenuItem value={'byRev'}>{t('byRev')}</MenuItem>
            <MenuItem value={'byRate'}>{t('byRtng')}</MenuItem>
            <MenuItem value={'ByBkCnt'}>{t('byBkg')}</MenuItem>
            <MenuItem value={'ByRvCnt'}>{t('byRvCnt')}</MenuItem>
          </Select>
          <AppConversionRates
            title={t('barbersPerformanceTitle')}
            subheader={t('barbersPerformanceSubheader')}
            chart={{
              series: barbersPerformance
                ? barbersPerformance.map((insight) => ({
                    label: insight.name,
                    value:
                      barbersPerformanceFilter === 'byRev'
                        ? insight.totalRevenue
                        : barbersPerformanceFilter === 'byRate'
                        ? insight.averageRating
                        : barbersPerformanceFilter === 'ByBkCnt'
                        ? insight.totalBookings
                        : insight.totalReviews,
                  }))
                : [],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title={t('serviceRatingsTitle')} // Adjust the title according to your needs
            chart={{
              categories: serviceRatings
                ? serviceRatings.slice(0, 5).map((rating) => rating.serviceName)
                : [],
              series: [
                {
                  name: t('averageRating'),
                  data: serviceRatings
                    ? serviceRatings.slice(0, 5).map((rating) => rating.averageRating)
                    : [],
                },
                {
                  name: t('totalRatings'),
                  data: serviceRatings
                    ? serviceRatings.slice(0, 5).map((rating) => rating.totalRatings)
                    : [],
                },
              ],
            }}
            subheader={undefined}
          />
        </Grid>
        {/* Add more grid items here as needed */}
      </Grid>
    </Container>
  );
}
