# dotcss

dotcss is two(2) things:

  1. A [tiny web server][server] that runs on your machine, serving CSS files
     out of `~/.css`
  2. A [Chrome extension][extension] that fetches these CSS files and injects
     them based on their filename.

The files are requested on a per-page basics, based on the hostname. For
example, if you go to [https://github.com](https://github.com),
`~/.css/github.com.css` would be injected into the page.

This makes it super simple and easy to change and improve the look of your favorite sites.

## How it works

Chrome extensions can't access the filesystem, so dotcss runs a [tiny web
server][server] on port 1243 that serves files out of the `~/.css` folder.

## Requirements

- OS X or Linux
- Ruby 1.8 or newer
- rake (`gem install rake`)
- Chrome or Chromium
- `/usr/local/bin` in your `$PATH`
- on Linux: `exo-open` (Can be found in [exo-utils][] on Ubuntu. Required until
  [Bug #378783 in xdg-utils][exo-bug] is fixed.)

## Installation

    git clone http://github.com/stewart/dotcss.git
    cd dotcss
    rake install

Now open https://localhost:1243 in Chrome and follow these steps:

- Click the "X" Padlock icon in the address bar
- Click "Certificate Information"
- Drag the large cert icon to your desktop
- Open it with Keychain
- Configure its *Trust* section as shown: http://cl.ly/Pdny

Then, go grab the [Chrome extension][extension] and have fun!

If you use Safari, [@maman][] has a [pretty cool extension][safari] you can use.

## Uninstallation

    rake uninstall

## Chrome/Chromium/Chrome Canary

If you have multiple versions of Chrome installed, just install the
[extension][] in whichever one you fancy.

## Troubleshooting

Attempting to run `rake install` within a tmux session may fail with the following error:

    Could not open job overrides database at: /private/var/db/launchd.db/com.apple.launchd/overrides.plist: 13: Permission denied
    launchctl: Error unloading: ca.stwrt.dotcss

To avoid this, quit tmux before installing dotcss.

## Non-Inheriting Stylesheets

If you'd like to avoid inheriting from parent CSS files, give your CSS file
a name of `_{domain}.css`.

For example, on https://gist.github.com, by default, `gist.github.com.css` will
be loaded along with `github.com.css` and `default.css`.

But if `_gist.github.com.css` exists in the `~/.css` directory, it will be
loaded by itself.

## Thanks

- [Chris Wanstrath][defunkt] for [dotjs][], which 90% of this is based on.

[server]: https://github.com/stewart/dotcss/blob/master/bin/dcssd
[extension]: http://j.mp/dotcss_chrome_ext
[exo-utils]: http://packages.ubuntu.com/search?keywords=exo-utils
[exo-bug]: https://bugs.launchpad.net/ubuntu/+source/xdg-utils/+bug/378783
[defunkt]: https://github.com/defunkt
[dotjs]: https://github.com/defunkt/dotjs
[@maman]: https://github.com/maman
[safari]: https://github.com/maman/dotcss.safariextension
