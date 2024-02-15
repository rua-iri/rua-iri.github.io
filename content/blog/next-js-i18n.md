---
title: 'Next Js I18n'
date: 2024-02-05T08:52:41+03:00
draft: false
toc: true
author: "rua-iri"
tags: []
categories: []
featured: true
---

# Next Js I18n



## Setup

Install the required NextJS library.

```bash
npm install -S react-intl
```


Then we will configure our NextJS project for i18n routing.

Open the `next.config.js` file and add an array of the languages you will be supporting on your site and the default language for the site to the `nextConfig`.

In this case I will be supporting English and Arabic with english as the default locale.


```javascript
i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  }
```

If you wanted to be more specific you could even distinguish between local variants of a language, like `en-US` or `ar-SA`.

This method will by default use sub-path routing, meaning that the user's desired language is determined by the URL path, whether it directs to `/About/` or `/ar/About`, although [domain routing](https://nextjs.org/docs/pages/building-your-application/routing/internationalization#domain-routing) is also supported.


To access the user's current locale, we can use the router object by calling the `useRouter()` hook.


```jsx
import { useRouter } from "next/router";
const router = useRouter();
```

We can use this to create a link that allows the user to navigate to the current page in the other language we are supporting.

I will map though each of the locales on the router and use them to generate the link.


```jsx
<div>
  {router.locales.map((locale, index) => {
    if (locale !== router.locale) {
      return (
        <>
          <Link key={index} href={router.pathname} locale={locale}>
            {locale.toLocaleUpperCase()}
          </Link>
          <br />
        </>
      )
    } else {
      return (
        <>
        </>
      )
    }
  })}
</div>
```

We only return the link for the language that is not currently in use.


To handle the translations of the site I found two libraries that could claimed to offer the features I was looking for; [next-intl](https://next-intl-docs.vercel.app) - which describes itself as an internationalisation library "that gets out of your way" and is specifically designed for NextJS, and [react-intl](https://formatjs.io/) from FormatJS which is a more longstanding alternative for react, but which supports a variety of frameworks.

I'm not sure if this was the best decision, but I decided to go with the latter because it had more stars on Github.

We need to open the the `_app.js` file and wrap the `<Component>` component in two new elements.


```jsx
const { locale } = useRouter();

return (
  <IntlProvider locale={locale} messages={messages[locale]}>
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} >
      <Component {...pageProps} />
    </div>
  </IntlProvider>
)
```

The first new element is one provided by the react-intl library, which allows us to specify the site's current locale and pass translated messages down to the pages that require them. The second is a `<div>` element I added to set the page's text direction, using a turnary expression to check if the locale is Arabic or not. Since Arabic is a language that is written right-to-left we will also need to change the page's `dir` from `ltr` to `rtl`, flipping the orientation of all the elements on the screen.


### Translation

Now with all this configured we need to implement the translation of text strings.

Start by creating the json files which will store our translations.

```bash
mkdir lang
touch ar.json en.json
```

Inside each of those new files we should add a json object containing our translated strings.

```json
{
  "page.title": "This is the title of the page"
}
```

```json
{
  "page.title": "هذا عنوان الصفحة"
}
```


Then we can import those strings dynamically into a page or component using the `useIntl()` function.


```javascript
import { useIntl } from "react-intl";

export default function Title() {

  const intl = useIntl();

  return (
    <h1>
      {intl.formatMessage({id: "page.title"})}
    </h1>
  )
}
```


Now when we alternate between the two different locales the text on the page and the page direction should alter automatically.












