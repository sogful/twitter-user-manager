(function () {
  "use strict";

  const ICONS = {
    reply: '<svg viewBox="0 0 24 24"><path d="M21 12c0 4.4-4 8-9 8-1.4 0-2.7-.3-3.9-.8L3 20l1-4.5C3.4 14.2 3 13.1 3 12c0-4.4 4-8 9-8s9 3.6 9 8z"/></svg>',
    retweet: '<svg viewBox="0 0 24 24"><path d="M6 5.5h9.5a3 3 0 0 1 3 3V13M18 18.5H8.5a3 3 0 0 1-3-3V11"/><path d="M9 2.5 6 5.5l3 3M15 21.5l3-3-3-3"/></svg>',
    like: '<svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.7-9.8-9.4C.7 7 2.4 4 5.6 4c2 0 3.3 1 4.4 2.5C11.1 5 12.4 4 14.4 4c3.2 0 4.9 3 3.4 6.6C15.5 15.3 12 20 12 20z"/></svg>',
    views: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    bookmark: '<svg viewBox="0 0 24 24"><path d="M6 4h12v17l-6-4-6 4z"/></svg>',
    share: '<svg viewBox="0 0 24 24"><path d="M12 4v12M8 8l4-4 4 4M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>',
    dots: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',
    verified: '<svg viewBox="0 0 24 24" fill="#1d9bf0"><path d="M12 2l2.4 1.4 2.7-.4 1.3 2.4 2.4 1.3-.4 2.7L22 12l-1.6 2.4.4 2.7-2.4 1.3-1.3 2.4-2.7-.4L12 22l-2.4-1.6-2.7.4-1.3-2.4-2.4-1.3.4-2.7L2 12l1.6-2.4-.4-2.7 2.4-1.3 1.3-2.4 2.7.4L12 2z"/><path d="M9 12l2 2 4-4" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  const DEFAULTAVATAR = "data:image/svg+xml;base64," + btoa(
    '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="#2f3336"/>' +
    '<circle cx="48" cy="38" r="18" fill="#71767b"/>' +
    '<path d="M14 92c0-24 15-38 34-38s34 14 34 38" fill="#71767b"/></svg>'
  );

  /*//////////////////////////////////////////////////////////////////////*/

  function actionrow(counts) {
    return `
      <div class="fakerow">
        <span class="fakeaction">${ICONS.reply}${counts[0]}</span>
        <span class="fakeaction">${ICONS.retweet}${counts[1]}</span>
        <span class="fakeaction">${ICONS.like}${counts[2]}</span>
        <span class="fakeaction">${ICONS.views}${counts[3]}</span>
        <span class="fakeaction">${ICONS.bookmark}</span>
        <span class="fakeaction">${ICONS.share}</span>
      </div>
    `;
  }

  function closemenus() {
    document.querySelectorAll('[role="menu"]').forEach(m => m.remove());
  }
  document.addEventListener("click", e => {
    if (!e.target.closest('[data-testid="caret"]') && !e.target.closest('[role="menu"]')) closemenus();
  });

  function openmenu(caret, user) {
    closemenus();
    const rect = caret.getBoundingClientRect();
    const menu = document.createElement("div");
    menu.setAttribute("role", "menu");
    menu.style.top = (rect.bottom + 6) + "px";
    menu.style.left = Math.max(8, rect.right - 220) + "px";
    menu.innerHTML = `
      <div role="menuitem">Follow @${user.handle}</div>
      <div role="menuitem">Mute</div>
      <div role="menuitem">Block @${user.handle}</div>
    `;
    document.body.appendChild(menu);

    menu.querySelectorAll('[role="menuitem"]').forEach(item => {
      item.addEventListener("click", () => {
        const text = item.textContent || "";
        closemenus();
        if (/^block/i.test(text)) openblocksheet(user);
        else console.log("[faketwitter]", text);
      });
    });
  }

  function openblocksheet(user) {
    const backdrop = document.createElement("div");
    backdrop.className = "fakesheetbackdrop";
    backdrop.innerHTML = `
      <div data-testid="confirmationSheetDialog">
        <div style="font-weight:800;font-size:17px">block @${user.handle}?</div>
        <div style="color:#71767b;margin-top:6px;font-size:14px">they won't be able to follow or message you.</div>
        <button data-testid="confirmationSheetConfirm">block</button>
        <button class="fakesheetcancel">cancel</button>
      </div>
    `;
    backdrop.addEventListener("click", e => {if (e.target === backdrop) backdrop.remove()});
    backdrop.querySelector(".fakesheetcancel").addEventListener("click", () => backdrop.remove());
    backdrop.querySelector('[data-testid="confirmationSheetConfirm"]').addEventListener("click", () => {
      console.log("[faketwitter] blocked @" + user.handle);
      backdrop.remove();
    });
    document.body.appendChild(backdrop);
  }

  function buildtweet(user, text, statusid, isreply) {
    const article = document.createElement("article");
    article.setAttribute("data-testid", "tweet");
    article.setAttribute("role", "article");
    if (isreply) article.classList.add("fakereply");

    article.innerHTML = `
      <div class="fakeavatar" data-testid="Tweet-User-Avatar"><img src="${DEFAULTAVATAR}"></div>
      <div class="fakebody">
        <div data-testid="User-Name">
          <a role="link" href="/${user.handle}"><span class="fakedisplayname">${user.name}</span>${user.verified ? `<span class="fakebadge">${ICONS.verified}</span>` : ""}</a>
          <a role="link" href="/${user.handle}"><span class="fakehandle">@${user.handle}</span></a>
          <a role="link" href="/${user.handle}/status/${statusid}"><span class="faketime">· 2h</span></a>
        </div>
        <div class="faketext">${text}</div>
        ${actionrow(["12", "4", "88", "1.2K"])}
      </div>
      <div data-testid="caret">${ICONS.dots}</div>
    `;

    article.querySelector('[data-testid="caret"]').addEventListener("click", e => {
      e.stopPropagation();
      openmenu(e.currentTarget, user);
    });

    return article;
  }

  function build(USERS, TEXTS) {
    const timeline = document.querySelector(".faketimeline");
    if (!timeline) return;
    let sid = 1000000, nexttext = USERS.length;
    const replyafter = [1, 4];
    USERS.forEach((user, i) => {
      timeline.appendChild(buildtweet(user, TEXTS[i], sid++, false));
      if (replyafter.includes(i) && nexttext < TEXTS.length) {
        const replyauthor = USERS[(i + 7) % USERS.length];
        timeline.appendChild(buildtweet(replyauthor, TEXTS[nexttext++], sid++, true));
      }
    });
  }

  fetch("../../assets/static/testline.json")
    .then(r => r.json())
    .then(data => build(data.users, data.texts))
    .catch(e => console.error("[faketwitter] couldn't load assets/static/testline.json:", e));
})();
