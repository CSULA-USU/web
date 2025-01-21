import axios from 'axios';
import { useEffect, useState } from 'react';
import { UKrewStudent } from 'types';

export default function Directory() {
  const [uKrewStudents, setUKrewStudents] = useState<
    UKrewStudent[] | undefined
  >(undefined);

  useEffect(() => {
    const fetchUKrewStudents = async () => {
      await axios.get('/api/jotformUKrew').then((res) => {
        setUKrewStudents(res.data);
      });
    };
    fetchUKrewStudents();
  }, []);

  return (
    <>
      Hello Students!
      {uKrewStudents?.map((uKrewStudent: UKrewStudent) => {
        return (
          <div key={uKrewStudent.email}>
            <p>First Name: {uKrewStudent.firstName}</p>
            <p>Last Name: {uKrewStudent.lastName}</p>
            <p>Email: {uKrewStudent.email}</p>
            <p>Department: {uKrewStudent.department}</p>
            <p>Major: {uKrewStudent.major}</p>
            <p>Phone Number: {uKrewStudent.phoneNumber}</p>
            {/* <p>Photo: {uKrewStudent.photoUpload}</p> */}
            <p>Session: {uKrewStudent.session}</p>
            <hr />
          </div>
        );
      })}
    </>
  );
}
