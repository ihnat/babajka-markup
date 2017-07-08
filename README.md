# babajka-markup
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/001d83b6ff434a2fb5ce86517b7955b4)](https://www.codacy.com/app/babajka/babajka-markup?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=babajka/babajka-markup&amp;utm_campaign=Badge_Grade)
[![Dependency Status](https://www.versioneye.com/user/projects/595ac98d0fb24f006c059d06/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/595ac98d0fb24f006c059d06)

Styles &amp; Markup for babajka team project

## How to use

* run `npm install babajka-markup`
* import bundle.min.css from your node_modules '../node_modules/babajka-markup/dist/bundle.min.css'
* import assets.min.css from your node_modules '../node_modules/babajka-markup/dist/assets.min.css'


## Development

### scripts

* `npm run build` for buld css bundles, after that you will have:
	* `dist/bundle.css` - all our styles in one file
	* `dist/bundle.min.css` - minified production build
	* `dist/assets.min.css` - all 3dparty libs in one file
	* `fonts/` - FontAwesome fonts
* `npm run watch` for watch, check codestyle and recompile styles on change
* `npm run lint` for check codestyle
