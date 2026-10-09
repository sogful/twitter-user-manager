(function () {
  const O = window.tum._ov;
  const scope = O.scope;
  with (scope) {
  const pendingfolderimages = new Set();
  const folderimageobserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const image = entry.target;
      if (entry.isIntersecting && folderimageinview(image) && root && root.classList.contains("tumactive")) loadfolderimage(image);
    }
  });

  function loadfolderimage(image) {
    if (!image.isConnected) {
      folderimageobserver.unobserve(image);
      pendingfolderimages.delete(image);
      return;
    }
    const source = image.dataset.tumlazy;
    if (!source) return;
    image.removeAttribute("data-tumlazy");
    image.dataset.tumloadedurl = source;
    image.loading = "eager";
    image.src = source;
    folderimageobserver.unobserve(image);
    pendingfolderimages.delete(image);
  }

  function observefolderimages(container) {
    for (const image of container.querySelectorAll("img[data-tumlazy]")) {
      if (pendingfolderimages.has(image)) continue;
      image.loading = "lazy";
      image.decoding = "async";
      pendingfolderimages.add(image);
      folderimageobserver.observe(image);
    }
  }

  function folderimageinview(image) {
    const rect = image.getBoundingClientRect();
    let left = 0, top = 0, right = window.innerWidth, bottom = window.innerHeight;
    if (!rect.width || !rect.height || rect.right <= left || rect.bottom <= top || rect.left >= right || rect.top >= bottom) return false;
    for (let node = image.parentElement; node; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden") return false;
      if (style.overflowX !== "visible") {
        const bounds = node.getBoundingClientRect();
        left = Math.max(left, bounds.left);
        right = Math.min(right, bounds.right);
      }
      if (style.overflowY !== "visible") {
        const bounds = node.getBoundingClientRect();
        top = Math.max(top, bounds.top);
        bottom = Math.min(bottom, bounds.bottom);
      }
      if (node === root) break;
    }
    return rect.right > left && rect.left < right && rect.bottom > top && rect.top < bottom;
  }

  function loadvisiblefolderimages() {
    if (!root || !root.classList.contains("tumactive")) return;
    for (const image of [...pendingfolderimages]) {
      if (!image.isConnected) {
        folderimageobserver.unobserve(image);
        pendingfolderimages.delete(image);
      }
    }
    for (const image of [...pendingfolderimages]) if (folderimageinview(image)) loadfolderimage(image);
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) loadvisiblefolderimages();
  });

  function memberhasbadge(member, type) {
    const badges = Array.isArray(member.badges) ? member.badges : [];
    const verifiedtype = String(member.verifiedtype || "").toLowerCase();
    const kindtype = {blue: "blue", legacy: "verified", business: "verifiedbusiness", government: "verifiedgovernment"}[member.verificationkind];
    if (type === "protected") return !!member.protected || badges.includes("protected");
    if (type === "affiliated") return badges.some(badge => badge && typeof badge === "object" && badge.type === "affiliation");
    if (["blue", "verified", "verifiedbusiness", "verifiedgovernment"].includes(type) && typeof member.verificationkind === "string") {
      return kindtype === type || type === "blue" && member.verificationkind === "legacy" && badgeflag(member.blueverified);
    }
    if (type === "blue" || type === "verified") return false;
    if (type === "verifiedbusiness") return badges.includes(type) || /business/.test(verifiedtype);
    if (type === "verifiedgovernment") return badges.includes(type) || /government/.test(verifiedtype);
    if (type === "translatorunbadged") return String(member.translatortype || "").toLowerCase() === "regular";
    if (type === "translator") {
      const translatortype = String(member.translatortype || "").toLowerCase();
      return translatortype ? translatortype === "badged" : badges.includes(type);
    }
    return badges.includes(type);
  }
  function normalizedsort(f) {return SORTMODES.includes(f.sort) ? f.sort : "new"}
  function sortedmembers(f) {
    let members = Array.isArray(f.members) ? f.members.slice() : [];
    const sort = normalizedsort(f);
    if (sort === "az") members.sort((a, b) => (a.displayname || a.handle).localeCompare(b.displayname || b.handle));
    else if (sort === "za") members.sort((a, b) => (b.displayname || b.handle).localeCompare(a.displayname || a.handle));
    else if (sort === "old") members.reverse();
    const badgefilters = new Set((Array.isArray(f.badgefilters) ? f.badgefilters : [])
      .filter(type => badgefilteroptions.some(option => option.value === type)));
    if (badgefilters.size) members = members.filter(member => [...badgefilters].some(type => memberhasbadge(member, type)));
    return members;
  }

  function closefolderfilters() {
    if (!activefolderfilters) return;
    const button = folderfilterbutton(activefolderfilters);
    if (button) button.setAttribute("aria-expanded", "false");
    if (els.folderfilters) els.folderfilters.hidden = true;
    activefolderfilters = null;
  }
  function folderfilterbutton(folderid) {
    const node = folderfilternode(folderid);
    return node && node.querySelector(".tumfoldersort");
  }
  function folderfilternode(folderid) {
    return (O.foldernodes || []).find(folder => folder.dataset.id === folderid);
  }
  function positionfolderfilters(foldernode) {
    if (!foldernode || !els.folderfilters) return;
    const rect = foldernode.getBoundingClientRect();
    const button = foldernode.querySelector(".tumfoldersort");
    if (!button) return;
    const buttonrect = button.getBoundingClientRect();
    const menu = els.folderfilters;
    menu.style.width = Math.min(window.innerWidth - 16, Math.max(96, foldernode.offsetWidth / 2)) + "px";
    const width = menu.offsetWidth, height = menu.offsetHeight;
    const stickleft = rect.right + width > window.innerWidth - 8;
    const left = stickleft ? Math.max(8, rect.left - width) : rect.right;
    menu.classList.toggle("tumfolderfiltersleft", stickleft);
    const maxtop = Math.max(0, window.innerHeight - height);
    const top = clamp(buttonrect.top, 0, maxtop);
    menu.style.left = left + "px";
    menu.style.top = top + "px";
  }
  function refreshfolderfilters() {
    if (!activefolderfilters) return;
    const folder = tum.folders.get(activefolderfilters);
    const foldernode = folderfilternode(activefolderfilters);
    const button = folderfilterbutton(activefolderfilters);
    if (!folder || !foldernode || !button) {closefolderfilters(); return}
    const menu = els.folderfilters;
    let focus = null;
    if (menu.contains(shadow.activeElement)) {
      const active = shadow.activeElement.closest(".tumfolderfilteroption");
      if (active) focus = {type: active.dataset.sort ? "sort" : "badge", value: active.dataset.sort || active.dataset.badge};
    }
    const selectedsort = normalizedsort(folder);
    const selectedbadges = new Set(Array.isArray(folder.badgefilters) ? folder.badgefilters : []);
    const sortrows = sortoptions.map(option => `<button type="button" class="tumfolderfilteroption tumfoldersortoption" data-sort="${option.value}" aria-pressed="${selectedsort === option.value}"><span class="tumfolderchoicebox">${ICONS.check}</span><span>${T(option.labelkey)}</span></button>`).join("");
    const badgerows = badgefilteroptions.map(option => `<button type="button" class="tumfolderfilteroption tumfolderbadgeoption" data-badge="${option.value}" aria-label="${T(option.labelkey)}" aria-pressed="${selectedbadges.has(option.value)}"><span class="tumfolderchoicebox">${ICONS.check}</span><span class="tumfolderbadgeicon" aria-hidden="true">${option.value === "affiliated" ? `<img src="${DEFAULT_AVATAR}" alt="">` : option.value === "translatorunbadged" ? badgeshtml(["translator"], {translatortype: "regular"}) : badgeshtml([option.value])}</span></button>`).join("");
    menu.innerHTML = `<div class="tumfolderfiltercolumn"><div class="tumfolderfilteroptions" role="group" aria-label="${T("folder.filter.sortgroup")}">${sortrows}</div></div><div class="tumfolderfiltercolumn"><div class="tumfolderfilteroptions tumfolderfilterbadges" role="group" aria-label="${T("folder.filter.badgegroup")}">${badgerows}</div></div>`;
    menu.hidden = false;
    button.setAttribute("aria-expanded", "true");
    positionfolderfilters(foldernode);
    if (focus) {
      const option = [...menu.querySelectorAll(".tumfolderfilteroption")].find(item => item.dataset[focus.type] === focus.value);
      if (option) option.focus({preventScroll: true});
    }
  }
  function ensurefolderfilters() {
    if (els.folderfilters) return els.folderfilters;
    const menu = el("div", "tumfolderfilters");
    menu.hidden = true;
    menu.setAttribute("role", "group");
    menu.setAttribute("aria-label", T("folder.filter.label"));
    menu.addEventListener("pointerdown", e => e.stopPropagation());
    menu.addEventListener("click", e => {
      const sortbutton = e.target.closest(".tumfoldersortoption");
      const badgebutton = e.target.closest(".tumfolderbadgeoption");
      const folder = tum.folders.get(activefolderfilters);
      if (!folder) {closefolderfilters(); return}
      if (sortbutton) {
        const sort = sortbutton.dataset.sort;
        if (folder.sort !== sort) tum.folders.update(folder.id, {sort}, true);
        render();
      } else if (badgebutton) {
        const filters = new Set(Array.isArray(folder.badgefilters) ? folder.badgefilters : []);
        if (filters.has(badgebutton.dataset.badge)) filters.delete(badgebutton.dataset.badge);
        else filters.add(badgebutton.dataset.badge);
        const badgefilters = badgefilteroptions.filter(option => filters.has(option.value)).map(option => option.value);
        tum.folders.update(folder.id, {badgefilters}, true);
        render();
      }
    });
    root.appendChild(menu);
    els.folderfilters = menu;
    return menu;
  }
  function openfolderfilters(folderid) {
    if (activefolderfilters === folderid) {closefolderfilters(); return}
    ensurefolderfilters();
    activefolderfilters = folderid;
    refreshfolderfilters();
  }

  function buildfoldernode(f) {
    const allmembers = Array.isArray(f.members) ? f.members : [];
    const members = sortedmembers(f);
    const node = el("div", "tumfolder");
    if (f.description) node.classList.add("tumfolderhasdesc");
    node.style.setProperty("--tumcolor", f.color);
    const fg = readablefg(f.color);
    node.style.setProperty("--tumheaderfg", fg);
    node.style.setProperty("--tumheaderbtnbg", fg === "#000" ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.25)");
    const scalex = Math.min(2, Math.max(0.5, Number(f.scalex) || 1));
    const scaley = Math.min(2, Math.max(0.5, Number(f.scaley) || 1));
    const uiscale = Math.max(0.75, Math.min(1.25, Math.sqrt(scalex * scaley)));
    node.style.setProperty("--tumfolderuiscale", uiscale.toFixed(3));
    node.style.setProperty("--tumfolderheaderheight", `calc(${scaley * 288 <= 200 ? 36 : 40}px * var(--tumfolderuiscale,1))`);
    node.style.left = (f.x || 0) + "px";
    node.style.top = (f.y || 0) + "px";
    node.style.width = (200 * scalex) + "px";
    node.style.height = (288 * scaley) + "px";
    node.dataset.id = f.id;
    node.innerHTML = `
      <div class="tumfolderhead">
        <div class="tumfoldertitle">
          <div class="tumfoldericoncol">
            ${f.icon ? `<span class="tumfolderactionicon">${iconhtml(f.icon, true)}</span>` : ""}
            <span class="tumfoldercount">${splitcount(members.length)}</span>
          </div>
          <div class="tumfoldertitlelines">
            <div class="tumfoldertoprow">
              <span class="tumfoldername"><span class="tummqinner">${escapehtml(f.name)}</span></span>
            </div>
            ${f.description ? `<div class="tumfolderdesc"><span class="tummqinner">${escapehtml(f.description)}</span></div>` : ""}
          </div>
        </div>
        <div class="tumfolderheadbtns">
          ${f.action ? `<span class="tumfolderaction" aria-label="${escapehtml(T("action.label." + f.action))}">${ICONS[f.action]}</span>` : ""}
        </div>
      </div>
      <div class="tumfoldertools">
        <div class="tumfoldersearchwrap">
          <input class="tumfoldersearch" placeholder="${T("folder.search")}">
          <button type="button" class="tumfolderclear" aria-label="${T("folder.filter.clear")}" hidden>${ICONS.close}</button>
        </div>
        <button type="button" class="tumfoldersort" aria-label="${T("folder.filter.label")}" aria-haspopup="true" aria-expanded="false">${T(SORTLABEL[normalizedsort(f)] || SORTLABEL.added)}</button>
      </div>
      <div class="tumfolderlist"></div>
      <div class="tumfolderresize tumfolderresizew" data-edge="w"></div>
      <div class="tumfolderresize tumfolderresizee" data-edge="e"></div>
      <div class="tumfolderresize tumfolderresizen" data-edge="n"></div>
      <div class="tumfolderresize tumfolderresizes" data-edge="s"></div>
      <div class="tumfolderresize tumfolderresizenw" data-edge="nw"></div>
      <div class="tumfolderresize tumfolderresizene" data-edge="ne"></div>
      <div class="tumfolderresize tumfolderresizesw" data-edge="sw"></div>
      <div class="tumfolderresize tumfolderresizese" data-edge="se"></div>
    `;
    observefolderimages(node);
    const list = node.querySelector(".tumfolderlist");
    if (!members.length) {
      list.appendChild(el("div", "tumfolderempty", allmembers.length ? T("folder.filter.empty") : T("folder.empty")));
    } else {
      const src = {type: "folder", id: f.id};
      const foldercount = tum.folders.list().length;
      const membercap = foldercount > 180 ? 12 : foldercount > 60 ? 24 : MEMBERCAP;
      let shown = Math.min(members.length, Math.max(membercap, showncap.get(f.id) || 0));
      let query = "";
      const matchesquery = member => [
        member.displayname,
        member.handle,
        member.reason,
        member.unfindable ? T("user.unfindable") : ""
      ].join(" ").toLowerCase().includes(query);
      const renderrows = () => {
        const visible = query ? members.filter(matchesquery) : members.slice(0, shown);
        list.replaceChildren(...visible.map(member => buildmemberrow(src, member)));
        if (query && !visible.length) {
          list.appendChild(el("div", "tumfolderempty", T("folder.search.empty")));
          if (root && root.classList.contains("tumactive")) loadvisiblefolderimages();
          return;
        }
        if (!query && members.length > shown) {
          const more = el("div", "tumfoldermore", T("folder.more", members.length - shown));
          more.addEventListener("click", event => {
            event.stopPropagation();
            shown = Math.min(members.length, shown + membercap);
            showncap.set(f.id, shown);
            renderrows();
          });
          list.appendChild(more);
        }
        if (root && root.classList.contains("tumactive")) loadvisiblefolderimages();
      };
      node._tumfiltermembers = value => {
        query = (value || "").trim().toLowerCase();
        renderrows();
      };
      renderrows();
    }
    O.attachfolderresize(node, f);
    O.attachfolderdrag(node, f);
    const sortbutton = node.querySelector(".tumfoldersort");
    sortbutton.addEventListener("pointerdown", e => e.stopPropagation());
    sortbutton.addEventListener("click", e => {
      e.stopPropagation();
      openfolderfilters(f.id);
    });
    const search = node.querySelector(".tumfoldersearch");
    const clearsearch = node.querySelector(".tumfolderclear");
    search.addEventListener("pointerdown", e => e.stopPropagation());
    search.addEventListener("input", e => {
      updatefoldersearchclear(node);
      filterfolderrows(list, e.target.value);
    });
    clearsearch.addEventListener("pointerdown", e => e.stopPropagation());
    clearsearch.addEventListener("click", e => {
      e.stopPropagation();
      search.value = "";
      updatefoldersearchclear(node);
      filterfolderrows(list, "");
      search.focus();
    });
    return node;
  }

  function navigatepath(path) {
    closeoverlay();
    if (tum.sharepage) {
      window.open("https://x.com" + path, "_blank", "noopener,noreferrer");
      return;
    }
    const id = "navigate-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
    let settled = false;
    const fallback = () => {
      if (settled) return;
      settled = true;
      window.removeEventListener("message", reply);
      const link = document.createElement("a");
      link.href = path;
      link.tabIndex = -1;
      link.setAttribute("aria-hidden", "true");
      link.style.cssText = "position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none";
      (document.querySelector("#react-root") || document.body).appendChild(link);
      link.click();
      link.remove();
    };
    const reply = event => {
      const response = event.data;
      if (event.source !== window || !response || response.__tumnavigateresponse !== 1 || response.id !== id) return;
      if (!response.ok) {fallback(); return}
      settled = true;
      clearTimeout(timer);
      window.removeEventListener("message", reply);
    };
    const timer = setTimeout(fallback, 300);
    window.addEventListener("message", reply);
    window.postMessage({__tumnavigate: 1, id, path}, location.origin);
  }
  O.navigatepath = navigatepath;
  function openprofile(source, m) {
    const go = () => {
      navigatepath("/" + encodeURIComponent(m.handle));
    };
    const folder = source && source.type === "folder" ? tum.folders.get(source.id) : null;
    if (folder && folder.action === "block") {
      O.openconfirm({
        title: T("folder.openblocked.title", m.handle),
        body: T("folder.openblocked.body", m.handle),
        oklabel: T("folder.openprofile"),
        positive: true,
        onok: go
      });
    } else go();
  }
  function wireavatar(av, source, m) {
    if (!av) return;
    av.style.cursor = "pointer";
    av.addEventListener("click", e => {e.stopPropagation(); e.preventDefault(); openprofile(source, m)});
  }
  function clearaffiliatetooltip() {
    if (!affiliatetooltip) return;
    affiliatetooltip.remove();
    affiliatetooltip = null;
  }
  function showaffiliatetooltip(badge) {
    clearaffiliatetooltip();
    if (!root || !badge.dataset.affiliatehandle) return;
    const tip = el("div", "tumaffiliatetooltip");
    tip.textContent = "@" + badge.dataset.affiliatehandle;
    root.appendChild(tip);
    const rect = badge.getBoundingClientRect();
    const width = tip.offsetWidth, height = tip.offsetHeight;
    const left = clamp(rect.left + rect.width / 2 - width / 2, 8, Math.max(8, window.innerWidth - width - 8));
    const top = rect.bottom + height + 6 <= window.innerHeight ? rect.bottom + 5 : Math.max(8, rect.top - height - 5);
    tip.style.left = left + "px";
    tip.style.top = top + "px";
    affiliatetooltip = tip;
  }
  function wireaffiliatebadges(container) {
    for (const badge of container.querySelectorAll(".tumaffbadge[data-affiliatehandle]")) {
      badge.addEventListener("pointerdown", e => e.stopPropagation());
      badge.addEventListener("pointerenter", e => {if (e.pointerType !== "touch") showaffiliatetooltip(badge)});
      badge.addEventListener("pointerleave", clearaffiliatetooltip);
      badge.addEventListener("focus", () => showaffiliatetooltip(badge));
      badge.addEventListener("blur", clearaffiliatetooltip);
      badge.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        clearaffiliatetooltip();
        openprofile({type: "page"}, {handle: badge.dataset.affiliatehandle});
      });
    }
  }

  function buildmemberrow(source, m) {
    const row = el("div", "tumfoldermember");
    row.dataset.handle = m.handle;
    const unfindable = m.unfindable === true;
    if (unfindable) row.classList.add("tumunfindable");
    if (isdragged(source, m.handle)) row.style.visibility = "hidden";
    row.innerHTML = `
      <img class="tumfoldermemberavatar" alt="">
      <div class="tumfoldermembertext">
        <div class="tumfoldermembernamerow">
          <span class="tumcopy tumfoldermembername"><span class="tummqinner">${emojihtml(m.displayname || m.handle, true)}</span></span>
          ${badgeshtml(m.badges, m, true)}
          ${m.reason ? `<span class="tumreasonbadge">${ICONS.pencil}</span>` : ""}
        </div>
        <span class="tumcopy tumfoldermemberhandle" data-copy="@${escapehtml(m.handle)}">@${escapehtml(m.handle)}${unfindable ? " (" + T("user.unfindable") + ")" : ""}</span>
      </div>
      <button class="tumfoldermemberremove">${ICONS.close}</button>
    `;
    wirecopy(row);
    wireuserhover(row, m);
    wireaffiliatebadges(row);
    hidebrokenavatar(row, source, m);
    wireavatar(row.querySelector(".tumfoldermemberavatar"), source, m);
    observefolderimages(row);
    if (m.reason) row.querySelector(".tumreasonbadge").addEventListener("click", e => {
      e.stopPropagation();
      O.openreasonview(source, m);
    });
    row.querySelector(".tumfoldermemberremove").addEventListener("click", e => {
      e.stopPropagation();
      tum.folders.removemember(source.id, m.handle);
    });
    O.attachmemberdrag(row, source, m);
    return row;
  }

  function buildloosechip(u) {
    const chip = el("div", "tumloosechip");
    chip.dataset.handle = u.handle;
    const unfindable = u.unfindable === true;
    if (unfindable) chip.classList.add("tumunfindable");
    if (isdragged({type: "unsorted"}, u.handle)) chip.style.visibility = "hidden";
    chip.style.left = (u.x || 0) + "px";
    chip.style.top = (u.y || 0) + "px";
    chip.style.background = tum.theme.css();
    chip.style.setProperty("--tumfg", tum.theme.fg());
    chip.innerHTML = `
      <img class="tumloosechipavatar" alt="">
      <div class="tumloosechipinfo">
        <div class="tumloosechipnamerow">
          <span class="tumcopy tumloosechipname"><span class="tummqinner">${emojihtml(u.displayname || u.handle, true)}</span></span>
          ${badgeshtml(u.badges, u, true)}
          ${u.reason ? `<span class="tumreasonbadge">${ICONS.pencil}</span>` : ""}
        </div>
        <span class="tumcopy tumloosechiphandle" data-copy="@${escapehtml(u.handle)}">@${escapehtml(u.handle)}${unfindable ? " · " + T("user.unfindable") : ""}</span>
      </div>
      <button class="tumloosechipremove">${ICONS.close}</button>
    `;
    wirecopy(chip);
    wireuserhover(chip, u);
    wireaffiliatebadges(chip);
    hidebrokenavatar(chip, {type: "unsorted"}, u);
    wireavatar(chip.querySelector(".tumloosechipavatar"), {type: "unsorted"}, u);
    observefolderimages(chip);
    if (u.reason) chip.querySelector(".tumreasonbadge").addEventListener("click", e => {
      e.stopPropagation();
      O.openreasonview({type: "unsorted"}, u);
    });
    chip.querySelector(".tumloosechipremove").addEventListener("click", e => {
      e.stopPropagation();
      tum.unsorted.remove(u.handle);
    });
    O.attachmemberdrag(chip, {type: "unsorted"}, u);
    return chip;
  }

  function hidebrokenavatar(container, source, user) {
    for (const img of container.querySelectorAll(".tumfoldermemberavatar, .tumloosechipavatar")) {
      const avatar = miniavatarurl(user.avatarurl) || DEFAULT_AVATAR;
      img.dataset.tumlazy = avatar;
      img.dataset.tumloadedurl = avatar;
      img.addEventListener("error", () => {
        if (img.dataset.tumloadedurl === DEFAULT_AVATAR) return;
        img.dataset.tumloadedurl = DEFAULT_AVATAR;
        img.src = DEFAULT_AVATAR;
        if (source && source.type === "folder") tum.folders.refreshmember(user.handle, {handle: user.handle, avatarurl: DEFAULT_AVATAR});
        else if (source && source.type === "unsorted") tum.unsorted.refreshmember(user.handle, {handle: user.handle, avatarurl: DEFAULT_AVATAR});
      }, {once: true});
    }
  }
  function wirecopy(container) {
    for (const t of container.querySelectorAll(".tumcopy")) {
      t.addEventListener("click", e => {
        e.stopPropagation();
        const text = t.dataset.copy || t.textContent || "";
        navigator.clipboard.writeText(text).then(() => toast(T("toast.copied", text))).catch(() => {});
      });
    }
  }

  function formatusercount(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n.toLocaleString("en-US") : String(value);
  }
  function formatuserdate(value) {
    const n = Number(value);
    const d = new Date(Number.isFinite(n) ? (n < 100000000000 ? n * 1000 : n) : value);
    return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric"});
  }
  function userhoverperday(user) {
    const value = Number(user.createdat);
    const date = new Date(Number.isFinite(value) ? (value < 100000000000 ? value * 1000 : value) : user.createdat);
    if (Number.isNaN(date.getTime()) || typeof user.tweets !== "number") return null;
    return (user.tweets / Math.max(1, (Date.now() - date.getTime()) / 86400000)).toFixed(1);
  }
  function appenduserhovertext(row, text) {
    const item = el("span", "tumuserhovertext");
    item.textContent = text;
    row.appendChild(item);
  }
  function appenduserhoverinfo(card, iconpath, text) {
    const row = el("div", "tumuserhoverrow tumuserhoverinfo");
    const iconbox = el("span", "tumuserhovericon");
    iconbox.style.setProperty("--tumhovericon", 'url("' + svgasseturl(iconpath) + '")');
    const value = el("span", "tumuserhovertext");
    value.textContent = text;
    row.append(iconbox, value);
    card.appendChild(row);
  }
  function appenduserhoverrelation(row, value, labelkey) {
    const relation = el("span", "tumuserhoverrelation");
    const count = el("span", "tumuserhovercount");
    count.textContent = formatusercount(value);
    const label = el("span", "tumuserhoverlabel");
    label.textContent = T(labelkey);
    relation.append(count, label);
    row.appendChild(relation);
  }
  function clearuserhover() {
    if (!userhover) return;
    clearTimeout(userhover.timer);
    if (userhover.card) userhover.card.remove();
    userhover = null;
  }
  function hideuserhover(later) {
    if (!userhover) return;
    clearTimeout(userhover.timer);
    const active = userhover;
    const remove = () => {if (userhover === active) clearuserhover()};
    if (later) active.timer = setTimeout(remove, 180);
    else remove();
  }
  function placeuserhover(row, card) {
    card.style.width = "max-content";
    card.style.maxWidth = Math.min(320, (window.innerWidth - 16) / zoom) + "px";
    const bounds = row.getBoundingClientRect();
    const cardbounds = card.getBoundingClientRect();
    const width = cardbounds.width;
    const height = cardbounds.height;
    const right = bounds.right + 4;
    const proposed = right + width <= window.innerWidth - 8 ? right : bounds.left - width - 4;
    const left = Math.max(8, Math.min(proposed, window.innerWidth - width - 8));
    const top = Math.min(Math.max(8, bounds.top), Math.max(8, window.innerHeight - height - 8));
    card.style.left = (left - pan.x) / zoom + "px";
    card.style.top = (top - pan.y) / zoom + "px";
  }
  function showuserhover(row, user) {
    clearuserhover();
    if (!root || state.drag || root.classList.contains("tumdragging", "tumfolderdragging")) return;
    const card = el("div", "tumuserhover");
    card.setAttribute("role", "tooltip");
    const postdetails = [];
    if (typeof user.tweets === "number") postdetails.push(T("profile.posts", formatusercount(user.tweets)));
    const rate = userhoverperday(user);
    if (rate) postdetails.push(T("profile.postrate", rate));
    if (typeof user.highlights === "number") postdetails.push(T(user.highlights === 1 ? "profile.highlight" : "profile.highlights", formatusercount(user.highlights)));
    if (typeof user.favorites === "number") postdetails.push(T("profile.likes", formatusercount(user.favorites)));
    if (postdetails.length) {
      const postrow = el("div", "tumuserhoverrow tumuserhoverposts");
      for (const text of postdetails) appenduserhovertext(postrow, text);
      card.appendChild(postrow);
    }
    if (user.createdat !== undefined && user.createdat !== null && user.createdat !== "") appenduserhoverinfo(card, "assets/svgs/time/Calendar.svg", T("profile.joined", formatuserdate(user.createdat)));
    if (user.userid !== undefined && user.userid !== null && user.userid !== "") appenduserhoverinfo(card, "assets/svgs/navigation/Hash.svg", T("profile.id", user.userid));
    if (typeof user.following === "number" || typeof user.followers === "number") {
      const row = el("div", "tumuserhoverrow tumuserhoverrelations");
      if (typeof user.following === "number") appenduserhoverrelation(row, user.following, "profile.following.label");
      if (typeof user.followers === "number") appenduserhoverrelation(row, user.followers, "profile.followers.label");
      card.appendChild(row);
    }
    if (!card.children.length) return;
    const hoverstate = userhover = {row, card, timer: 0};
    card.addEventListener("pointerenter", () => clearTimeout(hoverstate.timer));
    card.addEventListener("pointerleave", e => {
      if (e.relatedTarget && row.contains(e.relatedTarget)) return;
      hideuserhover(true);
    });
    card.addEventListener("pointerdown", e => e.stopPropagation());
    els.freeform.appendChild(card);
    placeuserhover(row, card);
  }
  function wireuserhover(row, user) {
    row.addEventListener("pointerenter", e => {
      if (e.pointerType === "touch") return;
      if (state.drag || root.classList.contains("tumdragging", "tumfolderdragging")) return;
      if (userhover && userhover.row === row) {clearTimeout(userhover.timer); return}
      clearuserhover();
      const hoverstate = userhover = {row, card: null, timer: 0};
      hoverstate.timer = setTimeout(() => {
        if (userhover === hoverstate && row.isConnected && !state.drag && !state.gesture && !root.classList.contains("tumdragging", "tumfolderdragging")) showuserhover(row, user);
      }, 420);
    });
    row.addEventListener("pointerleave", e => {
      if (userhover && userhover.row === row && e.relatedTarget && userhover.card && userhover.card.contains(e.relatedTarget)) return;
      hideuserhover(true);
    });
    row.addEventListener("pointerdown", () => clearuserhover());
  }

  /*//////////////////////////////////////////////////////////////////////*/

  /*//////////////////////////////////////////////////////////////////////*/

  Object.assign(scope, {memberhasbadge, normalizedsort, sortedmembers, closefolderfilters, folderfilterbutton, folderfilternode, positionfolderfilters, refreshfolderfilters, ensurefolderfilters, openfolderfilters, buildfoldernode, navigatepath, openprofile, wireavatar, loadvisiblefolderimages, clearaffiliatetooltip, showaffiliatetooltip, wireaffiliatebadges, buildmemberrow, buildloosechip, hidebrokenavatar, wirecopy, formatusercount, formatuserdate, userhoverperday, appenduserhovertext, appenduserhoverinfo, appenduserhoverrelation, clearuserhover, hideuserhover, placeuserhover, showuserhover, wireuserhover});
  }
})();
