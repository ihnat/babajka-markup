import { storiesOf } from '@storybook/html';
import { withViewport } from '@storybook/addon-viewport';

import renderFeatured from './blocks/featured.ejs';
import renderDiary from './blocks/diary.ejs';
import renderLatest from './blocks/latest.ejs';
import renderTagsByTopic12 from './blocks/tags-by-topic-1-2.ejs';
import renderTagsByTopic21 from './blocks/tags-by-topic-2-1.ejs';
import renderTopic from './blocks/topic.ejs';
import renderBrand from './blocks/brand.ejs';

import './main.scss';

import renderArticle from '../cards/article.ejs';
import '../cards/article.scss';

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
  '../../cards/article.ejs': renderArticle,
  '../../cards/video.ejs': renderVideo,
  '../../cards/collection.ejs': renderCollection,
  '../../cards/person.ejs': renderPerson,
  '../../cards/location.ejs': renderLocation,
});

const wrapper = content => `<div class="container">${content}</div>`;

const blocks = storiesOf('Main Blocks', module).addDecorator(withViewport());

blocks.add('Featured', ({ parameters: { defaultData } }) =>
  wrapper(render(renderFeatured, defaultData))
);
blocks.add('Diary', ({ parameters: { defaultData } }) => wrapper(render(renderDiary, defaultData)));
blocks.add('Latest', ({ parameters: { defaultData } }) =>
  wrapper(render(renderLatest, defaultData))
);
blocks.add('TagsByTopic12', ({ parameters: { defaultData } }) =>
  wrapper(render(renderTagsByTopic12, defaultData))
);
blocks.add('TagsByTopic21', ({ parameters: { defaultData } }) =>
  wrapper(render(renderTagsByTopic21, defaultData))
);
blocks.add('Topic', ({ parameters: { defaultData } }) => wrapper(render(renderTopic, defaultData)));
blocks.add('Brand', ({ parameters: { defaultData } }) => wrapper(render(renderBrand, defaultData)));
