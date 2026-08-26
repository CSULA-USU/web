import { createElement, ReactElement } from 'react';
import {
  BiCoffeeTogo,
  BiDrink,
  BiHeadphone,
  BiIdCard,
  BiSolidSushi,
} from 'react-icons/bi';
import { BsSignpost2Fill } from 'react-icons/bs';
import { CgPill, CgPokemon } from 'react-icons/cg';
import {
  FaBalanceScale,
  FaBullhorn,
  FaDog,
  FaDumbbell,
  FaGamepad,
  FaIceCream,
  FaMusic,
  FaPaintBrush,
  FaPaperPlane,
  FaPizzaSlice,
  FaRunning,
  FaUmbrellaBeach,
} from 'react-icons/fa';
import { FaMountainSun, FaPlateWheat } from 'react-icons/fa6';
import {
  GiBabyBottle,
  GiRiceCooker,
  GiRollerSkate,
  GiRunningShoe,
  GiStrawberry,
  GiTacos,
  GiTShirt,
} from 'react-icons/gi';
import { IoMdFlower } from 'react-icons/io';
import { ImSpoonKnife } from 'react-icons/im';
import { LuCakeSlice, LuSoup } from 'react-icons/lu';
import {
  MdCake,
  MdOutlinePedalBike,
  MdSoupKitchen,
  MdSportsBasketball,
} from 'react-icons/md';
import { TbMickeyFilled, TbStairsUp } from 'react-icons/tb';
interface IconProps {
  iconName: string;
  size?: string;
}

export const Icon = ({ iconName, size }: IconProps): ReactElement => {
  /* Decorative by default: every use pairs the glyph with visible text beside
     it, so the icon is hidden from assistive tech rather than announced as an
     unnamed graphic — react-icons emits a bare <svg> and adds neither. */
  const iconProps = {
    size,
    'aria-hidden': 'true',
    focusable: 'false',
  } as const;

  // Define an object to map icon names to their corresponding components
  const iconComponents: { [key: string]: ReactElement } = {
    BiCoffeeTogo: createElement(BiCoffeeTogo, iconProps),
    BiDrink: createElement(BiDrink, iconProps),
    BiHeadphone: createElement(BiHeadphone, iconProps),
    BiIdCard: createElement(BiIdCard, iconProps),
    BsSignpost2Fill: createElement(BsSignpost2Fill, iconProps),
    BiSolidSushi: createElement(BiSolidSushi, iconProps),
    CgPill: createElement(CgPill, iconProps),
    CgPokemon: createElement(CgPokemon, iconProps),
    FaBalanceScale: createElement(FaBalanceScale, iconProps),
    FaIceCream: createElement(FaIceCream, iconProps),
    FaDog: createElement(FaDog, iconProps),
    FaPaintBrush: createElement(FaPaintBrush, iconProps),
    FaUmbrellaBeach: createElement(FaUmbrellaBeach, iconProps),
    FaBullhorn: createElement(FaBullhorn, iconProps),
    FaDumbbell: createElement(FaDumbbell, iconProps),
    FaGamepad: createElement(FaGamepad, iconProps),
    FaMountainSun: createElement(FaMountainSun, iconProps),
    FaMusic: createElement(FaMusic, iconProps),
    FaPaperPlane: createElement(FaPaperPlane, iconProps),
    FaPizzaSlice: createElement(FaPizzaSlice, iconProps),
    FaPlateWheat: createElement(FaPlateWheat, iconProps),
    FaRunning: createElement(FaRunning, iconProps),
    GiBabyBottle: createElement(GiBabyBottle, iconProps),
    GiRiceCooker: createElement(GiRiceCooker, iconProps),
    GiRollerSkate: createElement(GiRollerSkate, iconProps),
    GiRunningShoe: createElement(GiRunningShoe, iconProps),
    GiStrawberry: createElement(GiStrawberry, iconProps),
    GiTacos: createElement(GiTacos, iconProps),
    GiTShirt: createElement(GiTShirt, iconProps),
    ImSpoonKnife: createElement(ImSpoonKnife, iconProps),
    IoMdFlower: createElement(IoMdFlower, iconProps),
    LuCakeSlice: createElement(LuCakeSlice, iconProps),
    LuSoup: createElement(LuSoup, iconProps),
    MdCake: createElement(MdCake, iconProps),
    MdOutlinePedalBike: createElement(MdOutlinePedalBike, iconProps),
    MdSportsBasketball: createElement(MdSportsBasketball, iconProps),
    MdSoupKitchen: createElement(MdSoupKitchen, iconProps),
    TbMickeyFilled: createElement(TbMickeyFilled, iconProps),
    TbStairsUp: createElement(TbStairsUp, iconProps),
  };

  // Render the corresponding icon component based on the iconName prop
  return iconComponents[iconName];
};
