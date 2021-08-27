import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

export interface WidgetProps {
  title: string;
  children: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.spacing(2)}`,
  },
}));

const Widget = ({ title, children }: WidgetProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="button">{title}</Typography>

      <Box mt={2}>{children}</Box>
    </Paper>
  );
};

export default Widget;
