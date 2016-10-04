A more beautiful Jekyll blog theme
==================================

This is a skeleton of Jekyll blog modified from the
[Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll)
blog theme. As a quick start, simply clone this and start modifying
`_config.yml` to fill in placeholders and add posts to `_posts/`.


## More Detail

Colour scheme and typefaces can be changed by replacing the settings in the
top portion of `css/main.scss`.

Each post should contain the YAML frontmatter, which contains the following in particular:

- `layout`: should be `post` or `page` for most of the case
- `title` and `subtitle`: as page title (required) and subtitle (optional)
- `date`: most parsable string are accepted. If not exist, date will be
  deduced from file name
- `tags`: list of tags associated to that page
- `titlebanner`: path to the background image for title portion of that page.
  Possibly an array for looping within a set of images randomly. May also
  carry an image description for each image by appending the description
  string after colon to the url
- `show_avatar`: boolean. If false explicitly, no avatar will be shown on the
  naviation bar on that page

## Common tips for hosting in Github

* Github page will not process through Jekyll if `.nojekyll` file is present
* Github help on pages: https://help.github.com/categories/github-pages-basics/
* Hosting with custom domain: https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/
