import {
  Box,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { apiRemoveStudent } from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityMap, selectListCity } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import StudentFilters from '../components/StudentFilters';
import StudentList from '../components/StudentList';
import {
  selectFilter,
  selectListStudent,
  selectLoading,
  selectPagination,
  studentAction,
} from '../studentSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',

    paddingTop: theme.spacing(1),
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),

    width: '100%',
  },
}));

const ListPage = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const listStudent = useAppSelector(selectListStudent);
  const pagination = useAppSelector(selectPagination);
  const loading = useAppSelector(selectLoading);
  const filter = useAppSelector(selectFilter);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectListCity);

  useEffect(() => {
    dispatch(studentAction.fetchListStudent(filter));
  }, [dispatch, filter]);

  const handleChangePage = (e: any, page: number) => {
    dispatch(studentAction.setFilter({ ...filter, _page: page }));
  };

  const handleChangeSearch = (newFilter: ListParams) => {
    dispatch(studentAction.setFilterWithDebounce(newFilter));
  };

  const handleChangeFilter = (newFilter: ListParams) => {
    dispatch(studentAction.setFilter(newFilter));
  };

  const handleDeleteStudent = async (student: Student) => {
    try {
      await apiRemoveStudent(student.id || '');

      const newFilter: ListParams = { ...filter };

      dispatch(studentAction.fetchListStudent(newFilter));
    } catch (error) {
      console.log('Failed to fetch student', error);
    }
  };

  const handleEditStudent = (student: Student) => {
    history.push(`${match.url}/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      {/* Loading Page */}
      {loading && <LinearProgress className={classes.loading} />}

      {/* Title Page */}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>

        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            // onClick={handleClickAddNew}
          >
            Add new student
          </Button>
        </Link>
      </Box>

      {/* Filter Page */}
      <Box mb={3}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onSearchChange={handleChangeSearch}
          onSearch={handleChangeFilter}
        />
      </Box>

      {/* Student List */}
      <StudentList
        cityMap={cityMap}
        studentList={listStudent}
        onDelete={handleDeleteStudent}
        onEdit={handleEditStudent}
      />

      {/* Pagination */}
      <Box my={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={filter._page}
          color="primary"
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default ListPage;
