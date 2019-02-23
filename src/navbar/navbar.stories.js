import { storiesOf } from '@storybook/html';
// import { select, color, boolean, text, number } from '@storybook/addon-knobs';
import { withViewport } from '@storybook/addon-viewport';

import renderNavbar from './navbar.ejs';
import './navbar.scss';

const wrapper = content => `<div style="margin: 10px">${content}</div>`;

const cards = storiesOf('Navbar', module).addDecorator(withViewport());
cards.add('playground', ({ parameters: { defaultData } }) => wrapper(renderNavbar(defaultData)));
