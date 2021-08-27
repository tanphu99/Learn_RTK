import {
  Box,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  ChatBubble,
  ChatBubbleOutline,
  ChatRounded,
  PeopleAlt,
} from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import RankingStudentList from './components/RankingStudentList';
import StatisticItem from './components/StatisticsItem';
import Widget from './components/Widget';
import {
  dashboardAction,
  selectHighestMarkList,
  selectLoadingStatistics,
  selectLowestMarkList,
  selectRankingByCityList,
  selectStatistics,
} from './dashboardSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',

    marginTop: theme.spacing(1),
  },

  titleSection: {
    marginBottom: theme.spacing(1),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),

    width: '100%',
  },
}));

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectLoadingStatistics);
  const lowestStudentList = useAppSelector(selectLowestMarkList);
  const highestStudentList = useAppSelector(selectHighestMarkList);
  const statistics = useAppSelector(selectStatistics);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  const classes = useStyles();

  useEffect(() => {
    dispatch(dashboardAction.fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {/* Loading */}
      {loading && <LinearProgress className={classes.loading} />}

      {/* Statistic Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} xl={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            value={statistics.maleCount}
            label="male"
          />
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <StatisticItem
            icon={<ChatRounded fontSize="large" color="primary" />}
            value={statistics.femaleCount}
            label="female"
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <StatisticItem
            icon={<ChatBubble fontSize="large" color="primary" />}
            value={statistics.highMarkCount}
            label="mark >= 8"
          />
        </Grid>
        <Grid item xs={12} md={4} xl={3}>
          <StatisticItem
            icon={<ChatBubbleOutline fontSize="large" color="primary" />}
            value={statistics.lowMarkCount}
            label="mark <= 5"
          />
        </Grid>
      </Grid>

      {/* All Students Section */}
      <Box mt={4}>
        <Typography variant="h4" className={classes.titleSection}>
          All Students
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} xl={3}>
            <Widget title="Highest Student List">
              <RankingStudentList studentList={highestStudentList} />
            </Widget>
          </Grid>
          <Grid item xs={12} md={4} xl={3}>
            <Widget title="Lowest Student List">
              <RankingStudentList studentList={lowestStudentList} />
            </Widget>
          </Grid>
        </Grid>
      </Box>

      {/* Ranking by city */}
      <Box mt={4}>
        <Typography variant="h4" className={classes.titleSection}>
          Ranking by city
        </Typography>
        <Grid container spacing={2}>
          {rankingByCityList.map((ranking, idx) => (
            <Grid item key={idx} xs={12} md={4} xl={3}>
              <Widget title={`TP. ${ranking.cityName}`}>
                <RankingStudentList studentList={ranking.rankingList} />
              </Widget>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
