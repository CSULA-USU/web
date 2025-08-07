import { FluidContainer } from 'components';
import { PositionModal } from './PositionsModal';

interface Position {
  positionName: string;
  description: string;
  department: string;
  location: string;
  requirements: string;
  hours: string;
  hourlyRate: string;
  img: string;
  alt?: string;
  link?: string;
}

interface Props {
  data: Position[];
  filterByDepartment?: string;
}

export const PositionsDescriptions = ({ data, filterByDepartment }: Props) => {
  const normalizedFilter = filterByDepartment?.trim().toLowerCase();

  const filtered =
    !normalizedFilter || normalizedFilter === 'all'
      ? data
      : data.filter(
          (p) =>
            typeof p.department === 'string' &&
            p.department.trim().toLowerCase() === normalizedFilter,
        );

  return (
    <FluidContainer flex flexDirection="column" padding="0">
      {filtered.length === 0 ? (
        <p>No positions found for &quot;{filterByDepartment}&quot;.</p>
      ) : (
        filtered.map((position, index) => (
          <PositionModal
            key={index}
            positionName={position.positionName}
            requirements={position.requirements}
            description={position.description}
            department={position.department}
            location={position.location}
            hours={position.hours}
            hourlyRate={position.hourlyRate}
            img={position.img}
            alt={position.alt}
            link={position.link}
          />
        ))
      )}
    </FluidContainer>
  );
};
