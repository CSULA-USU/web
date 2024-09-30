import { createElement, ReactElement } from 'react';
import { BiCoffeeTogo } from 'react-icons/bi';
import { BsSignpost2Fill } from 'react-icons/bs';
import { CgPokemon } from 'react-icons/cg';
import {
  FaDumbbell,
  FaGamepad,
  FaMusic,
  FaPaperPlane,
  FaRunning,
} from 'react-icons/fa';
import { FaMountainSun, FaPlateWheat } from 'react-icons/fa6';
import { GiBabyBottle, GiRollerSkate, GiStrawberry } from 'react-icons/gi';
import { ImSpoonKnife } from 'react-icons/im';
import { LuCakeSlice, LuSoup } from 'react-icons/lu';
import { MdSoupKitchen, MdSportsBasketball } from 'react-icons/md';

interface IconProps {
  iconName: string;
  size?: string;
}

export const Icon = ({ iconName, size }: IconProps): ReactElement => {
  // Define an object to map icon names to their corresponding components
  const iconComponents: { [key: string]: ReactElement } = {
    BiCoffeeTogo: createElement(BiCoffeeTogo, { size }),
    BsSignpost2Fill: createElement(BsSignpost2Fill, { size }),
    CgPokemon: createElement(CgPokemon, { size }),
    FaDumbbell: createElement(FaDumbbell, { size }),
    FaGamepad: createElement(FaGamepad, { size }),
    FaMountainSun: createElement(FaMountainSun, { size }),
    FaMusic: createElement(FaMusic, { size }),
    FaPaperPlane: createElement(FaPaperPlane, { size }),
    FaPlateWheat: createElement(FaPlateWheat, { size }),
    FaRunning: createElement(FaRunning, { size }),
    GiBabyBottle: createElement(GiBabyBottle, { size }),
    GiRollerSkate: createElement(GiRollerSkate, { size }),
    GiStrawberry: createElement(GiStrawberry, { size }),
    ImSpoonKnife: createElement(ImSpoonKnife, { size }),
    LuCakeSlice: createElement(LuCakeSlice, { size }),
    LuSoup: createElement(LuSoup, { size }),
    MdSportsBasketball: createElement(MdSportsBasketball, { size }),
    MdSoupKitchen: createElement(MdSoupKitchen, { size }),
  };

  // Render the corresponding icon component based on the iconName prop
  return iconComponents[iconName];
};
