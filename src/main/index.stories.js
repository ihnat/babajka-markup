import { storiesOf } from '@storybook/html';
import { select, color, boolean, text } from '@storybook/addon-knobs';
import { withViewport } from '@storybook/addon-viewport';

import renderFeatured from './featured.ejs';

import renderArticle from '../cards/article.ejs';
import '../cards/article.scss';

import './main.scss';

import renderVideo from '../cards/video.ejs';
import '../cards/video.scss';

import renderCollection from '../cards/collection.ejs';
import '../cards/collection.scss';

import renderLocation from '../cards/location.ejs';
import '../cards/location.scss';

import renderPerson from '../cards/person.ejs';
import '../cards/person.scss';

import { withIncludes } from '../../.storybook/utils';

const render = withIncludes({
  '../cards/article.ejs': renderArticle,
  '../cards/video.ejs': renderVideo,
  '../cards/collection.ejs': renderCollection,
  '../cards/person.ejs': renderPerson,
  '../cards/location.ejs': renderLocation,
});

const wrapper = content => `<div style="margin: 10px">${content}</div>`;

const cards = storiesOf('Main blocks', module).addDecorator(withViewport());
cards.add('Featured', ({ parameters: { defaultData } }) => {
  const size = select('size', ['xxl', 'xl', 'l', 'm', 'square-m', 'square-s'], 'xl');
  const backgroundColor = color('backgroundColor', '#1a2e48');
  const isDarkTheme = boolean('isDarkTheme', false);
  const title = text('title', 'Як прыгатаваць мову ВКЛ?');
  const author = text('author', 'Марыя Бадзей, Марына Анісімава');
  const description = text(
    'description',
    'Мноства баталій, якія з зайздроснай рэгулярнасцю разгараюцца вакол беларускай мовы, тычацца не толькі яе сучаснага стану. Мовазнаўцы і гісторыкі і па сёння не могуць пагадзіцца наконт таго, на якую мову Скарына пераклаў Біблію, што можна лічыць моваю беларускай і з якіх часоў варта адсочваць яе развіццё. Паспрабуем прыгледзецца да мовы Вялікага Княства Літоўскага'
  );

  const data = {
    ...defaultData,
    size,
    backgroundColor,
    isDarkTheme,
    title,
    author,
    description,
  };

  return wrapper(render(renderFeatured, data));
});

cards.add('Main', ({ parameters: { defaultData } }) => {
  // const size = select('size', ['xxl', 'xl', 'l', 'm', 'square-m', 'square-s'], 'xl');
  const backgroundColor = color('backgroundColor', '#1a2e48');
  // const isDarkTheme = boolean('isDarkTheme', false);

  const data = {
    ...defaultData,
    // size,
    backgroundColor,
    // isDarkTheme,
  };

  return wrapper(render(renderFeatured, data));
});
