(function () {
  "use strict";

  const USERS = [
    {handle: "soggycat", name: "soggy cat", color: "#1d9bf0"},
    {handle: "pixelnomad", name: "pixel nomad", color: "#00ba7c"},
    {handle: "duskrunner", name: "dusk runner", color: "#f91880"},
    {handle: "glassmoth", name: "glass moth", color: "#7856ff"},
    {handle: "coldbrewfan", name: "cold brew fan", color: "#ffd400"},
    {handle: "nightbus", name: "night bus", color: "#f4212e"},
    {handle: "papertowns", name: "paper towns", color: "#1d9bf0"},
    {handle: "quietstorm", name: "quiet storm", color: "#00ba7c"}
  ];

  const TEXTS = [
    "just shipped a thing, feels good",
    "does anyone else's brain just stop working after 6pm",
    "replying to this because it's true",
    "hot take: cereal is a soup",
    "3 days into the new keyboard, no regrets",
    "why is everything a subscription now",
    "finally finished the book, 10/10",
    "rain sounds > lofi playlists, fight me"
  ];

  function avatardata(color, initial) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="${color}"/><text x="40" y="52" font-size="34" font-family="Arial" fill="#fff" text-anchor="middle">${initial}</text></svg>`;
    return "data:image/svg+xml;base64," + btoa(svg);
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
      <div role="menuitem">Mute @${user.handle}</div>
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
        <div style="color:#6b7f8e;margin-top:6px;font-size:14px">they won't be able to follow or message you.</div>
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

  function buildtweet(user, text, isreply) {
    const article = document.createElement("article");
    article.setAttribute("data-testid", "tweet");
    article.setAttribute("role", "article");
    if (isreply) article.classList.add("fakereply");

    article.innerHTML = `
      <div class="fakeavatar" data-testid="Tweet-User-Avatar"><img src="${avatardata(user.color, user.name[0].toUpperCase())}"></div>
      <div class="fakebody">
        <div data-testid="User-Name">
          <a role="link" href="/${user.handle}"><span class="fakedisplayname">${user.name}</span></a>
          <a role="link" href="/${user.handle}"><span class="fakehandle">@${user.handle}</span></a>
          <span class="faketime">· 2h</span>
        </div>
        <div class="faketext">${text}</div>
        <div class="fakerow"><span>💬 12</span><span>🔁 4</span><span>♥ 88</span><span>📊 1.2k</span></div>
      </div>
      <div data-testid="caret">⋯</div>
    `;

    article.querySelector('[data-testid="caret"]').addEventListener("click", e => {
      e.stopPropagation();
      openmenu(e.currentTarget, user);
    });

    return article;
  }

  function build() {
    const timeline = document.querySelector(".faketimeline");
    if (!timeline) return;
    USERS.forEach((user, i) => {
      timeline.appendChild(buildtweet(user, TEXTS[i % TEXTS.length], false));
      if (i % 3 === 1) {
        const replyuser = USERS[(i + 3) % USERS.length];
        timeline.appendChild(buildtweet(replyuser, TEXTS[(i + 2) % TEXTS.length], true));
      }
    });
  }

  build();
})();
