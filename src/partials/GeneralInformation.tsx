import { Divider, FluidContainer, Typography } from 'components';
import { Spaces } from 'theme';

const sections = [
  {
    title: 'U-SU Guidelines For Public Records Access',
    body: [
      'Direct your requests to the U-SU Executive Director. At the direction of the U-SU Executive Director, the staff designees will facilitate the response to public records requests. Mail your request to the Executive Director, University-Student Union, 5154 State University Dr. U-SU 306, Los Angeles, CA 90032 or call for questions call 323-343-2450.',
    ],
  },
  {
    title: 'Records Defined',
    body: [
      '"Records" include any writing owned, used or maintained by the department in the conduct of its official business. Writings include information recorded or stored on paper, computers, email, or audio or visual tapes.',
    ],
  },
  {
    title: 'Identifying Records',
    body: [
      'To assist U-SU staff in providing records promptly, we ask that requesters provide specific information about the records they seek. When a record cannot be identified by name, we will ask the requester to be as specific as possible in describing the record.',
    ],
  },
  {
    title: 'Inspection Of Public Records',
    body: [
      "Public records maintained by U-SU shall be available for inspection during the department's regular business hours. Members of the public or the U-SU are not required to give notice in order to inspect public records at the U-SU office during normal working hours. However, if the request requires the retrieval, review, or redaction of records, this may require additional time for locating and retrieving the information (i.e. archived records). If this is the case, a mutually agreeable time will be established for inspection of the records. Requests for financial statements, public records guidelines, and department publications, can be found in the links above.",
    ],
  },
  {
    title: 'Processing Requests For Copies Of Records',
    body: [
      'When a copy of a record is requested, and the record cannot be produced immediately, the U-SU Administration Office in conjunction with the U-SU Executive Director will determine, within 10 business calendar days after receipt of the request, whether it can comply with the request. If the U-SU Administration Office cannot meet the 10-day requirement, she/he/they shall promptly inform the requester of its decision and the reasons for the decision. The initial 10-day period may be extended for up to an additional 14 days, if the department is required to consult with another agency having a substantial interest in the request; if additional time is needed to search for documents from field locations; or if the request is voluminous, etc. The U-SU Administration Office will provide requested records as soon as possible. If immediate disclosure is not possible, the department will provide an estimated date of when the records will be available.',
    ],
  },
  {
    title: 'Copying Fees',
    body: [
      "Currently, the U-SU Administration Office only charges the direct cost of duplication when it provides copies of hardcopy records to the public. The current costs, per copy, for a hardcopy is $.0.20 cents per page. The direct cost of the duplication does not include the staff person's time in researching, retrieving, redacting, and mailing the record. When the U-SU Administration Office must compile special electronic data, extract information from an electronic record to satisfy public records requests, the requester may be required to bear the full cost of obtaining the information. In the event this occurs, the U-SU Administration Office will notify requesters in advance of any applicable costs, and requires that payment be made, in advance, to the U-SU Administration Office prior to the production/release of the requested records.",
      'For additional questions please give the U-SU Administration Office a call at 323-343-2450 between the hours of: 8:00 AM to 5:00 PM (Monday to Friday).',
      'The copy of Form 990 will not include the schedule of Schedule A excess contributors or the Schedule B names and addresses of contributors. U-SU will make its best effort to ensure that the Forms 990 and 990-T held at our main office are the most updated versions. For example, in the instance where a Form 990 has been amended, the amended version of the Form 990 or Form 990-T should be the one available for public inspection. When responding to a public inspection request for any organizational document or Form 990 (including Form 990-T) by anyone, the U-SU shall fulfill such requests in a timely fashion without inquiring as to the reason for the public inspection request. Please allow for three business days for copies to be provided.',
    ],
  },
];
export const GeneralInformation = () => (
  <FluidContainer backgroundColor="greyLightest">
    {sections.map((s) => (
      <div key="s.title">
        <Typography
          variant="titleSmall"
          as="h2"
          color="gold"
          margin={`${Spaces['2xl']} 0 0`}
        >
          {s.title}
        </Typography>
        <Divider color="grey" margin={`${Spaces.xl} 0`} />
        {s.body.map((b, i) => (
          <Typography key={`${s.title}_${i}`} margin={`0 0 ${Spaces.md}`}>
            {b}
          </Typography>
        ))}
      </div>
    ))}
  </FluidContainer>
);
