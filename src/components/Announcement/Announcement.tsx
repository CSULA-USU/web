import { Colors } from 'theme';
import styled from 'styled-components';
import { Typography } from 'components';
interface AnnouncementProps {
    announcementText: string;
}

const AnnouncementContainer = styled.div`
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    background-color: ${Colors.primary};
`

export const Announcement = ({ announcementText }: AnnouncementProps) => {
    return (
        <AnnouncementContainer>
            <Typography as="h2" variant="smallHeading">
                {announcementText}
            </Typography>
        </AnnouncementContainer>
    )
}