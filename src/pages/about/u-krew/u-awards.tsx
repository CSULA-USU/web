import Head from 'next/head';
import {
  Page,
  UAwardsHero,
  UAwardsCurrentWinners,
  // UAwardsPastWinners,
  UAwardsValues,
  UAwardsCallToAction,
} from 'modules';
import { QuoteBanner } from 'components';
import uAwards from 'data/uAwards.json';
import type { UAwardsData } from 'types';

const data = uAwards as UAwardsData;

export default function UAwardsPage() {
  return (
    <Page>
      <Head>
        <title>U&ndash;Awards | The U&ndash;SU at Cal State LA</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="author"
          content="University-Student Union at Cal State LA"
          key="author"
        />
        <meta
          name="description"
          content="The U-Awards is the U-SU's annual celebration recognizing outstanding student staff and full-time employees who exemplify our values of accountability, integrity, innovation, community, fun, and connection."
          key="description"
        />
        <meta
          property="og:title"
          content="The U-Awards | Celebrating Excellence at the U-SU"
          key="og-title"
        />
        <meta
          property="og:description"
          content="Meet this year's honorees and the past winners of the U-Awards, the U-SU's annual recognition of outstanding student staff and full-time employees."
          key="og-desc"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/about/u-krew/u-awards"
        />
        <meta property="og:image" content="/u-awards/hero.jpg" key="og-image" />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href="https://www.calstatelausu.org/about/u-awards"
        />
      </Head>

      <UAwardsHero />

      <QuoteBanner
        variant="yellow"
        quote="Excellence at the U-SU is rarely loud. It looks like a student worker who stays an extra fifteen minutes to greet the last visitor of the day, an operations assistant doing their work diligently day in and day out, a designer who quietly reworks a flyer until it sings, a manager who knows every team member's name and major. The U-Awards exist so that the whole community can see the brilliance we see every day."
        name="Dr. Megan Bell"
        title="Executive Director, U-SU"
      />

      <UAwardsCurrentWinners
        departmentWinners={data.current.departmentWinners}
        valueWinners={data.current.valueWinners}
        staffWinners={data.current.staffWinners}
      />

      {/* <UAwardsPastWinners winners={data.past} departments={data.departments} /> */}

      <UAwardsValues values={data.values} />

      <UAwardsCallToAction />
    </Page>
  );
}
