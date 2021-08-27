import { Box, Paper, Typography, makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';

export interface StatisticItemProps {
  icon: ReactElement;
  label: string;
  value: string | number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
  },
}));

const StatisticItem = ({ icon, label, value }: StatisticItemProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>

        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
};

export default StatisticItem;
