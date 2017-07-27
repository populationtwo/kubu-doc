# Kubu Documentation Template
Documentation template built on Foundation 6 and Nunjucks.

## Quick Start
Run `npm install` and `bower install`
Run `gulp`

## How to add new section
Copy assets/views/placeholder.nunjucks, rename accordingly.
Include the newly created file in pages/index.nunjucks by adding `{% include "NEW_SECTION_NAME.nunjucks" %}`