import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'src/redux/hooks';
import { selectAnalyticsState } from 'src/redux/slices/AnalyticsSlice';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import { faker } from '@faker-js/faker';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { selectUsersState } from 'src/redux/slices/UsersSlice';
import { useTranslation } from 'react-i18next';

export default function AppView() {
  const { t } = useTranslation();
  const analyticsState = useAppSelector(selectAnalyticsState);
  const { data } = analyticsState;
  const usersState = useAppSelector(selectUsersState);
  const [barbersPerformanceFilter, setBarbersPerformanceFilter] = useState('byRev');
  const [selectedCustomer, setSelectedCustomer] = useState(usersState.data[0].id);
  const handleChangeBarbersPerformance = (event: SelectChangeEvent) => {
    setBarbersPerformanceFilter(event.target.value as string);
  };

  const handleChangeSelectCustomer = (event: SelectChangeEvent) => {
    setSelectedCustomer(event.target.value as string);
  };
  const currentDate = `${new Date().getFullYear()}-0${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
  if (!data) {
    return <div>Loading...</div>; // or a loader component
  }

  const {
    numberOfUser,
    numberOfCustomers,
    numberOfBarbers,
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
  console.log([currentDate]);
  console.log(bookingTrends.dailyBookings[currentDate]);
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
            title={t('numberOfUsers')}
            total={numberOfUser ? numberOfUser : 0}
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
                  name: t('DailyBookings'),
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
            title={t('customerInsight')}
            chart={{
              categories: serviceRatings
                ? serviceRatings.slice(0, 5).map((rating) => rating.serviceName)
                : [],
              series: [
                {
                  name: t('avRtng'),
                  data: serviceRatings
                    ? serviceRatings.slice(0, 5).map((rating) => rating.averageRating)
                    : [],
                },
                {
                  name: t('numOfRev'),
                  data: serviceRatings
                    ? serviceRatings.slice(0, 5).map((rating) => rating.totalRatings)
                    : [],
                },
              ],
            }}
            subheader={undefined}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <Select value={selectedCustomer} onChange={handleChangeSelectCustomer}>
            {usersState.data
              ?.filter((u) => u.role === 'CUSTOMER')
              .map((u) => <MenuItem value={u.id}>{u.name}</MenuItem>)}
          </Select>
        </Grid>
      </Grid>
    </Container>
  );
}
