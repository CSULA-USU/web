import type { NextApiRequest, NextApiResponse } from 'next';
import { UKrewStudent } from 'types';

const jotform = process.env.JOTFORM_SUBMISSIONS_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { user_id } = req.query;
  const formID = 243524728647061;

  await fetch(
    `https://api.jotform.com/form/${formID}/submissions?apiKey=${jotform}&limit=500`,
  ).then(async (data) => {
    if (!data.ok) {
      console.error('Error fetching jotform data:', data.text());
      res.status(500).json({ error: 'Jotform Internal Server Error' });
      return;
    }

    const jsonData = await data.json();
    let filteredUserSubmissions: UKrewStudent[] = jsonData?.content.filter(
      (userSubmission: any) => {
        // If student selected to opt in for the student card
        return userSubmission?.answers?.['7']?.answer?.toLowerCase() == 'yes';
      },
    );

    let student: UKrewStudent | undefined;
    let filteredUsers: UKrewStudent[] = filteredUserSubmissions.reduce(
      (uKrewStudents: UKrewStudent[], userSubmission: any) => {
        const questions = userSubmission?.answers;
        const uKrewStudent: UKrewStudent = {
          firstName: questions?.['3']?.answer?.first,
          middleName: questions?.['3']?.answer?.middle,
          lastName: questions?.['3']?.answer?.last,
          email: questions?.['4']?.answer,
          department: questions?.['6']?.answer,
          role: questions?.['8']?.answer,
          major: questions?.['11']?.answer,
          phoneNumber: questions?.['12']?.answer?.full,
          linkedIn: questions?.['18']?.answer,
          photoUpload: questions?.['19']?.answer,
          image: questions?.['20']?.answer,
          graduationSemester: questions?.['22']?.answer,
          graduationYear: questions?.['24']?.answer,
          portfolioLink: questions?.['25']?.answer,
          session: questions?.['26']?.answer,
        };

        const uKrewID = uKrewStudent.email?.split('@')[0];
        if (typeof user_id == 'string' && user_id == uKrewID) {
          // If the API request only wants one user, when the user is found, return the user.
          student = uKrewStudent;
        }

        uKrewStudents.push(uKrewStudent);
        return uKrewStudents;
      },
      [],
    );

    if (user_id) {
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json(`${user_id} does not exist.`);
      }
      return;
    }

    res.status(200).json(filteredUsers);
  });
}
