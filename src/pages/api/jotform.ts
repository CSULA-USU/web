import type { NextApiRequest, NextApiResponse } from 'next';
// import { cache } from 'react-cache';
import { Graduate } from 'types';

const FormIDs = {
  apida: 233465396205156,
  black: 233464461546156,
  pride: 233464501150142,
  nuestra: 233465206027148,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { id } = req.query;

  try {
    const formID = FormIDs[id as keyof typeof FormIDs];
    let data = await fetch(
      `https://api.jotform.com/form/${formID}/submissions?apiKey=fc4a91bbc9f53fd73d5934839ee8dcd1&limit=500`,
    );
    const jsonData = await data.json();
    // console.log(jsonData.content[7].answers[49].answer.first);
    const specificDataObj: Graduate[] = [];
    jsonData.content &&
      jsonData.content.forEach((submission: any) => {
        // if (id === 'nuestra') {
        const person = {
          name: {
            first: submission.answers[49]?.answer.first,
            last: submission.answers[49]?.answer.last,
            middle: submission.answers[49]?.answer.middle,
            prefix: submission.answers[49]?.answer.prefix,
            suffix: submission.answers[49]?.answer.suffix,
          },
          pronoun: submission.answers[122]?.answer,
          degree: submission.answers[58]?.answer,
          major: submission.answers[60]?.answer,
          minor: submission.answers[65]?.answer,
          certificate: submission.answers[64].answer,
          secondDegree: submission.answers[123].answer,
          secondMajor: submission.answers[115].answer,
          secondMinor: submission.answers[70].answer,
          secondCertificate: submission.answers[69].answer,
          acknowledgement: submission.answers[73].answer,
          fileUpload: submission.answers[127],
        };
        specificDataObj.push(person);
        console.log(specificDataObj);
      });
    res.status(200).json(specificDataObj);
  } catch (error) {
    console.error('Error fetching jotform data:', error);
    res.status(500).json({ error: 'Jotform Internal Server Error' });
  }
}
