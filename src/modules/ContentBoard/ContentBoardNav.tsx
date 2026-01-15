import { Typography } from 'components';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

import departmentsData from 'data/departments.json';
import { useBreakpoint } from 'hooks';
import { IoMdMenu } from 'react-icons/io';
import { Colors } from 'theme';

const departmentIDs: string[] = departmentsData.reduce((acc, cur) => {
  acc.push(cur?.id);
  return acc;
}, new Array<string>());

const ContentBarNavContainer = styled.div`
  height: 64px;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1rem;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  width: 100%;
  max-width: 420px;

  border: 0;
  border-radius: 8px;
  padding: 10px 12px;

  background: ${Colors.pastelYellow};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-self: start;
`;

const NavCenter = styled.div`
  justify-self: center;
  width: 100%;
  max-width: 420px;
`;

const NavRight = styled.div`
  justify-self: end;
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
        onChange={(e) => setFilterInput(e.target.value)}
        style={{
          flex: 1,
          border: 'none',
          background: 'transparent',
          fontSize: '16px',
          outline: 'none',
        }}
      />
    </SearchBarContainer>
  );
};

const MobileDropDownMenu = styled.div`
  position: absolute;
  top: calc(64px + 10px); /* under the nav */
  right: 16px;

  width: min(92vw, 320px);
  padding: 16px;
  border-radius: 12px;

  background: ${({ theme }) => theme?.Colors?.Background ?? '#ffffff'};
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  z-index: 99;

  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const MobileMenuItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledSelect = styled.select`
  width: 100%;
  border: 0;
  border-radius: 8px;
  padding: 10px 12px;

  background: ${Colors.pastelYellow};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: 2px solid ${({ theme }) => theme?.Colors?.Primary ?? '#007bff'};
    outline-offset: 2px;
  }
`;

const MenuButton = styled.button`
  border: 0;
  background: transparent;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${Colors.pastelYellow};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme?.Colors?.Primary ?? '#007bff'};
    outline-offset: 2px;
  }
`;

const ExitMobileDropDownMenuPageCover = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 98;
  inset: 0;
`;

export const ContentBoardNav = ({
  filterInput,
  setFilterInput,
  selectedDepartment,
  setSelectedDepartment,
  accessibleDepartment,
}: {
  filterInput: string;
  setFilterInput: Dispatch<SetStateAction<string>>;
  selectedDepartment: string;
  setSelectedDepartment: Dispatch<SetStateAction<string>>;
  accessibleDepartment: string;
}) => {
  const { isTablet } = useBreakpoint();
  const [mobileDropDown, setMobileDropDown] = useState(false);

  const DepartmentDropdown = () => {
    return (
      <StyledSelect
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
        aria-label="Select department"
      >
        {departmentIDs.map((departmentID) => (
          <option
            key={departmentID}
            value={departmentID}
            disabled={
              accessibleDepartment !== 'all' &&
              accessibleDepartment !== departmentID
            }
          >
            {departmentID.toUpperCase()}
          </option>
        ))}
      </StyledSelect>
    );
  };

  return (
    <ContentBarNavContainer>
      {isTablet ? (
        <>
          <NavLeft>
            <MenuButton
              type="button"
              aria-label="Open board controls"
              onClick={() => setMobileDropDown((v) => !v)}
            >
              <IoMdMenu size={32} color={Colors.primary} />
            </MenuButton>
          </NavLeft>

          <NavCenter>
            <SearchBar
              filterInput={filterInput}
              setFilterInput={setFilterInput}
            />
          </NavCenter>

          <NavRight />

          {mobileDropDown && (
            <>
              <MobileDropDownMenu role="dialog" aria-label="Board controls">
                <MobileMenuItem>
                  <Typography as="span" variant="label" weight="600">
                    Department
                  </Typography>
                  <DepartmentDropdown />
                </MobileMenuItem>

                {/* Optional: keep a second search in the dropdown or remove it.
                  I'd remove it since search is already centered above. */}
              </MobileDropDownMenu>

              <ExitMobileDropDownMenuPageCover
                onClick={() => setMobileDropDown(false)}
              />
            </>
          )}
        </>
      ) : (
        <>
          <NavLeft>
            <DepartmentDropdown />
          </NavLeft>

          <NavCenter>
            <SearchBar
              filterInput={filterInput}
              setFilterInput={setFilterInput}
            />
          </NavCenter>

          <NavRight />
        </>
      )}
    </ContentBarNavContainer>
  );
};
