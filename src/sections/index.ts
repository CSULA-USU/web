import * as CallToAction from './CallToAction';
import { InstagramFeed } from '../components/InstagramFeed';
import { Header } from 'modules';

const Sections = {
  CallToAction,
  DepartmentHero: { Component: Header, defaultProps: {} },
  InstagramFeed: { Component: InstagramFeed, defaultProps: {} },
};

export default Sections;
