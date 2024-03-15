import styled from 'styled-components';
import { Typography } from '../Typography';
import { Image, Panel } from 'components';

interface CardStyles {
  margin?: string;
  width?: string;
  hoverable?: boolean;
  rounded?: boolean;
}

interface CardProps extends CardStyles {
  name: string;
  head?: string;
  title: string;
  children?: React.ReactNode;
  src: string;
  alt: string;
  tags?: string[];
}
const CenterWord = styled.div`
  text-align: center;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const NameSection = styled.div`
  height: 80px;
`;

export const StaffCard = ({
  name,
  head,
  title,
  children,
  src,
  alt,
  ...props
}: CardProps) => {
  return (
    <Panel {...props} width={'304px'} height="512px">
      <CenterWord>
        <div>
          {head ? (
            <>
              <Typography
                as="h3"
                color="gold"
                variant="copy"
                weight="700"
                size="md"
                margin="0 0 0 0"
                style={{ display: 'block' }}
              >
                {head}
              </Typography>
            </>
          ) : (
            <></>
          )}

          <Typography
            as="h2"
            color="gold"
            variant="copy"
            weight="700"
            size="md"
            margin="0 0 0 0"
          >
            {title}
          </Typography>
        </div>

        <div>
          <Image src={src} alt={alt} width="220px" height="245px" />
          <NameSection>
            <Typography
              size="sm"
              weight="700"
              margin="8px 0px 0px"
              variant="labelTitle"
            >
              {name}
            </Typography>
            {children}
          </NameSection>
        </div>
      </CenterWord>
    </Panel>
  );
};
