import * as CallToAction from './CallToAction';
import * as InstagramFeed from './CallToAction';
import { Header } from 'modules';
export { default as schema } from './schema.json';

export const sections = {
  CallToAction,
  DepartmentHero: { Component: Header, defaultProps: {} },
  InstagramFeed,
};
