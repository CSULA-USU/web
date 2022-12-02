import styled from 'styled-components';
import Head from 'next/head';
import Image from 'next/image'
import {
    Page,
} from 'modules';

const RecreationContainer = styled.div`
    background-color: red;
    height: 1000px;
    max-width: 100%;
`

const RecreationHeroContainer = styled.div`
    background: url('/recreation-hero-background.jpg') no-repeat;
    background-size: cover;
    height: 640px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
            </RecreationContainer>
        </Page>
    );
}
