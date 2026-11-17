# Saints & Winos website: how to change it

**The site:** https://david-i-schwartz.github.io/saintsandwinos/

You don't need to know any code, and you don't need a GitHub account.
You need the invite email from Dave. That's it.

## To change anything

1. Go to **app.pagescms.org** and sign in with the email address Dave invited.
2. Open **saintsandwinos**.
3. Pick what you want to change from the menu on the left. Fill in the boxes. Hit **Save**.
4. Wait a minute or two, then reload the site.

## Everyday jobs

| I want to… | Go to | Then |
|---|---|---|
| Add a show | **Shows** | Add an entry. Fill in the date and venue at least. Save. It appears as "Next show" on the home page, and it moves to "Past shows" by itself the day after. |
| Fix or cancel a show | **Shows** | Open it, change it, Save. To cancel, delete it. |
| Add a video | **Videos** | Add an item. Paste the YouTube link (on YouTube: Share, then Copy) and type a title and date. |
| Add photos | **Media** | Upload. Photos at the top level show up on the Photos page. To take one down, delete it. |
| Update my bio, photo or gear | **Members** | Open your name. Gear is one item per line. |
| Change a link, the band email or the logo | **Settings** | Leave a box blank and that thing just doesn't show. |
| Add a whole new page | **Pages** | Add an entry, give it a title and some text. Tick "Show this page in the menu" if it belongs in the menu. |
| Add an album or EP | **Releases (Music page)** | Add an item: title, year, Bandcamp link, track names. For the player, paste Bandcamp's embed code (Share / Embed, then Embed this album). |
| Change a heading or button | **Wording** | Find the page's group, change the words, Save. Empty a box and the original wording comes back. |

Tips:

- **Member photos** go in the `members` folder and the **logo and big home-page photo** go in the `site` folder. The upload button in those boxes already points at the right folder.
- Phone photos work fine. If you can send a smaller copy, the site loads faster.
- Text boxes take normal typing. The Bold, Italic and Link buttons work like any email app.

## Don't panic

Every save is kept. If something looks wrong, tell Dave: any change can be undone.

---

## For Dave

**How it works.** A GitHub Actions workflow (`.github/workflows/pages.yml`) builds the site with Jekyll every time anything is saved, and once a day so past shows move on their own. Pages CMS (free, hosted at app.pagescms.org) gives everyone else the forms. Content is plain Markdown and YAML:

| What | Where |
|---|---|
| Shows | `_gigs/*.md` (front matter only) |
| Members, bios, gear | `_members/*.md` |
| Pages (Shows, Music, The Band, Photos, Gear, Contact, Merch, any new ones) | `pages/*.md`. Each page's `layout` picks its template; new pages get the plain one. |
| Videos and releases (Music page, `layout: music`) | `_data/videos.yml`, `_data/releases.yml` |
| Old addresses `/audio/` and `/watch/` | `redirects/` forwards them to the Music page |
| Built-in headings, buttons and messages | `_data/words.yml`. Templates fall back to the original wording when a value is empty. |
| Links, email, logo, tagline | `_data/settings.yml` |
| Photos | `photos/` (gallery), `photos/members/`, `photos/site/` |
| The look (don't let anyone else touch it) | `_layouts/`, `_includes/`, `assets/` |
| Wiring | `_config.yml`, `.pages.yml` |

**Setting up the editors (once).**
1. Repo **Settings → Pages**: Source **GitHub Actions**. GitHub turns off scheduled runs in a repo with no activity for 60 days; any save in Pages CMS counts as activity.
2. Sign in at app.pagescms.org with GitHub and install the Pages CMS app on this repo.
3. In Pages CMS, open the repo's **Collaborators** and invite Joe and Tim by email.

**Moving to our own domain.**
1. Buy the domain. In its DNS, add four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, plus a `CNAME` record for `www` pointing to `david-i-schwartz.github.io`.
2. Repo **Settings → Pages → Custom domain**: enter the domain, wait for the check, tick **Enforce HTTPS**.
3. In `_config.yml`, set `url` to `https://<the domain>` and `baseurl` to `""`.

**Handing it to the band.** Repo **Settings → Transfer** moves it to another account; GitHub redirects the old address, and Pages CMS needs reconnecting to the new owner.

**How shows move to Past.** Each show is placed in Upcoming or Past (once) when the site is built, every day. Between builds, `assets/js/site.js` moves a show that has happened into Past, using New York time like the build. A show stays "upcoming" through its own day.

**Favicon.** `assets/favicon.svg` and `assets/apple-touch-icon.png` are a placeholder (halo over a wine bottle). Swap in the real logo when it's ready.
