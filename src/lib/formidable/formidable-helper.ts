import { IncomingMessage } from 'http';
import { Formidable } from 'formidable';

export async function parseAndExtractFormData(req: IncomingMessage) {
  const form = new Formidable();

  return new Promise<{ submissionID: string; parsedRequest: any }>(
    (resolve, reject) => {
      form.parse(req, (err, fields) => {
        if (err) {
          reject(err);
        } else {
          try {
            const rawRequest = Array.isArray(fields.rawRequest)
              ? fields.rawRequest[0]
              : fields.rawRequest || '';
            const submissionID = Array.isArray(fields.submissionID)
              ? fields.submissionID[0]
              : fields.submissionID || '';
            const parsedRequest = JSON.parse(rawRequest);

            resolve({ submissionID, parsedRequest });
          } catch {
            reject(new Error('Error parsing rawRequest JSON'));
          }
        }
      });
    },
  );
}
