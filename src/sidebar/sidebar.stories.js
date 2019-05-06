import { storiesOf } from '@storybook/html';
import { array } from '@storybook/addon-knobs';

import renderSidebar from './sidebar.ejs';
import renderInput from '../kit/input/input.ejs';
import renderLink from '../kit/link/link.ejs';

import { withIncludes } from '../../.storybook/utils';

import './sidebar.scss';
import '../kit/input/input.scss';
import '../kit/link/link.scss';

import sidebarData from '../../data/sidebar.json';

const render = withIncludes({
  '../kit/input/input.ejs': renderInput,
  '../kit/link/link.ejs': renderLink,
});

const sidebar = storiesOf('Sidebar', module);
sidebar.add('playground', ({ parameters: { defaultData } }) => {
  const data = {
    ...defaultData,
    langs: array('langs', sidebarData.langs),
    topics: array('topics', sidebarData.topics),
    persons: array('persons', sidebarData.persons),
    times: array('times', sidebarData.times),
    locations: array('locations', sidebarData.locations),
    partners: array('partners', sidebarData.partners),
    authors: array('authors', sidebarData.authors),
    leftIcon: 'search',
  };

  return `<div style="width: 500px">${render(renderSidebar, data)}</div>`;
});
