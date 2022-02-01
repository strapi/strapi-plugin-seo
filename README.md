# Strapi plugin SEO

The official plugin to make your Strapi content SEO friendly

## Features

- Possibility to import the default Strapi `shared.seo` & `shared.meta-social` components from our components [GitHub repository](https://github.com/strapi/components) in one click.
- Easily see which Content-Types does have the SEO component.
- Manage the meta title & meta description and preview your content in the SERP
- Manage your meta social tags (Facebook & Twitter) and preview your post.
- Strong SEO analysis for your content.

## Installation

To install this plugin, you need to add an NPM dependency to your Strapi application.

```sh
# Using Yarn
yarn add @strapi/plugin-seo

# Or using NPM
npm install @strapi/plugin-seo
```

## Configuration

`./config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  seo: {
    enabled: true,
  },
  // ...
});
```

Then, you'll need to build your admin panel:

```sh
# Using Yarn
yarn build

# Or using NPM
npm run build
```

## SEO settings page

You'll be able from the SEO settings page to import a `shared.seo` & `shared.meta-social` components from any GitHub repository By default, our [components GitHub repository](https://github.com/strapi/components) is being used.

**Notice**: If you decide to import your own components, make sure that they belong to a `shared` category that their names is the same (`seo`, `meta-social`).
**Notice2**: When adding your SEO component, make sure to name it 'seo' and to include it in the root of your Content-Type.

## EditView SEO button

Once you create your SEO component in the edit view inside the Content Manager, the SEO button will appear on the the [right-links injection zone](https://docs.strapi.io/developer-docs/latest/developer-resources/plugin-api-reference/admin-panel.html#injection-zones-api). You'll be able to:

- Manage the meta title & description of your content and preview it in SERP.
- Manage your meta social tags (Facebook & Twitter) and preview your post.
- Analyze your content a little deeper via an SEO analysis of your content.
