import { Colors } from 'theme';
import styled from 'styled-components';
import { Typography } from 'components';
import { IconContext } from 'react-icons';
import { BsMegaphone } from 'react-icons/bs';
interface AnnouncementProps {
    announcementText: string;
}

const AnnouncementContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    background-color: ${Colors.primary};
`

export const Announcement = ({ announcementText }: AnnouncementProps) => {
    return (
        <AnnouncementContainer>
                <IconContext.Provider value={{
                    color: 'black',
                    style: {
                        height: '24px',
                        width: '27px',
                        margin: 'auto 16 auto 0',
                    }
                }}>
                    <BsMegaphone />
                </IconContext.Provider>
            <Typography as="h2" variant="bodySerif" weight="500">
                {announcementText}
            </Typography>
        </AnnouncementContainer>
    )
}