import type { NextApiRequest, NextApiResponse } from 'next';
import { Graduate } from 'types';
import CGCData from '../../data/cgc-data.json';

const jotform = process.env.JOTFORM_SUBMISSIONS_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { id } = req.query;
    let formID;
    switch (id) {
      case 'nuestra':
        formID = process.env.NUESTRA_GRAD_FORM_ID;
        break;
      case 'black':
        formID = process.env.BLACK_GRAD_FORM_ID;
        break;
      case 'apida':
        formID = process.env.APIDA_GRAD_FORM_ID;
        break;
      case 'pride':
        formID = process.env.PRIDE_GRAD_FORM_ID;
        break;
      default:
        console.log('no cgc id detected at this time');
    }
    let data = await fetch(
      `https://api.jotform.com/form/${formID}/submissions?apiKey=${jotform}&limit=500`,
    );
    const nativeData = await CGCData['grad-data'].native;
    const jsonData = await data.json();
    const specificDataObj: Graduate[] = [];
    if (id === 'native') {
      nativeData &&
        nativeData.forEach((submission: any) => {
          let person = {
            fullName: {
              firstName: submission.firstName,
              lastName: submission.lastName,
              pretty: (
                submission.firstName + submission.lastName
              ).toLowerCase(),
            },
            degree: submission.degree,
            major: submission.major,
            pronouns: submission.tribe,
            acknowledgement: submission.acknowledgement,
          };
          specificDataObj.push(person);
        });
    } else {
      jsonData.content &&
        jsonData.content.forEach((submission: any) => {
          let person;
          if (id === 'nuestra') {
            person = {
              fullName: {
                firstName: submission.answers[49]?.answer.first,
                lastName: submission.answers[49]?.answer.last,
                middleName: submission.answers[49]?.answer.middle,
                prefix: submission.answers[49]?.answer.prefix,
                suffix: submission.answers[49]?.answer.suffix,
                pretty: submission.answers[49]?.prettyFormat,
              },
              pronouns: submission.answers[122]?.answer,
              degree: submission.answers[58]?.answer,
              major: submission.answers[60]?.answer,
              minor: submission.answers[65]?.answer,
              certificate: submission.answers[64].answer,
              secondDegree: submission.answers[123].answer?.[0],
              secondMajor: submission.answers[115].answer,
              secondMinor: submission.answers[70].answer,
              secondCertificate: submission.answers[69].answer,
              acknowledgement: submission.answers[73].answer,
              img: submission.answers[127].answer[0],
            };
          } else if (id === 'black') {
            person = {
              fullName: {
                firstName: submission.answers[49]?.answer.first,
                lastName: submission.answers[49]?.answer.last,
                middleName: submission.answers[49]?.answer.middle,
                prefix: submission.answers[49]?.answer.prefix,
                suffix: submission.answers[49]?.answer.suffix,
                pretty: submission.answers[49]?.prettyFormat,
              },
              pronouns: submission.answers[122].answer,
              degree: submission.answers[58]?.answer,
              major: submission.answers[60]?.answer,
              minor: submission.answers[65]?.answer,
              certificate: submission.answers[64].answer,
              secondDegree: submission.answers[123].answer?.[0],
              secondMajor: submission.answers[115].answer,
              secondMinor: submission.answers[70].answer,
              secondCertificate: submission.answers[69].answer,
              acknowledgement: submission.answers[73].answer,
              img: submission.answers[124].answer[0],
            };
          } else if (id === 'apida') {
            person = {
              fullName: {
                firstName: submission.answers[49]?.answer.first,
                lastName: submission.answers[49]?.answer.last,
                middleName: submission.answers[49]?.answer.middle,
                prefix: submission.answers[49]?.answer.prefix,
                suffix: submission.answers[49]?.answer.suffix,
                pretty: submission.answers[49]?.prettyFormat,
              },
              pronouns: submission.answers[122].answer,
              degree: submission.answers[58]?.answer,
              major: submission.answers[60]?.answer,
              minor: submission.answers[65]?.answer,
              certificate: submission.answers[64].answer,
              secondDegree: submission.answers[123].answer?.[0],
              secondMajor: submission.answers[115].answer,
              secondMinor: submission.answers[70].answer,
              secondCertificate: submission.answers[69].answer,
              acknowledgement: submission.answers[73].answer,
              img: submission.answers[125].answer[0],
            };
          } else {
            // pride grad submissions
            person = {
              fullName: {
                firstName: submission.answers[49]?.answer.first,
                lastName: submission.answers[49]?.answer.last,
                middleName: submission.answers[49]?.answer.middle,
                prefix: submission.answers[49]?.answer.prefix,
                suffix: submission.answers[49]?.answer.suffix,
                pretty: submission.answers[49]?.prettyFormat,
              },
              pronouns: submission.answers[120].answer,
              degree: submission.answers[58]?.answer,
              major: submission.answers[60]?.answer,
              minor: submission.answers[65]?.answer,
              certificate: submission.answers[64].answer,
              secondDegree: submission.answers[122].answer?.[0],
              secondMajor: submission.answers[71].answer,
              secondMinor: submission.answers[70].answer,
              secondCertificate: submission.answers[69].answer,
              acknowledgement: submission.answers[73].answer,
              img: submission.answers[123].answer[0],
            };
          }
          specificDataObj.push(person);
        });
    }
    res.status(200).json(specificDataObj);
  } catch (error) {
    console.error('Error fetching jotform data:', error);
    res.status(500).json({ error: 'Jotform Internal Server Error' });
  }
}
