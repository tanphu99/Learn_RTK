import { Box, makeStyles } from '@material-ui/core';
import { Header, Sidebar } from 'components/Common';
import Dashboard from 'features/dashboard';
import StudentFeature from 'features/students';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '250px auto',
    gridTemplateAreas: `"header header" "sidebar main"`,

    minHeight: '100vh',
  },

  header: {
    gridArea: 'header',
  },

  sidebar: {
    gridArea: 'sidebar',
    backgroundColor: theme.palette.background.paper,

    borderRight: `1px solid ${theme.palette.divider}`,
  },

  main: {
    gridArea: 'main',
    backgroundColor: theme.palette.background.paper,
    padding: `${theme.spacing(2, 3)}`,
  },
}));

export const AdminLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.main}>
        <Switch>
          <Route path="/admin/dashboard">
            <Dashboard />
          </Route>
          <Route path="/admin/students">
            <StudentFeature />
          </Route>
        </Switch>
      </Box>
    </div>
  );
};
