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

## uninstall

    rake uninstall

## thanks

- Chris Wanstrath for [dotjs](http://github.com/defunkt/dotjs), which 90% of this is based on.
