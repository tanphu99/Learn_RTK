import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { apiGetStudentsById } from 'api/studentApi';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

const AddEditPage = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    // IFFE
    (async () => {
      try {
        const data: Student = await apiGetStudentsById(studentId);

        setStudent(data);
      } catch (error) {
        console.log('failed to fetch data', error);
      }
    })();
  }, [studentId]);

  console.log('found stu', student);

  const initialValue: Student = {
    name: '',
    age: '',
    mark: '',
    gender: '',
    city: '',
    ...student,
  } as Student;

  const handleStudentSubmitForm = () => {};

  return (
    <Box>
      <Link to="/admin/students">
        <Typography
          variant="caption"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>

      <Typography variant="h4">
        {!!studentId ? 'Edit Student Info' : 'Add new student'}
      </Typography>

      {(!Boolean(studentId) || Boolean(student)) && (
        <StudentForm
          initialValue={initialValue}
          onSubmit={handleStudentSubmitForm}
        />
      )}
    </Box>
  );
};

export default AddEditPage;
