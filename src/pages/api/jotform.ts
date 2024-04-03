import type { NextApiResponse } from 'next';

type Person = {
  name: {
    first: string;
    last: string;
    middle: string;
    prefix: string;
    suffix: string;
  };
  pronoun: string;
  degree: string;
  major: string;
  minor: string;
  certificate: string;
  secondDegree: string;
  secondMajor: string;
  secondMinor: string;
  secondCertificate: string;
  acknowledgement: string;
  fileUpload: string;
};

export default async function handler(_req: any, res: NextApiResponse<any>) {
  try {
    let data = await fetch(
      `https://api.jotform.com/form/233465206027148/submissions?apiKey=fc4a91bbc9f53fd73d5934839ee8dcd1&limit=500`,
    );
    const jsonData = await data.json();
    const specificDataObj: Person[] = [];
    jsonData.content &&
      jsonData.content.forEach((submission: any) => {
        const person = {
          name: {
            first: submission.answers[49].answer.first,
            last: submission.answers[49].answer.last,
            middle: submission.answers[49].answer.middle,
            prefix: submission.answers[49].answer.prefix,
            suffix: submission.answers[49].answer.suffix,
          },
          pronoun: submission.answers[122],
          degree: submission.answers[58],
          major: submission.answers[60],
          minor: submission.answers[65],
          certificate: submission.answers[64],
          secondDegree: submission.answers[123],
          secondMajor: submission.answers[115],
          secondMinor: submission.answers[70],
          secondCertificate: submission.answers[69],
          acknowledgement: submission.answers[73],
          fileUpload: submission.answers[127],
        };
        specificDataObj.push(person);
      });
    res.status(200).json(specificDataObj);
  } catch (error) {
    console.error('Error fetching jotform data:', error);
    res.status(500).json({ error: 'Jotform Internal Server Error' });
  }
}
