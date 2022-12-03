import styled from 'styled-components';
import Head from 'next/head';
import Image from 'next/image'
import {
    Page,
} from 'modules';
import { Typography } from 'components';

const RecreationContainer = styled.div`
    height: 2000px;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const RecreationHeroContainer = styled.div`
    background: url('/recreation-hero-background.jpg') no-repeat;
    background-size: cover;
    height: 960px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const RecreationInnerContainer = styled.div`
    height: 800px;
    max-width: 1000px;
    text-align: center;
    margin: 0 auto;
`
export default function Home() {
    return (
        <Page>
            <Head>
                <title>University-Student Union</title>
                <meta name="author" content="Recreation" />
                <meta
                    name="keywords"
                    content="recreation fitness workout calstate la los angeles cal state california state university csula chris balam jay san luis gym"
                />
                <meta
                    name="description"
                    content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <RecreationContainer>
                <RecreationHeroContainer>
                    <Image src="/recreation-hero.png" alt="recreation logo" width="660" height="258" />
                </RecreationHeroContainer>
                <RecreationInnerContainer>
                    <Typography as="h2" variant="bodySerif" size="lg" weight="500" margin="24px 0 24px">
                        The Recreation Fitness Center is now open!
                        <br />
                        Join us in our renovated facility:
                        <br />
                        Monday through Friday from 7:00 a.m. to 9:30 p.m., and Saturday 7:00 a.m. to 2:30 p.m.!
                    </Typography>
                    <Typography as="p" variant="bodySerif" margin="24px 0 24px">
                        Recreation at Cal State LA provides Golden Eagles with opportunities to play,
                        exercise and engage their campus community through programming and events aimed
                        toward enhancing the experience of all who participate.
                        <br />
                        Recreation is comprised of the Recreation Fitness Center Center and Recreation
                        Esports. The Recreation Fitness Center is located on the basement level of the
                        U-SU, and will be open to all students, staff and faculty.
                    </Typography>
                    <div>
                        <Typography as="p" variant="bodySerif">
                            <strong>Renovations:</strong>
                            <ul>
                                <li>New rubber flooring in the fitness center</li>
                                <li>All new strength equipment</li>
                                <li>Expansion of fitness into the former games room.</li>
                            </ul>
                            For updates and ways to connect now, follow @calstatela_recreation on Instagram!
                        </Typography>
                    </div>
                </RecreationInnerContainer>
            </RecreationContainer>
        </Page>
    );
}
