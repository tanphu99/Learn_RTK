import { Button, Grid, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import { ChangeEvent, useRef } from 'react';

export interface StudentFiltersProps {
  filter: ListParams;
  cityList: City[];
  onSearch?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

const StudentFilters = ({
  filter,
  cityList,
  onSearch,
  onSearchChange,
}: StudentFiltersProps) => {
  const refSearch = useRef<HTMLInputElement>();

  const handleChangeSeach = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  };

  const handleChangeFilter = (
    e: ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    if (!onSearch) return;

    const newFilter: ListParams = {
      ...filter,
      city: e.target.value || undefined,
      _page: 1,
    };

    onSearch(newFilter);
  };

  const handleChangeSort = (
    e: ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    if (!onSearch) return;

    const [_sort, _order] = (e.target.value as string).split('.');

    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };

    onSearch(newFilter);
  };

  const handleClearFilter = () => {
    if (!onSearch) return;
    const newFilter: ListParams = {
      ...filter,
      _sort: undefined,
      _order: undefined,
      name_like: undefined,
      city: undefined,
    };

    if (refSearch.current) {
      refSearch.current.value = '';
    }

    onSearch(newFilter);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel htmlFor="search by name">Search by name</InputLabel>
          <OutlinedInput
            id="search by name"
            label="Search by name"
            endAdornment={<Search />}
            onChange={handleChangeSeach}
            inputRef={refSearch}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel id="FilterByCity">Filter By City</InputLabel>
          <Select
            labelId="FilterByCity"
            id="demo-simple-select-outlined"
            value={filter.city || ''}
            onChange={handleChangeFilter}
            label="Filter By City"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {cityList.map((city, idx) => (
              <MenuItem key={idx} value={city.code}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel id="SortBy">Sort</InputLabel>
          <Select
            labelId="SortBy"
            id="demo-simple-select-outlined"
            value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
            onChange={handleChangeSort}
            label="Sort"
          >
            <MenuItem value="">
              <em>No sort</em>
            </MenuItem>
            <MenuItem value="name.asc">Name ASC</MenuItem>
            <MenuItem value="name.desc">Name DESC</MenuItem>
            <MenuItem value="mark.asc">Mark ASC</MenuItem>
            <MenuItem value="mark.desc">Mark ASC</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} lg={1}>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleClearFilter}
        >
          Clear
        </Button>
      </Grid>
    </Grid>
  );
};

export default StudentFilters;
