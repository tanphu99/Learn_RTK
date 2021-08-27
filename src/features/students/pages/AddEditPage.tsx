import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import {
  apiAddStudent,
  apiGetStudentsById,
  apiUpdateStudent,
} from 'api/studentApi';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { toast } from 'react-toastify';

const AddEditPage = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [student, setStudent] = useState<Student>();
  const history = useHistory();

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

  const initialValue: Student = {
    name: '',
    age: '',
    mark: '',
    gender: '',
    city: '',
    ...student,
  } as Student;

  const handleStudentSubmitForm = async (student: Student) => {
    if (!!studentId) {
      await apiUpdateStudent(student);
    } else {
      await apiAddStudent(student);
    }

    toast.success('Save data successfully!');

    history.push('/admin/students');
  };

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
