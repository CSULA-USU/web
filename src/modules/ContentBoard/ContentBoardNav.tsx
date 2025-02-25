import { Typography } from 'components';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import { FontSizes } from 'theme';

import departmentsData from 'data/departments.json';
import { useBreakpoint } from 'hooks';
import { HiMenuAlt3 } from 'react-icons/hi';
import backOfficeLinks from 'data/backOfficeLinks.json';
import Link from 'next/link';

const departmentIDs: string[] = departmentsData.reduce((acc, cur) => {
  acc.push(cur?.id);
  return acc;
}, new Array<string>());

const ContentBarNavContainer = styled.div`
  height: 64px;
  width: 100%;
  background-color: #2b2b2b;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  max-width: 300px;
  border: 2px solid #ccc;
  /* border-radius: 25px; */
  padding: 5px 10px;
  background-color: #fff;
`;

const SearchBar = ({
  filterInput,
  setFilterInput,
}: {
  filterInput: string;
  setFilterInput: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <SearchBarContainer>
      <FaSearch />
      <input
        type="text"
        placeholder="Search by title..."
        value={filterInput}
        onChange={(e) => {
          setFilterInput(e.target.value);
        }}
        style={{
          flex: 1,
          border: 'none',
          fontSize: '16px',
          height: '100%',
        }}
      />
    </SearchBarContainer>
  );
};

const MobileDropDownMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  top: 4rem;
  right: 0;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 2.24) 0px 3px 8px;
  border-radius: 0.5rem;
  width: 240px;
  padding: 0.5rem;
  z-index: 99;
`;

const ExitMobileDropDownMenuPageCover = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 98;
  inset: 0;
`;

const BackOfficeLinksContainer = styled.ul`
  text-decoration: underline;
  list-style-type: square;
  margin: 0;
`;

export const ContentBoardNav = ({
  title,
  filterInput,
  setFilterInput,
  selectedDepartment,
  setSelectedDepartment,
  accessibleDepartment,
}: {
  title: string;
  filterInput: string;
  setFilterInput: Dispatch<SetStateAction<string>>;
  selectedDepartment: string;
  setSelectedDepartment: Dispatch<SetStateAction<string>>;
  accessibleDepartment: string;
}) => {
  const { isTablet, isDesktop } = useBreakpoint();
  const [mobileDropDown, setMobileDropDown] = useState(false);

  const DepartmentDropdown = () => {
    return (
      <select
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
      >
        {departmentIDs.map((departmentID) => {
          return (
            <option
              key={departmentID}
              value={departmentID}
              disabled={
                accessibleDepartment != 'all' &&
                accessibleDepartment != departmentID
              }
            >
              {departmentID.toUpperCase()}
            </option>
          );
        })}
      </select>
    );
  };

  return (
    <ContentBarNavContainer>
      <Typography
        variant="labelTitle"
        weight="400"
        size="lg"
        lineHeight={FontSizes['lg']}
        color="white"
      >
        {title}
      </Typography>
      {isTablet ? (
        <>
          <HiMenuAlt3
            size={32}
            color="white"
            onClick={() => setMobileDropDown(!mobileDropDown)}
          />
          {mobileDropDown && (
            <>
              <MobileDropDownMenu>
                <div>
                  <Typography color="black">Department: </Typography>
                  <DepartmentDropdown />
                </div>

                <div>
                  <Typography color="black">Search: </Typography>
                  <SearchBar
                    filterInput={filterInput}
                    setFilterInput={setFilterInput}
                  />
                </div>

                <div>
                  <Typography color="black">Navigation: </Typography>
                  <BackOfficeLinksContainer>
                    {backOfficeLinks.map(
                      (backOfficeLink: { title: string; url: string }) => {
                        return (
                          <li key={backOfficeLink.title}>
                            <Link href={backOfficeLink.url}>
                              {backOfficeLink.title}
                            </Link>
                          </li>
                        );
                      },
                    )}
                  </BackOfficeLinksContainer>
                </div>
              </MobileDropDownMenu>
              <ExitMobileDropDownMenuPageCover
                onClick={() => setMobileDropDown(false)}
              />
            </>
          )}
        </>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {!isDesktop && <Typography color="white">Department: </Typography>}
            <DepartmentDropdown />
          </div>
          <SearchBar
            filterInput={filterInput}
            setFilterInput={setFilterInput}
          />
        </>
      )}
    </ContentBarNavContainer>
  );
};
