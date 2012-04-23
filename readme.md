# dotcss

dotcss is a Google Chrome extension that imports `.css` files in `~/.css` based on their filename.

If you go to `https://github.com`, dotcss will load `~/.css/github.com.css`.

This makes it super simple to change and improve the look of your favourite pages.

## how it works

Chrome extensions can't access the local filesystem, so dotcss runs a tiny web server on port 1243 that serves files out of the `~/.css` folder

## requires

- OS X
- Ruby 1.8 or newer
- rake (`gem install rake`)
- Google Chrome
- `/usr/local/bin` in your `$PATH`

## install

    git clone http://github.com/stewart/dotcss.git
    cd dotcss
    rake install

## chromium vs. google chrome vs. chrome canary

Multiple versions of Chrome installed? Drag `builds/dotcss.crx` to whichever is your favourite.

## quick notes on css

If your CSS isn't working, it means one of three things:

1. Your selectors are off - by this, I mean either you're trying to style the wrong element, or your selector isn't specific enough to override the existing CSS
2. Inline styles are preventing you from styling the element
3. dotcss fucked up

The first two are more likely than the third, but if you run into something weird, please file an issue and I'll try to help you.

## uninstall

    rake uninstall

## thanks

- Chris Wanstrath for [dotjs](http://github.com/defunkt/dotjs), which 90% of this is based on.
