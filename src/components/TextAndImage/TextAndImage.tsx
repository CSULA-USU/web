import styled from 'styled-components';
import React from 'react';
import { Typography } from 'components'

type TextAndImageProps = {
    children?: React.ReactNode;
    imageOrientation?: string;
    img?: string;
};

const TextAndImageStyling = styled.div`
    display: flex;
    height: 400px;
    max-width: 1000px;
    justify-content: space-between;
    overflow: hidden;
    margin: 48px 0 48px;
`;

const FlavourImageSection = styled.div<TextAndImageProps>`
    width: 600px;
    height: 100%;
    background: ${props => `url(${props.img}) no-repeat}`};
    border-radius: 16px;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: green;
`
const FlavourTextSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
`
export const TextAndImage = ({ children, imageOrientation, img }: TextAndImageProps) => {
    // console.log('this is image orientation', imageOrientation)
    return (
        <div>
            {
                imageOrientation === 'left' ?
                    <TextAndImageStyling>
                        <FlavourImageSection img={img} />
                        <FlavourTextSection>
                            <Typography as="p" variant="bodySerif" weight="500">
                                {children}
                            </Typography>
                        </FlavourTextSection>
                    </TextAndImageStyling>
                    :
                    <TextAndImageStyling>
                        <FlavourTextSection>
                            <Typography as="p" variant="bodySerif" weight="500">
                                {children}
                            </Typography>
                        </FlavourTextSection>
                        <FlavourImageSection img={img} />
                    </TextAndImageStyling>
            }
        </div>
    );
};