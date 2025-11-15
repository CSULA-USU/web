// src/scripts/importArchivedDocs.ts
import fs from 'fs';

const raw = fs.readFileSync(
  './src/data/public-document-archives.json',
  'utf-8',
);
const json = JSON.parse(raw);

(async () => {
  const agendaYears = json.agenda.meeting || [];
  const minutesYears = json.minutes || [];

  const rows: any[] = [];

  // Build Agenda rows
  for (const yearBlock of agendaYears) {
    const fy = yearBlock.fy?.replace('FY ', '') ?? null;
    for (const doc of yearBlock.data) {
      rows.push({
        title: doc.children,
        url: doc.href,
        category: 'Agenda',
        is_archived: true,
        fy,
      });
    }
  }

  // Build Minutes rows
  for (const yearBlock of minutesYears) {
    const fy = yearBlock.fy?.replace('FY ', '') ?? null;
    for (const doc of yearBlock.data) {
      rows.push({
        title: doc.children,
        url: doc.href,
        category: 'Minutes',
        is_archived: true,
        fy,
      });
    }
  }
})();
