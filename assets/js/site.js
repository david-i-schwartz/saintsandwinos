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

  // 2. Shows. The site is rebuilt every day, and each show is placed in
  //    Upcoming or Past at build time. Between rebuilds, a show that has
  //    happened is moved here: off "Next show" on the home page, and into
  //    Past on the Shows page. "Today" uses the band's time zone, the same
  //    as the build, so every visitor sees the same lists.
  var todayIn = function (tz) {
    var d = new Date();
    try {
      var parts = new Intl.DateTimeFormat('en-US', {
        timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit'
      }).formatToParts(d);
      var get = function (type) {
        for (var i = 0; i < parts.length; i++) { if (parts[i].type === type) return parts[i].value; }
        return '';
      };
      return get('year') + '-' + get('month') + '-' + get('day');
    } catch (err) {
      var pad = function (n) { return (n < 10 ? '0' : '') + n; };
      return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    }
  };
  var today = todayIn(document.documentElement.getAttribute('data-tz') || 'America/New_York');
  var pastList = document.querySelector('[data-gig-list="past"]');
  var syncEmpty = function (list) {
    var msg = document.querySelector('[data-empty-for="' + list.getAttribute('data-gig-list') + '"]');
    if (msg) msg.hidden = list.querySelector('li') !== null;
  };
  document.querySelectorAll('[data-gig-list="upcoming"], [data-gig-list="next"]').forEach(function (list) {
    list.querySelectorAll('li[data-gig-date]').forEach(function (card) {
      if (card.getAttribute('data-gig-date') >= today) return;
      if (pastList && list.getAttribute('data-gig-list') === 'upcoming') {
        var li = document.createElement('li');
        li.setAttribute('data-gig-date', card.getAttribute('data-gig-date'));
        var when = document.createElement('span');
        when.className = 'past__date';
        when.textContent = card.getAttribute('data-gig-label');
        var where = document.createElement('strong');
        where.textContent = card.getAttribute('data-gig-venue');
        li.appendChild(when);
        li.appendChild(document.createTextNode(' · '));
        li.appendChild(where);
        var city = card.getAttribute('data-gig-city');
        if (city) li.appendChild(document.createTextNode(' · ' + city));
        pastList.insertBefore(li, pastList.firstChild); // newest first
      }
      card.remove();
    });
    syncEmpty(list);
  });
  if (pastList) syncEmpty(pastList);

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
