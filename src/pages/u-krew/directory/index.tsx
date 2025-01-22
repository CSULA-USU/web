import axios from 'axios';
import { useEffect, useState } from 'react';
import { UKrewStudent } from 'types';
// import { Image } from 'components';

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
            {/* <Image src={uKrewStudent.photoUpload || ''} width="300px"></Image> */}
            <p>First Name: {uKrewStudent.firstName}</p>
            <p>Last Name: {uKrewStudent.lastName}</p>
            <a href={uKrewStudent.email?.split('@')[0]}>
              Student Card: {uKrewStudent.email?.split('@')[0]}
            </a>
            <p>Email: {uKrewStudent.email}</p>
            <p>Department: {uKrewStudent.department}</p>
            <p>Major: {uKrewStudent.major}</p>
            <p>Phone Number: {uKrewStudent.phoneNumber}</p>
            <p>Session: {uKrewStudent.session}</p>
            <hr />
          </div>
        );
      })}
    </>
  );
}
