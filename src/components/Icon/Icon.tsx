import { createElement, ReactElement } from 'react';
import { BiCoffeeTogo } from 'react-icons/bi';
import { BsSignpost2Fill } from 'react-icons/bs';
import { CgPokemon } from 'react-icons/cg';
import {
  FaBalanceScale,
  FaDumbbell,
  FaGamepad,
  FaIceCream,
  FaMusic,
  FaPaperPlane,
  FaPizzaSlice,
  FaRunning,
  FaUmbrellaBeach,
} from 'react-icons/fa';
import { FaMountainSun, FaPlateWheat } from 'react-icons/fa6';
import { GiBabyBottle, GiRollerSkate, GiStrawberry } from 'react-icons/gi';
import { ImSpoonKnife } from 'react-icons/im';
import { LuCakeSlice, LuSoup } from 'react-icons/lu';
import { MdCake, MdSoupKitchen, MdSportsBasketball } from 'react-icons/md';
import { TbStairsUp, TbMickeyFilled } from 'react-icons/tb';
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
    FaBalanceScale: createElement(FaBalanceScale, { size }),
    FaIceCream: createElement(FaIceCream, { size }),
    FaUmbrellaBeach: createElement(FaUmbrellaBeach, { size }),
    FaDumbbell: createElement(FaDumbbell, { size }),
    FaGamepad: createElement(FaGamepad, { size }),
    FaMountainSun: createElement(FaMountainSun, { size }),
    FaMusic: createElement(FaMusic, { size }),
    FaPaperPlane: createElement(FaPaperPlane, { size }),
    FaPizzaSlice: createElement(FaPizzaSlice, { size }),
    FaPlateWheat: createElement(FaPlateWheat, { size }),
    FaRunning: createElement(FaRunning, { size }),
    GiBabyBottle: createElement(GiBabyBottle, { size }),
    GiRollerSkate: createElement(GiRollerSkate, { size }),
    GiStrawberry: createElement(GiStrawberry, { size }),
    ImSpoonKnife: createElement(ImSpoonKnife, { size }),
    LuCakeSlice: createElement(LuCakeSlice, { size }),
    LuSoup: createElement(LuSoup, { size }),
    MdCake: createElement(MdCake, { size }),
    MdSportsBasketball: createElement(MdSportsBasketball, { size }),
    MdSoupKitchen: createElement(MdSoupKitchen, { size }),
    TbMickeyFilled: createElement(TbMickeyFilled, { size }),
    TbStairsUp: createElement(TbStairsUp, { size }),
  };

  // Render the corresponding icon component based on the iconName prop
  return iconComponents[iconName];
};
