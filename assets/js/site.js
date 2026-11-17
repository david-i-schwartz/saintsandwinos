/* Saints & Winos site script. Three small jobs, nothing else. */
(function () {
  'use strict';

  // 1. Phone menu: the MENU button opens and closes the page list.
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    var setOpen = function (open) {
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open
        ? (btn.getAttribute('data-open-label') || 'Close')
        : (btn.getAttribute('data-closed-label') || 'Menu');
      nav.classList.toggle('is-open', open);
    };
    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        btn.focus();
      }
    });
  }

  // 2. Shows: the site is rebuilt only when someone saves, so re-check
  //    every show against today's date here. A show stays "upcoming"
  //    through its own day and moves to "past" the day after.
  var d = new Date();
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var today = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  document.querySelectorAll('[data-gig-date]').forEach(function (el) {
    var list = el.closest('[data-gig-list]');
    if (!list) return;
    var isPast = el.getAttribute('data-gig-date') < today;
    var pastList = list.getAttribute('data-gig-list') === 'past';
    el.hidden = pastList ? !isPast : isPast;
  });

  // 3. Videos: load YouTube's player only when someone taps play.
  document.querySelectorAll('[data-yt]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('data-yt');
      if (!/^[A-Za-z0-9_-]{6,20}$/.test(id)) return; // odd link: just open YouTube
      e.preventDefault();
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      frame.title = link.getAttribute('data-title') || 'YouTube video';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      frame.allowFullscreen = true;
      frame.className = 'video__iframe';
      link.replaceWith(frame);
    });
  });
})();
