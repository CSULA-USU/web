import { createElement, ReactElement } from 'react';
import { BsSignpost2Fill } from 'react-icons/bs';
import { CgPokemon } from 'react-icons/cg';
import { FaGamepad, FaPaperPlane } from 'react-icons/fa';
import { FaMountainSun, FaPlateWheat } from 'react-icons/fa6';
import { GiBabyBottle, GiStrawberry } from 'react-icons/gi';
import { ImSpoonKnife } from 'react-icons/im';
import { LuCakeSlice, LuSoup } from 'react-icons/lu';

interface IconProps {
  iconName: string;
  size?: string;
}

export const Icon = ({ iconName, size }: IconProps): ReactElement => {
  // Define an object to map icon names to their corresponding components
  const iconComponents: { [key: string]: ReactElement } = {
    GiBabyBottle: createElement(GiBabyBottle, { size }),
    FaMountainSun: createElement(FaMountainSun, { size }),
    BsSignpost2Fill: createElement(BsSignpost2Fill, { size }),
    CgPokemon: createElement(CgPokemon, { size }),
    FaGamepad: createElement(FaGamepad, { size }),
    FaPaperPlane: createElement(FaPaperPlane, { size }),
    FaPlateWheat: createElement(FaPlateWheat, { size }),
    GiStrawberry: createElement(GiStrawberry, { size }),
    ImSpoonKnife: createElement(ImSpoonKnife, { size }),
    LuCakeSlice: createElement(LuCakeSlice, { size }),
    LuSoup: createElement(LuSoup, { size }),
  };

  // Render the corresponding icon component based on the iconName prop
  return iconComponents[iconName];
};