import { storiesOf } from '@storybook/html';
// import { select, color, boolean, text, number } from '@storybook/addon-knobs';
import { withViewport } from '@storybook/addon-viewport';

import renderFooter from './footer.ejs';
import renderInput from '../kit/input/input.ejs';
import renderLink from '../kit/link/link.ejs';

import { withIncludes } from '../../.storybook/utils';

import './footer.scss';
import '../kit/input/input.scss';
import '../kit/link/link.scss';

const wrapper = content => `<div style="margin: 10px">${content}</div>`;

const render = withIncludes({
  '../kit/input/input.ejs': renderInput,
  '../kit/link/link.ejs': renderLink,
});

const cards = storiesOf('Footer', module).addDecorator(withViewport());
cards.add('playground', ({ parameters: { defaultData } }) =>
  wrapper(render(renderFooter, defaultData))
);
