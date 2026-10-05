(function () {
  window.tum = window.tum || {};
  const O = window.tum._ov = {};
  const scope = O.scope = {};
  with (scope) {
    scope.T = (...a) => tum.strings.t(...a);
    scope.DEFAULT_AVATAR = "https://abs.twimg.com/sticky/default_profile_images/default_profile_0_mini.png";
    scope.AVATARPATH = "https://pbs.twimg.com/profile_images/";

    scope.ICONS = {
    follow: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7"/><line x1="18" y1="8" x2="18" y2="14"/><line x1="15" y1="11" x2="21" y2="11"/></svg>',
    unfollow: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7"/><line x1="15" y1="11" x2="21" y2="11"/></svg>',
    mute: '<svg viewBox="0 0 24 24"><path d="M12 3a5 5 0 0 0-5 5v3.5c0 .9-.4 1.8-1 2.5l-1 1.2c-.5.6 0 1.5.8 1.5h13.4c.8 0 1.3-.9.8-1.5l-1-1.2c-.6-.7-1-1.6-1-2.5V8a5 5 0 0 0-5-5z"/><path d="M9.5 20a2.5 2.5 0 0 0 5 0"/><line x1="3" y1="3" x2="21" y2="21"/></svg>',
    block: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><line x1="5.5" y1="5.5" x2="18.5" y2="18.5"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    close: '<svg viewBox="0 0 24 24"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/></svg>',
    pencil: '<svg viewBox="0 0 24 24"><path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"/><path d="M14 7l3 3"/></svg>',
    chevron: '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 6"/></svg>',
    download: '<svg viewBox="0 0 24 24"><path d="M12 3v12"/><path d="M7 11l5 5 5-5"/><path d="M4 20h16"/></svg>',
    upload: '<svg viewBox="0 0 24 24"><path d="M12 21V9"/><path d="M7 13l5-5 5 5"/><path d="M4 4h16"/></svg>',
    sort: '<svg viewBox="0 0 24 24"><path d="M7 4v16M4 7l3-3 3 3"/><path d="M17 20V4M14 17l3 3 3-3"/></svg>',
    refresh: '<svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 0 0-14.93-4L3 10"/><path d="M3 4v6h6"/><path d="M4 13a8 8 0 0 0 14.93 4L21 14"/><path d="M21 20v-6h-6"/></svg>',
    folder: '<svg viewBox="0 0 24 24"><path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/></svg>',
    profile: '<svg viewBox="0 0 24 24"><path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>',
    calendar: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/></svg>',
    identity: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="11" r="2.5"/><path d="M5.5 18c.7-2.3 2-3.5 3.5-3.5s2.8 1.2 3.5 3.5M15 10h4M15 14h4"/></svg>',
    category: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" stroke-dasharray="3 3"/></svg>',
    gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
  };

  /*//////////////////////////////////////////////////////////////////////*/

    scope.TEXTPNG = chrome.runtime.getURL("assets/images/text.png");
    scope.SORTMODES = ["az", "za", "new", "old"];
    scope.SORTLABEL = {az: "folder.sort.label.az", za: "folder.sort.label.za", new: "folder.sort.label.new", old: "folder.sort.label.old", added: "folder.sort.label.new"};
    scope.sortoptions = [
    {value: "az", labelkey: "folder.filter.sort.nameaz"},
    {value: "za", labelkey: "folder.filter.sort.nameza"},
    {value: "new", labelkey: "folder.filter.sort.newest"},
    {value: "old", labelkey: "folder.filter.sort.oldest"}
  ];
    scope.badgefilteroptions = [
    {value: "verified", labelkey: "folder.filter.badge.verified"},
    {value: "blue", labelkey: "folder.filter.badge.blue"},
    {value: "verifiedbusiness", labelkey: "folder.filter.badge.verifiedbusiness"},
    {value: "verifiedgovernment", labelkey: "folder.filter.badge.verifiedgovernment"},
    {value: "protected", labelkey: "folder.filter.badge.protected"},
    {value: "affiliated", labelkey: "folder.filter.badge.affiliated"},
    {value: "translator", labelkey: "folder.filter.badge.translator"},
    {value: "translatormod", labelkey: "folder.filter.badge.translatormod"}
  ];

    scope.MEMBERCAP = 200; // render cap per folder list
    scope.showncap = new Map();
    scope.THRESHOLD = 6;
    scope.URLRE = /(https?:\/\/[^\s<]+)/g;

    Object.assign(scope, {shadow: null, root: null, host: null});
    scope.els = {};
    scope.activefolderfilters = null;
    scope.userhover = null;
    scope.affiliatetooltip = null;

  const settings = tum.storage.create("tum.settings", {global: true});
    scope.keepopen = true;
  function applysetting(v) {keepopen = v && "keepopen" in v ? !!v.keepopen : true}
  settings.get().then(applysetting);
  settings.subscribe(applysetting);

  const campos = tum.storage.create("tum.campos");
  let campostimer = 0;
  function savecampos() {clearTimeout(campostimer); campostimer = setTimeout(() => {try {campos.set({x: pan.x, y: pan.y})} catch {}}, 400)}
    scope.state = {drag: null, gesture: null, selection: new Set(), open: false, modalopen: false, reasonopen: false, confirmopen: false, editing: null, pendingcreate: null, reasontarget: null, reasonmode: "edit", confirmtarget: null, confirmcancel: null, confirmalternate: null};

  /*//////////////////////////////////////////////////////////////////////*/

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function escapehtml(s) {
    const d = document.createElement("div");
    d.textContent = s == null ? "" : s;
    return d.innerHTML;
  }
  function emojihtml(value) {
    const text = value == null ? "" : String(value);
    const parts = typeof Intl !== "undefined" && Intl.Segmenter ? [...new Intl.Segmenter(undefined, {granularity: "grapheme"}).segment(text)].map(x => x.segment) : Array.from(text);
    return parts.map(part => {
      const emoji = /\p{Emoji_Presentation}/u.test(part) || (/\p{Emoji}/u.test(part) && part.includes("\ufe0f"));
      if (!emoji && !/[\u{1F1E6}-\u{1F1FF}]/u.test(part)) return escapehtml(part);
      const points = [...part].map(c => c.codePointAt(0).toString(16));
      const id = (part.includes("\u200d") ? points : points.filter(c => c !== "fe0f")).join("-");
      return `<img class="tumnameemoji" draggable="false" alt="${escapehtml(part)}" src="https://abs.twimg.com/emoji/v2/svg/${id}.svg">`;
    }).join("");
  }
  function linkify(text) {
    return escapehtml(text).replace(URLRE, u => `<a href="${u}" target="_blank" rel="noopener">${u}</a>`);
  }
  function clamp(v, a, b) {return Math.max(a, Math.min(b, v))}
  function avatarurl(value) {
    return value && !/^https?:\/\//i.test(value) ? AVATARPATH + value : value;
  }
  function miniavatarurl(value) {
    return (avatarurl(value) || "").replace(/_(normal|bigger|mini|x96|reasonably_small|\d+x\d+)(\.(?:jpe?g|png|webp|gif))(?=[?#]|$)/i, "_mini$2");
  }
  function fullavatarurl(value) {
    return (avatarurl(value) || "").replace(/_(normal|bigger|mini|x96|reasonably_small|\d+x\d+)(\.(?:jpe?g|png|webp|gif))(?=[?#]|$)/i, "$2");
  }
  function svgasseturl(path) {
    try {return chrome.runtime.getURL(path)} catch {return "../../" + path}
  }
  function badgeflag(value) {return value === true || value === 1 || String(value || "").toLowerCase() === "true"}
  function badgeshtml(badges, user) {
    function presetvalue(badge) {
      if (typeof badge !== "string") return null;
      if (/^(verified|blue|verifiedbusiness|verifiedgovernment|verifiedaffiliate|translator|translatormod|protected)$/.test(badge)) return badge;
      if (!/<svg\b/i.test(badge)) return null;
      const label = badge.toLowerCase();
      if (/icon-verified|verified account/.test(label)) return /lineargradient/.test(label) ? "verifiedbusiness" : /#829aab/.test(label) ? "verifiedgovernment" : "verified";
      if (/icon-lock|protected account/.test(label)) return "protected";
      if (/translator account/.test(label)) return /moderator|\bmod\b|r-1cvl2hr/.test(label) ? "translatormod" : "translator";
      return null;
    }
    const values = new Set((Array.isArray(badges) ? badges : []).map(presetvalue).filter(Boolean));
    const affiliation = (Array.isArray(badges) ? badges : [])
      .find(badge => badge && badge.type === "affiliation" && /^[A-Za-z0-9_]+$/.test(badge.handle || ""));
    const storedaffiliate = values.delete("verifiedaffiliate");
    const verifiedtype = String(user && user.verifiedtype || "").toLowerCase();
    let affiliate = user && typeof user.affiliateverified === "boolean" ? user.affiliateverified
      : !!(user && (user.verificationkind === "affiliate" || verifiedtype === "affiliate")) || !!affiliation
        || storedaffiliate && !(user && typeof user.verificationkind === "string");
    if (user) {
      if (user.protected) values.add("protected");
      const checkmarktypes = ["blue", "verified", "verifiedbusiness", "verifiedgovernment"];
      const kindbadge = {blue: "blue", legacy: "verified", business: "verifiedbusiness", government: "verifiedgovernment"}[user.verificationkind];
      if (typeof user.affiliateverified !== "boolean") affiliate = affiliate || user.verificationkind === "affiliate";
      if (typeof user.verificationkind === "string") {
        if (user.verificationkind !== "affiliate") {
          for (const type of checkmarktypes) values.delete(type);
          if (kindbadge) values.add(kindbadge);
          if (user.verificationkind === "legacy" && user.blueverified === true) values.add("blue");
        } else if (user.blueverified === true) values.add("blue");
      } else {
        const verifiedtype = String(user.verifiedtype || "").toLowerCase();
        values.delete("blue");
        values.delete("verified");
        if (/government/.test(verifiedtype)) values.add("verifiedgovernment");
        else if (/business/.test(verifiedtype)) values.add("verifiedbusiness");
      }
    }
    const affiliatetint = affiliate && values.has("blue") ? "blue" : null;
    const icons = {
      blue: '<svg viewBox="0 0 24 24" aria-label="Twitter Blue account" role="img"><path d="M16.5 3H2v18h15a5.5 5.5 0 0 0 4.1-9.1v-.4q.9-1.3.9-3c0-3-2.5-5.5-5.5-5.5m-.8 6q.7 0 1.3-.4-.5.8-1.1 1.2v.3c0 3-2.3 6.3-6.4 6.3q-2 0-3.5-1h.5q1.6 0 2.8-1-1.6 0-2-1.5h1c-1-.2-1.9-1.1-1.9-2.2q.5.3 1 .3a2 2 0 0 1-.6-3 7 7 0 0 0 4.6 2.3v-.5c0-1.2 1-2.2 2.2-2.2q1 0 1.7.7l1.4-.5q-.3.8-1 1.2"/></svg>',
      verified: '<svg viewBox="0 0 22 22" aria-label="Verified account" role="img"><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/></svg>',
      verifiedbusiness: '<svg viewBox="0 0 22 22" aria-label="Verified account" role="img"><defs><linearGradient id="tumverifieda" gradientUnits="userSpaceOnUse" x1="4.411" x2="18.083" y1="2.495" y2="21.508"><stop offset="0" stop-color="#f4e72a"/><stop offset=".539" stop-color="#cd8105"/><stop offset=".68" stop-color="#cb7b00"/><stop offset="1" stop-color="#f4ec26"/></linearGradient><linearGradient id="tumverifiedb" gradientUnits="userSpaceOnUse" x1="5.355" x2="16.361" y1="3.395" y2="19.133"><stop offset="0" stop-color="#f9e87f"/><stop offset=".406" stop-color="#e2b719"/><stop offset=".989" stop-color="#e2b719"/></linearGradient></defs><path d="M13.324 3.848L11 1.6 8.676 3.848l-3.201-.453-.559 3.184L2.06 8.095 3.48 11l-1.42 2.904 2.856 1.516.559 3.184 3.201-.452L11 20.4l2.324-2.248 3.201.452.559-3.184 2.856-1.516L18.52 11l1.42-2.905-2.856-1.516-.559-3.184zm-7.09 7.575l3.428 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z" fill="url(#tumverifieda)"/><path d="M13.101 4.533L11 2.5 8.899 4.533l-2.895-.41-.505 2.88-2.583 1.37L4.2 11l-1.284 2.627 2.583 1.37.505 2.88 2.895-.41L11 19.5l2.101-2.033 2.895.41.505-2.88 2.583-1.37L17.8 11l1.284-2.627-2.583-1.37-.505-2.88zm-6.868 6.89l3.429 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z" fill="url(#tumverifiedb)"/><path d="M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill="#000"/></svg>',
      verifiedgovernment: '<svg viewBox="0 0 22 22" aria-label="Verified account" role="img"><path fill-rule="evenodd" d="M12.05 2.056c-.568-.608-1.532-.608-2.1 0l-1.393 1.49c-.284.303-.685.47-1.1.455L5.42 3.932c-.832-.028-1.514.654-1.486 1.486l.069 2.039c.014.415-.152.816-.456 1.1l-1.49 1.392c-.608.568-.608 1.533 0 2.101l1.49 1.393c.304.284.47.684.456 1.1l-.07 2.038c-.027.832.655 1.514 1.487 1.486l2.038-.069c.415-.014.816.152 1.1.455l1.392 1.49c.569.609 1.533.609 2.102 0l1.393-1.49c.283-.303.684-.47 1.099-.455l2.038.069c.832.028 1.515-.654 1.486-1.486L18 14.542c-.015-.415.152-.815.455-1.099l1.49-1.393c.608-.568.608-1.533 0-2.101l-1.49-1.393c-.303-.283-.47-.684-.455-1.1l.068-2.038c.029-.832-.654-1.514-1.486-1.486l-2.038.07c-.415.013-.816-.153-1.1-.456zm-5.817 9.367l3.429 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z"/></svg>',
      translator: '<svg viewBox="0 0 24 24" aria-label="Translator account" role="img"><g><path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.25 10.48L10.5 17.5l-2-1.5v-3.5L7.5 9 5.03 7.59c1.42-2.24 3.89-3.75 6.72-3.84L11 6l-2 .5L8.5 9l5 1.5-1.75 1.73zM17 14v-3l-1.5-3 2.88-1.23c1.17 1.42 1.87 3.24 1.87 5.23 0 1.3-.3 2.52-.83 3.61L17 14z"/></g></svg>',
      translatormod: '<svg viewBox="0 0 24 24" aria-label="Translator account" role="img"><g><path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.25 10.48L10.5 17.5l-2-1.5v-3.5L7.5 9 5.03 7.59c1.42-2.24 3.89-3.75 6.72-3.84L11 6l-2 .5L8.5 9l5 1.5-1.75 1.73zM17 14v-3l-1.5-3 2.88-1.23c1.17 1.42 1.87 3.24 1.87 5.23 0 1.3-.3 2.52-.83 3.61L17 14z"/></g></svg>',
      protected: '<svg viewBox="0 0 24 24" aria-label="Protected account" role="img"><path fill-rule="evenodd" d="M12 1.5c2.761 0 5 2.239 5 5v.745c.22.06.431.138.638.235 1.045.495 1.887 1.337 2.381 2.382.267.563.378 1.165.43 1.849.052.673.051 1.505.051 2.539 0 1.034 0 1.866-.05 2.54-.053.683-.164 1.285-.43 1.848-.495 1.045-1.337 1.887-2.382 2.381-.563.267-1.165.378-1.849.43-.673.052-1.505.051-2.539.051h-2.5c-1.034 0-1.866 0-2.54-.05-.683-.053-1.285-.164-1.848-.43-1.045-.495-1.887-1.337-2.382-2.382-.266-.563-.377-1.165-.43-1.849-.05-.673-.05-1.505-.05-2.539 0-1.034 0-1.866.05-2.54.053-.683.164-1.285.43-1.848.495-1.045 1.337-1.887 2.382-2.382.207-.097.419-.174.638-.235V6.5c0-2.761 2.239-5 5-5zM9.5 15h5v-2h-5v2zM12 3.5c-1.657 0-3 1.343-3 3v.515C9.508 7 10.088 7 10.75 7h2.5l1.405.006c.119.002.234.006.345.009V6.5c0-1.657-1.343-3-3-3z"/></svg>'
    };
    for (const type of Object.keys(icons)) icons[type] = icons[type].replace(/aria-label="[^"]*"/, `aria-label="${escapehtml(T("badge." + type))}"`);
    const badgeclass = {blue: "tumbadgeblue", verifiedgovernment: "tumbadgegov", translatormod: "tumbadgemod", protected: "tumbadgelock"};
    const standard = [...values].map(value => {
      const classes = ["tumbadge", badgeclass[value] || "tumbadge" + value];
      if (value === affiliatetint) classes.push("tumbadgeaffiliate");
      if (value === "translator" && user && user.translatortype === "regular") classes.push("tumbadgetranslatorregular");
      const iconvalue = value === affiliatetint && value === "blue" ? "verified" : value;
      const icon = value === affiliatetint
        ? icons[iconvalue].replace(/aria-label="[^"]*"/, `aria-label="${escapehtml(tum.strings.t("badge.verifiedaffiliate"))}"`)
        : icons[iconvalue];
      return `<span class="${classes.join(" ")}">${icon}</span>`;
    }).join("");
    const linked = affiliation ? `<button type="button" class="tumaffbadge" data-affiliatehandle="${escapehtml(affiliation.handle)}" aria-label="@${escapehtml(affiliation.handle)}"><img src="${escapehtml(miniavatarurl(affiliation.avatarurl))}" alt=""></button>` : "";
    return standard || linked ? `<span class="tumbadges">${standard}${linked}</span>` : "";
  }
  function readablefg(hex) {
    const n = parseInt(hex.replace("#", ""), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 150 ? "#000" : "white";
  }
  function splitcount(n) {
    const s = String(n);
    if (s.length < 4) return s;
    const h = Math.ceil(s.length / 2);
    return s.slice(0, h) + "<br>" + s.slice(h);
  }
  function iconhtml(icon) {
    if (!icon) return "";
    if (icon.startsWith("emoji:")) return `<img class="tumiconemoji" src="${tum.iconpicker.emojiurl(icon.slice(6))}">`;
    if (icon.endsWith(".svg")) return tum.iconpicker.svgfor(icon.startsWith("/") ? "assets/svgs" + icon : icon);
    return escapehtml(icon);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function loadcss() {
    return new Promise(res => {
      let href = "../css/overlay.css";
      try {href = chrome.runtime.getURL("src/css/overlay.css")} catch {}
      fetch(href).then(r => r.text()).then(css => {
        const st = document.createElement("style");
        st.textContent = css;
        shadow.appendChild(st);
        res();
      }).catch(() => res());
    });
  }
  function destroyeravailable() {
    try {const u = chrome.runtime.getURL("desktopdestroyer/index.html"); return !!u && u !== "about:blank"} catch {return false}
  }

  function build() {
    if (document.getElementById("tum-host")) return;
    host = document.createElement("div");
    host.id = "tum-host";
    document.documentElement.appendChild(host);
    shadow = host.attachShadow({mode: "open"});
    loadcss().then(buildmarkup);
  }

  let pinraf = 0;
  function pinhost() {
    pinraf = 0;
    if (!host) return;
    const r = host.getBoundingClientRect();
    const dx = -r.left, dy = -r.top;
    host.style.transform = (dx || dy) ? `translate(${dx}px,${dy}px)` : "";
    const vw = window.innerWidth, vh = window.innerHeight;
    if (Math.round(r.width) !== vw) host.style.width = vw + "px";
    if (Math.round(r.height) !== vh) host.style.height = vh + "px";
  }
  function schedulepin() {if (!pinraf) pinraf = requestAnimationFrame(pinhost)}
  window.addEventListener("scroll", schedulepin, true);
  window.addEventListener("resize", schedulepin);

    scope.pan = {x: 0, y: 0};
    scope.zoom = 1;
    scope.ZMIN = 0.35; scope.ZMAX = 3;
  function applypan() {
    if (els.freeform) {
      els.freeform.style.transformOrigin = "0 0";
      els.freeform.style.transform = `translate(${pan.x}px,${pan.y}px) scale(${zoom})`;
    }
    if (activefolderfilters) positionfolderfilters(folderfilternode(activefolderfilters));
    scheduleminimap();
    if (els.gridlayer) {
      els.gridlayer.style.backgroundPosition = `${pan.x}px ${pan.y}px`;
      els.gridlayer.style.backgroundSize = `${200 * zoom}px ${288 * zoom}px`;
    }
    savecampos();
  }
  function zoomat(sx, sy, factor) {
    const old = zoom;
    zoom = Math.max(ZMIN, Math.min(ZMAX, zoom * factor));
    if (zoom === old) return;
    const cx = (sx - pan.x) / old, cy = (sy - pan.y) / old;
    pan.x = sx - cx * zoom;
    pan.y = sy - cy * zoom;
    applypan();
  }
  function onwheel(e) {
    if (!e.ctrlKey) return;
    if (!state.open || state.modalopen || state.reasonopen || state.confirmopen) return;
    e.preventDefault();
    zoomat(e.clientX, e.clientY, e.deltaY < 0 ? 1.12 : 1 / 1.12);
  }
  function startcamerapan(e) {
    e.preventDefault();
    const startx = e.clientX, starty = e.clientY;
    const ps = {x: pan.x, y: pan.y};
    const move = ev => {pan.x = ps.x + (ev.clientX - startx); pan.y = ps.y + (ev.clientY - starty); applypan()};
    const up = () => {document.removeEventListener("pointermove", move, true); document.removeEventListener("pointerup", up, true); root.classList.remove("tumpanning")};
    root.classList.add("tumpanning");
    document.addEventListener("pointermove", move, true);
    document.addEventListener("pointerup", up, true);
  }

  function updategrid() {
    if (!els.gridlayer) return;
    const w = 200, h = 288, line = "rgba(255,255,255,0.11)";
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><path d='M${w - 0.5} 0V${h}M0 ${h - 0.5}H${w}' fill='none' stroke='${line}' stroke-width='1' stroke-dasharray='7 7'/></svg>`;
    els.gridlayer.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    if (activefolderfilters) positionfolderfilters(folderfilternode(activefolderfilters));
  }
  window.addEventListener("resize", updategrid);

  function attachpan() {
    const bd = els.backdrop;
    root.addEventListener("wheel", onwheel, {passive: false});
    root.addEventListener("pointerdown", e => {if (e.button === 1) {e.preventDefault(); e.stopPropagation(); startcamerapan(e)}}, true);
    bd.addEventListener("mousedown", e => {if (e.button === 1) e.preventDefault()});
    bd.addEventListener("pointerdown", e => {
      if (e.button !== 0) return;
      e.preventDefault();
      try {bd.setPointerCapture(e.pointerId)} catch {}
      const ctxwasdismissed = O._ctxdismiss;
      O._ctxdismiss = false;
      const startx = e.clientX, starty = e.clientY;
      const additive = e.shiftKey || e.ctrlKey || e.metaKey;
      const prior = additive ? new Set(state.selection) : new Set();
      state.gesture = {kind: "selection", pointerid: e.pointerId};
      let selecting = false;
      const move = ev => {
        if (!state.gesture || state.gesture.pointerid !== e.pointerId) return;
        const dx = ev.clientX - startx, dy = ev.clientY - starty;
        if (!selecting) {
          if (Math.hypot(dx, dy) < THRESHOLD) return;
          selecting = true;
          els.selectionbox.hidden = false;
        }
        setselectionbox(startx, starty, ev.clientX, ev.clientY);
      };
      const finish = ev => {
        if (!state.gesture || state.gesture.pointerid !== e.pointerId) return;
        bd.removeEventListener("pointermove", move);
        bd.removeEventListener("pointerup", finish);
        bd.removeEventListener("pointercancel", finish);
        try {bd.releasePointerCapture(e.pointerId)} catch {}
        state.gesture = null;
        els.selectionbox.hidden = true;
        if (selecting && ev.type === "pointerup") selectinrect(startx, starty, ev.clientX, ev.clientY, prior);
        else if (!ctxwasdismissed && ev.type === "pointerup") {
          if (state.selection.size) clearselection();
          else closeoverlay();
        }
      };
      bd.addEventListener("pointermove", move);
      bd.addEventListener("pointerup", finish);
      bd.addEventListener("pointercancel", finish);
    });
  }

  function setupscrolllock() {
    const allow = ev => {
      for (const n of (ev.composedPath ? ev.composedPath() : [])) {
        if (n instanceof Element && (n.classList.contains("tumfolderlist") || n.classList.contains("tumipgrid") || n.classList.contains("tumreasontext"))) return true;
      }
      return false;
    };
    const block = ev => {if (root && root.classList.contains("tumactive") && !allow(ev)) ev.preventDefault()};
    window.addEventListener("wheel", block, {capture: true, passive: false});
    window.addEventListener("touchmove", block, {capture: true, passive: false});
    window.addEventListener("mousedown", ev => {if (ev.button === 1 && root && root.classList.contains("tumactive")) ev.preventDefault()}, {capture: true});
  }
    scope.SCROLLKEYS = new Set([" ", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);

  function wirearrows() {
    const DIRS = {tumedgeup: [0, 1], tumedgedown: [0, -1], tumedgeleft: [1, 0], tumedgeright: [-1, 0]};
    const SPEED = 15;
    for (const arrow of root.querySelectorAll(".tumedgearrow")) {
      const cls = Object.keys(DIRS).find(c => arrow.classList.contains(c));
      if (!cls) continue;
      const [sx, sy] = DIRS[cls];
      arrow.addEventListener("pointerdown", e => {
        if (e.button !== 0) return;
        e.preventDefault();
        let timer = setInterval(() => {pan.x += sx * SPEED; pan.y += sy * SPEED; applypan()}, 16);
        const stop = () => {clearInterval(timer); document.removeEventListener("pointerup", stop); document.removeEventListener("pointercancel", stop)};
        document.addEventListener("pointerup", stop);
        document.addEventListener("pointercancel", stop);
      });
    }
  }

  function buildmarkup() {
    root = el("div", "tumroot");
    O.root = root;
    loadmarkup().then(html => {
      root.innerHTML = html;
      localizemarkup(root);
      const tp = root.querySelector("[data-tumtextpng]");
      if (tp) tp.src = TEXTPNG;
      shadow.appendChild(root);
      wiremarkup();
    });
  }
  function localizemarkup(node) {
    for (const item of node.querySelectorAll("[data-tum-text]")) item.textContent = T(item.dataset.tumText);
    for (const item of node.querySelectorAll("[data-tum-title]")) item.title = T(item.dataset.tumTitle);
    for (const item of node.querySelectorAll("[data-tum-placeholder]")) item.placeholder = T(item.dataset.tumPlaceholder);
    for (const item of node.querySelectorAll("[data-tum-alt]")) item.alt = T(item.dataset.tumAlt);
  }

  let markuphtml = null;
  function loadmarkup() {
    if (markuphtml != null) return Promise.resolve(markuphtml);
    let url = "overlay.html";
    try {url = chrome.runtime.getURL("src/html/overlay.html")} catch {}
    return fetch(url).then(r => r.text()).then(t => {markuphtml = t; return t});
  }
  function wiremarkup() {

    els = O.els = {
      backdrop: root.querySelector(".tumbackdrop"),
      canvas: root.querySelector(".tumcanvas"),
      gridlayer: root.querySelector(".tumgridlayer"),
      freeform: root.querySelector(".tumfreeform"),
      quickadd: root.querySelector(".tumquickadd"),
      quickdelete: root.querySelector(".tumquickdelete"),
      quickreason: root.querySelector(".tumquickreason"),
      chip: root.querySelector(".tumchip"),
      chipavatar: root.querySelector(".tumchipavatar"),
      chipname: root.querySelector(".tumchipname"),
      chipbadges: root.querySelector(".tumchipbadges"),
      chipreason: root.querySelector(".tumchipreason"),
      chiphandle: root.querySelector(".tumchiphandle"),
      modal: root.querySelector(".tummodal"),
      modaliconbtn: root.querySelector(".tummodaliconbtn"),
      modaliconclear: root.querySelector(".tummodaliconclear"),
      modalname: root.querySelector(".tummodalname"),
      modaldesc: root.querySelector(".tummodaldesc"),
      modalclose: root.querySelector(".tummodalclose"),
      modalactions: root.querySelectorAll(".tummodalaction"),
      modalactionsrow: root.querySelector(".tummodalactions"),
      modalcolors: root.querySelector(".tummodalcolors"),
      modalsave: root.querySelector(".tummodalsave"),
      reasonmodal: root.querySelector(".tumreasonmodal"),
      reasontitle: root.querySelector(".tumreasontitle"),
      reasonclose: root.querySelector(".tumreasonclose"),
      reasonview: root.querySelector(".tumreasonview"),
      reasontext: root.querySelector(".tumreasontext"),
      reasonsource: root.querySelector(".tumreasonsource"),
      reasonedit: root.querySelector(".tumreasonedit"),
      reasondelete: root.querySelector(".tumreasondelete"),
      toolgear: root.querySelector(".tumtoolgear"),
      actionbar: root.querySelector(".tumactionbar"),
      actionbtns: [...root.querySelectorAll(".tumactionbtn")],
      actionfollow: root.querySelector(".tumactionfollow"),
      actiondestroy: root.querySelector(".tumactiondestroy"),
      toolclose: root.querySelector(".tumtoolclose"),
      toolexport: root.querySelector(".tumtoolexport"),
      toolimport: root.querySelector(".tumtoolimport"),
      toolfit: root.querySelector(".tumtoolfit"),
      tooljump: root.querySelector(".tumtooljump"),
      jumplist: root.querySelector(".tumjumplist"),
      jumpsearch: root.querySelector(".tumjumpsearch"),
      jumprows: root.querySelector(".tumjumprows"),
      minimap: root.querySelector(".tumminimap"),
      minimapcanvas: root.querySelector(".tumminimapcanvas"),
      reasonform: root.querySelector(".tumreasonform"),
      reasonactions: root.querySelector(".tumreasonactions"),
      reasonactionbtns: root.querySelectorAll(".tumreasonactions .tummodalaction"),
      reasoninput: root.querySelector(".tumreasoninput"),
      reasonsourceinput: root.querySelector(".tumreasonsourceinput"),
      reasonsave: root.querySelector(".tumreasonsave"),
      confirmsheet: root.querySelector(".tumconfirmsheet"),
      confirmtitle: root.querySelector(".tumconfirmtitle"),
      confirmbody: root.querySelector(".tumconfirmbody"),
      confirmok: root.querySelector(".tumconfirmok"),
      confirmsecondary: root.querySelector(".tumconfirmsecondary"),
      confirmcancel: root.querySelector(".tumconfirmcancel"),
      selectionbox: root.querySelector(".tumselectionbox"),
      toast: root.querySelector(".tumtoast")
    };

    for (const c of tum.folders.COLORS) {
      const sw = el("button", "tummodalcolor");
      sw.style.backgroundColor = c;
      sw.dataset.color = c;
      sw.addEventListener("click", () => O.selectcolor(c));
      els.modalcolors.appendChild(sw);
    }
    tum.iconpicker.mount(root);
    tum.iconpicker.onload(ids => {
      const loaded = new Set(ids || []);
      if (tum.folders.list().some(folder => folder.icon && loaded.has(folder.icon))) render();
      if (state.modalopen) O.refreshiconbtn();
    });

    attachpan();
    setupscrolllock();
    wirearrows();

    root.addEventListener("contextmenu", event => {
      if (typeof O.oncontextmenu === "function") O.oncontextmenu(event);
    });
    root.addEventListener("pointerdown", e => {
      let dismiss = false;
      if (activefolderfilters && !e.target.closest(".tumfolderfilters, .tumfoldersort")) {closefolderfilters(); dismiss = true}
      const editing = root.querySelector(".tumcategorytitle.tumediting");
      if (editing && !e.target.closest(".tumcategorytitle")) {editing.blur(); dismiss = true}
      if (O.ctxopen && O.ctxopen() && !e.target.closest(".tumcontextmenu, .tumctxpanel")) {O.closectx(); dismiss = true}
      O._ctxdismiss = dismiss;
    }, true);
    els.modalclose.addEventListener("click", O.closemodal);
    els.modal.addEventListener("click", e => {if (e.target === els.modal) O.closemodal()});
    els.modalsave.addEventListener("click", O.savemodal);
    els.modaliconbtn.addEventListener("click", e => {e.stopPropagation(); tum.iconpicker.open(els.modaliconbtn, id => O.selecticon(id))});
    els.modaliconclear.addEventListener("click", e => {e.stopPropagation(); O.selecticon("")});

    for (const b of els.modalactions) b.addEventListener("click", () => O.toggleaction(b.dataset.action));
    for (const b of els.reasonactionbtns) b.addEventListener("click", () => O.togglereasonaction(b.dataset.action));

    els.reasonclose.addEventListener("click", O.closereasonmodal);
    els.reasonmodal.addEventListener("click", e => {if (e.target === els.reasonmodal) O.closereasonmodal()});
    els.reasonedit.addEventListener("click", () => O.setreasonmode("edit"));
    els.reasondelete.addEventListener("click", O.deletenoteduser);
    els.reasonsave.addEventListener("click", O.savereason);

    els.toolgear.addEventListener("click", () => {
      closeoverlay();
      try {tum.settingspane.open()} catch {}
    });
    els.confirmcancel.addEventListener("click", O.closeconfirmsheet);
    els.confirmsheet.addEventListener("click", e => {if (e.target === els.confirmsheet) O.closeconfirmsheet()});
    els.confirmok.addEventListener("click", () => {
      const fn = state.confirmaction;
      O.closeconfirmsheet(false);
      if (fn) fn();
    });
    els.confirmsecondary.addEventListener("click", () => {
      const fn = state.confirmalternate;
      O.closeconfirmsheet(false);
      if (fn) fn();
    });

    els.quickadd.addEventListener("click", () => {if (!state.drag && !state.gesture) O.opencreatemodal()});
    els.toolclose.addEventListener("click", () => {if (!state.drag && !state.gesture) closeoverlay()});
    els.toolexport.addEventListener("click", O.exportdata);
    els.toolimport.addEventListener("click", O.importdata);
    els.toolfit.addEventListener("click", fitall);
    els.tooljump.addEventListener("click", togglejumplist);
    els.jumpsearch.addEventListener("input", () => buildjumprows(els.jumpsearch.value));
    els.jumpsearch.addEventListener("pointerdown", e => e.stopPropagation());
    attachminimapdrag();

    function applydestroyoption() {
      const on = (!tum.settings || tum.settings.get("destroyoption")) && destroyeravailable();
      els.actiondestroy.style.display = on ? "" : "none";
      els.actionbtns = [...root.querySelectorAll(".tumactionbtn")].filter(b => getComputedStyle(b).display !== "none");
    }
    applydestroyoption();
    if (tum.settings) tum.settings.onchange(applydestroyoption);

    document.addEventListener("keydown", onkeydown, true);
    document.addEventListener("keydown", onpeekdown, true);
    document.addEventListener("keyup", onpeekup, true);
    window.addEventListener("blur", () => {peekkeys.clear(); updatepeek()});

    tum.folders.subscribe(() => schedulerender());
    tum.unsorted.subscribe(() => schedulerender());
    tum.categories.subscribe(() => schedulerender());
    installhistory();
    Promise.all([tum.folders.ready, tum.unsorted.ready, tum.categories.ready]).then(() => {
      render();
      setTimeout(() => {if (!state.open && tum.settings && tum.settings.get("autoopen")) openoverlay()}, 350);
    });

    applytheme();
    updategrid();
    pinhost();
    campos.get().then(v => {if (v && typeof v.x === "number") {pan.x = v.x; pan.y = v.y; applypan()}});
  }

  function applytheme() {
    if (!host) return;
    const p = tum.theme.palette();
    for (const k in p) host.style.setProperty("--tum" + k, p[k]);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function showbackdrop() {
    applytheme();
    root.classList.add("tumactive");
    schedulemarquees([els.freeform]);
  }
  function hidebackdrop() {
    if (state.drag || state.open || state.modalopen || state.reasonopen || state.confirmopen) return;
    root.classList.remove("tumactive");
    O.schedulerestoreall(); 
  }
  function closeoverlay() {
    state.open = false;
    clearuserhover();
    clearaffiliatetooltip();
    closefolderfilters();
    if (O.closectx) O.closectx();
    if (O.closemergepicker) O.closemergepicker();
    if (O.closemodal()) {state.open = true; showbackdrop(); return}
    O.closereasonmodal();
    O.closeconfirmsheet();
    hidebackdrop();
  }

  function openoverlay() {
    state.open = true;
    showbackdrop();
    render();
  }
  function toggleoverlay() {
    if (state.drag || state.gesture) return;
    if (state.open || root.classList.contains("tumactive")) closeoverlay();
    else openoverlay();
  }

  const peekselector = ".tumpagereasonbadge,.tumpageprofilereasonbadge,.tumpageaccountbadge,.tumpagefolderdot," +
    ".tumextrablock,.tumbasedinitem,.tumbasedin,.tumhd,.tumperday,.tumprofilepostdetails,.tumprofessionaldetail," +
    '[data-testid="usermanagerLink"]';
  function ensurehidestyle() {
    if (document.getElementById("tumhideallstyle")) return;
    const st = document.createElement("style");
    st.id = "tumhideallstyle";
    st.textContent = "html.tumhideall " + peekselector.split(",").join(",html.tumhideall ") + "{display:none!important}";
    document.head.appendChild(st);
  }
  const peekkeys = new Set();
  let peekdelay = 0;
  function updatepeek() {
    ensurehidestyle();
    clearTimeout(peekdelay);
    if (!peekkeys.size) {document.documentElement.classList.remove("tumhideall"); return}
    peekdelay = setTimeout(() => {if (peekkeys.size) document.documentElement.classList.add("tumhideall")}, 100);
  }
  function ispeekkey(e) {return e.key === "Control" || e.key === "PrintScreen"}
  function onpeekdown(e) {if (ispeekkey(e)) {peekkeys.add(e.key); updatepeek()}}
  function onpeekup(e) {if (ispeekkey(e)) {peekkeys.delete(e.key); updatepeek()}}

  /*//////////////////////////////////////////////////////////////////////*/

    Object.assign(scope, {applysetting, savecampos, el, escapehtml, emojihtml, linkify, clamp, avatarurl, miniavatarurl, fullavatarurl, svgasseturl, badgeflag, badgeshtml, readablefg, splitcount, iconhtml, loadcss, destroyeravailable, build, pinhost, schedulepin, applypan, zoomat, onwheel, startcamerapan, updategrid, attachpan, setupscrolllock, wirearrows, buildmarkup, localizemarkup, loadmarkup, wiremarkup, applytheme, showbackdrop, hidebackdrop, closeoverlay, openoverlay, toggleoverlay, ensurehidestyle, updatepeek, ispeekkey, onpeekdown, onpeekup});
  }
})();
