# dotcss

dotcss is a Google Chrome extension that imports `.css` files in `~/.css` based on their filename.

If you go to `https://github.com`, dotcss will load `~/.css/github.com.css`.

This makes it super simple to change and improve the look of your favourite pages.

## how it works

Chrome extensions can't access the local filesystem, so dotcss runs a tiny web server on port 1243 that serves files out of the `~/.css` folder

## requires

- OS X or Linux
- Ruby 1.8 or newer
- rake (`gem install rake`)
- Chrome or Chromium
- `/usr/local/bin` in your `$PATH`
- on Linux: `exo-open` (Can be found in [exo-utils](http://packages.ubuntu.com/search?keywords=exo-utils) on Ubuntu. Required until [Bug #378783 in xdg-utils](https://bugs.launchpad.net/ubuntu/+source/xdg-utils/+bug/378783) is fixed.)

## install

    git clone http://github.com/stewart/dotcss.git
    cd dotcss
    rake install
    
And install the chrome extension [http://bit.ly/dotcss_extension](http://bit.ly/dotcss_extension)

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

## troubleshooting

Attempting to run `rake install` within a tmux session in OSX will fail with the following error:

```
Could not open job overrides database at: /private/var/db/launchd.db/com.apple.launchd/overrides.plist: 13: Permission denied
launchctl: Error unloading: com.averagestudios.dotcss
```

This is because running `launchctl` within a tmux session will bootstrap in the root context. Avoid this by exiting your tmux session first.


## thanks

- Chris Wanstrath for [dotjs](http://github.com/defunkt/dotjs), which 90% of this is based on.
