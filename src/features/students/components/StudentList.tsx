import { Box, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DialogNotification from 'components/Common/DialogNotification';
import { City, Student } from 'models';
import React, { useState } from 'react';
import { captializeString, getMarkColor } from 'utils';

export interface StudentListProps {
  studentList: Student[];
  onEdit?: (student: Student) => void;
  onDelete?: (student: Student) => void;
  cityMap: { [key: string]: City };
}

export default function StudentList({
  studentList,
  cityMap,
  onEdit,
  onDelete,
}: StudentListProps) {
  const [toggleDialog, setToggleDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const handleClickRemove = (student: Student) => {
    setToggleDialog(true);
    setSelectedStudent(student);
  };

  const handleCloseDialog = () => {
    setToggleDialog(false);
  };

  const handleConfirmDialog = () => {
    if (!onDelete) return;

    onDelete?.(selectedStudent as Student);
    setToggleDialog(false);
  };

  const handleClickEdit = (student: Student) => {
    if (!onEdit) return;

    onEdit(student);
  };

  return (
    <>
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student, idx) => (
              <TableRow key={idx}>
                <TableCell width={310}>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{captializeString(student.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(student.mark)} fontWeight="bold">
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>

                <TableCell align="right">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleClickEdit(student)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleClickRemove(student)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {toggleDialog && (
        <DialogNotification
          titleNoti="Remove a student ? "
          contentNoti={`Are you sure to delete "${selectedStudent?.name}". This cannot undo ? `}
          toggleDialog={toggleDialog}
          handleCloseDialog={handleCloseDialog}
          handleConfirmDialog={handleConfirmDialog}
        />
      )}
    </>
  );
}
