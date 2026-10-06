(function () {
  "use strict";

  window.tum = window.tum || {};

  const T = (...a) => tum.strings.t(...a);
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const FEATURES = '{"rweb_video_screen_enabled":false,"rweb_cashtags_enabled":true,"profile_label_improvements_pcf_label_in_post_enabled":true,"responsive_web_profile_redirect_enabled":true,"rweb_tipjar_consumption_enabled":false,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"rweb_cashtags_composer_attachment_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"responsive_web_grok_annotations_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"rweb_conversational_replies_downvote_enabled":false,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"content_disclosure_indicator_enabled":true,"content_disclosure_ai_generated_indicator_enabled":true,"responsive_web_grok_show_grok_translated_post":true,"responsive_web_grok_analysis_button_from_backend":true,"post_ctas_fetch_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":false,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_grok_imagine_annotation_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":true,"responsive_web_enhance_cards_enabled":false}';
  const CQFEATURES = '{"c9s_list_members_action_api_enabled":false,"c9s_superc9s_indication_enabled":false}';

  const EP = {
    list: {qid: "8rYmkvWQe9jRRZdy_-vkGA", op: "ListMembers", feat: FEATURES, vars: (x, c) => ({listId: x.id, count: 100, cursor: c || undefined})},
    listinfo: {qid: "Tzkkg-NaBi_y1aAUUb6_eQ", op: "ListByRestId", feat: '{"profile_label_improvements_pcf_label_in_post_enabled":true,"responsive_web_profile_redirect_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true}', vars: x => ({listId: x.id})},
    followers: {qid: "mrqxgX8JzwlL6pvYiC5CPA", op: "Followers", feat: FEATURES, vars: (x, c) => ({userId: x.userid, count: 100, includePromotedContent: false, withGrokTranslatedBio: true, cursor: c || undefined})},
    following: {qid: "uwmIAx89XrXNuGY-Y7WFLg", op: "Following", feat: FEATURES, vars: (x, c) => ({userId: x.userid, count: 100, includePromotedContent: false, withGrokTranslatedBio: true, cursor: c || undefined})},
    verified_followers: {qid: "ck_SV_kTAlbD2WZiOFNbzw", op: "BlueVerifiedFollowers", feat: FEATURES, vars: (x, c) => ({userId: x.userid, count: 100, includePromotedContent: false, withGrokTranslatedBio: true, cursor: c || undefined})},
    reposts: {qid: "ROjiuYueotTnWoI8m2YaiQ", op: "Retweeters", feat: FEATURES, vars: (x, c) => ({tweetId: x.id, count: 100, includePromotedContent: false, cursor: c || undefined})},
    people: {qid: "uGB-gNd5HE4TkpO70OcFNw", op: "SearchTimeline", feat: FEATURES, vars: (x, c) => ({rawQuery: x.query, count: 20, product: "People", withDownvotePerspective: false, withReactionsMetadata: false, withReactionsPerspective: false, cursor: c || undefined})},
    members: {qid: "woAp_YdzAdqnWDrqLTNpAw", op: "membersSliceTimeline_Query", feat: null, vars: (x, c) => ({communityId: x.id, cursor: c || null})},
    moderators: {qid: "0oYT9GRiWUhrz5xoqFE9uw", op: "moderatorsSliceTimeline_Query", feat: null, vars: (x, c) => ({communityId: x.id, count: 100, cursor: c || null})}
  };
  const LISTEP = {
    create: {
      qid: "zdGzorOEOslDL4XEbe2INw",
      op: "CreateList",
      features: {
        profile_label_improvements_pcf_label_in_post_enabled: true,
        responsive_web_profile_redirect_enabled: true,
        rweb_tipjar_consumption_enabled: false,
        verified_phone_label_enabled: false,
        responsive_web_graphql_timeline_navigation_enabled: true
      },
      fieldToggles: {withPayments: false, withDmBlocks: false, withAuxiliaryUserLabels: true}
    },
    addmember: {
      qid: "-Kf1YVC1rNKkPvPFk7YXZw",
      op: "ListAddMember",
      features: {
        profile_label_improvements_pcf_label_in_post_enabled: true,
        responsive_web_profile_redirect_enabled: true,
        rweb_tipjar_consumption_enabled: false,
        verified_phone_label_enabled: false,
        responsive_web_graphql_timeline_navigation_enabled: true
      },
      fieldToggles: {withPayments: false, withDmBlocks: false, withAuxiliaryUserLabels: true}
    },
    removemember: {
      qid: "_2o1-wSMWGFSi5HUscn1Hw",
      op: "ListRemoveMember",
      features: {
        profile_label_improvements_pcf_label_in_post_enabled: true,
        responsive_web_profile_redirect_enabled: true,
        rweb_tipjar_consumption_enabled: false,
        verified_phone_label_enabled: false,
        responsive_web_graphql_timeline_navigation_enabled: true
      },
      fieldToggles: {withPayments: false, withDmBlocks: false, withAuxiliaryUserLabels: true}
    },
    update: {
      qid: "oe5s3-_kb6-t8iFv4hLH3A",
      op: "UpdateList",
      features: {
        profile_label_improvements_pcf_label_in_post_enabled: true,
        responsive_web_profile_redirect_enabled: true,
        rweb_tipjar_consumption_enabled: false,
        verified_phone_label_enabled: false,
        responsive_web_graphql_timeline_navigation_enabled: true
      },
      fieldToggles: {withPayments: false, withDmBlocks: false, withAuxiliaryUserLabels: true}
    },
    editbanner: {
      qid: "PSBi0stSrf3-hDy3G_O_0Q",
      op: "EditListBanner",
      features: {
        profile_label_improvements_pcf_label_in_post_enabled: true,
        responsive_web_profile_redirect_enabled: true,
        rweb_tipjar_consumption_enabled: false,
        verified_phone_label_enabled: false,
        responsive_web_graphql_timeline_navigation_enabled: true
      },
      fieldToggles: {withPayments: false, withDmBlocks: false, withAuxiliaryUserLabels: true}
    },
    delete: {
      qid: "UnN9Th1BDbeLjpgjGSpL3Q",
      op: "DeleteList",
      features: {}
    },
    uploadbanner: {op: "UploadListBanner"}
  };
  const CQID = "-ElI1vg3dYbttVMhBhGdLw"; // CommunityQuery

  const useridmap = new Map();
  let listrequestid = 0;
  const listrequests = new Map();
  let graphqlrequestid = 0;
  const graphqlrequests = new Map();
  window.addEventListener("message", e => {
    if (!e.data || e.data.__tumuser !== 1 || !e.data.data) return;
    const d = e.data.data;
    if (d.handle && d.restId) useridmap.set(d.handle.toLowerCase(), String(d.restId));
  });
  window.addEventListener("message", e => {
    const response = e.data;
    if (e.source !== window || !response || response.__tumlistresponse !== 1) return;
    const pending = listrequests.get(response.id);
    if (!pending) return;
    listrequests.delete(response.id);
    clearTimeout(pending.timer);
    if (response.ok) pending.resolve(response.data || {});
    else {
      const error = new Error(response.error || "request failed");
      error.status = response.status || 0;
      error.ratelimited = response.ratelimited === true;
      error.ratelimitreset = response.ratelimitreset || 0;
      error.kind = response.errorkind || "";
      error.path = response.errorpath || [];
      pending.reject(error);
    }
  });
  window.addEventListener("message", e => {
    const response = e.data;
    if (e.source !== window || !response || response.__tumgraphqlresponse !== 1) return;
    const pending = graphqlrequests.get(response.id);
    if (!pending) return;
    graphqlrequests.delete(response.id);
    clearTimeout(pending.timer);
    pending.resolve(response);
  });
  function graphqlrequest(endpoint, variables, operation) {
    const id = "graphql-" + Date.now().toString(36) + "-" + (++graphqlrequestid);
    return new Promise(resolve => {
      let timer = 0;
      const finish = response => {
        clearTimeout(timer);
        graphqlrequests.delete(id);
        if (operation && operation.cancelrequest === cancel) operation.cancelrequest = null;
        resolve(response);
      };
      const cancel = () => {
        if (!graphqlrequests.has(id)) return;
        clearTimeout(timer);
        graphqlrequests.delete(id);
        if (operation && operation.cancelrequest === cancel) operation.cancelrequest = null;
        resolve({ok: false, status: 0, data: null, cancelled: true});
        window.postMessage({__tumgraphqlcancel: 1, id}, location.origin);
      };
      timer = setTimeout(() => finish({ok: false, status: 0, data: null}), 15000);
      graphqlrequests.set(id, {resolve: finish, timer});
      if (operation) operation.cancelrequest = cancel;
      window.postMessage({
        __tumgraphqlrequest: 1,
        id,
        qid: endpoint.qid,
        operation: endpoint.op,
        variables,
        features: endpoint.feat,
        fieldToggles: endpoint.toggles
      }, location.origin);
    });
  }
  const UBSN = {qid: "Gb-d6r0vxPOADdG62OEBpQ", features: '{"hidden_profile_subscriptions_enabled":true,"profile_label_improvements_pcf_label_in_post_enabled":true,"responsive_web_profile_redirect_enabled":true,"rweb_tipjar_consumption_enabled":false,"verified_phone_label_enabled":false,"subscriptions_verification_info_is_identity_verified_enabled":true,"subscriptions_verification_info_verified_since_enabled":true,"highlights_tweets_tab_ui_enabled":true,"responsive_web_twitter_article_notes_tab_enabled":true,"subscriptions_feature_can_gift_premium":true,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true}', toggles: '{"withPayments":false,"withAuxiliaryUserLabels":true}'};
  async function resolveuserid(handle, operation) {
    const cached = useridmap.get(handle.toLowerCase());
    if (cached) return cached;
    try {
      const vars = {screen_name: handle, withGrokTranslatedBio: true};
      const page = await graphqlrequest({qid: UBSN.qid, op: "UserByScreenName", feat: UBSN.features, toggles: UBSN.toggles}, vars, operation);
      const j = page.data;
      let id = "";
      (function w(o) {if (!o || typeof o !== "object" || id) return; if (o.rest_id && o.core && o.core.screen_name) {id = o.rest_id; return} for (const k in o) if (o[k] && typeof o[k] === "object") w(o[k])})(j);
      if (id) {useridmap.set(handle.toLowerCase(), String(id)); return String(id)}
    } catch {}
    return null;
  }
  async function listrequest(endpoint, variables) {
    const id = "list-" + Date.now().toString(36) + "-" + (++listrequestid);
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        listrequests.delete(id);
        reject(new Error("network"));
      }, 15000);
      listrequests.set(id, {resolve, reject, timer});
      window.postMessage({
        __tumlistrequest: 1,
        id,
        operation: endpoint.op,
        variables,
        features: endpoint.features,
        fieldToggles: endpoint.fieldToggles
      }, location.origin);
    });
  }
  function isratelimited(error) {return !!error && (error.status === 429 || error.status === 420 || error.ratelimited === true)}
  function islistpermissionerror(error) {return !!error && (error.kind === "AuthorizationError" || /aren't allowed to add members|not allowed to add members/i.test(String(error.message || "")))}
  function formatlistwait(milliseconds) {
    const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
    return Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0");
  }
  async function waitforlistratelimit(error, operation, attempt, onwait) {
    const reset = Number(error.ratelimitreset) || 0;
    const fallback = Date.now() + Math.min(15 * 60 * 1000, 60000 * 2 ** Math.min(attempt - 1, 4));
    const until = reset > Date.now() ? reset + 2000 : fallback;
    while (!operation.cancelled) {
      const remaining = until - Date.now();
      if (remaining <= 0) return true;
      if (onwait) onwait(formatlistwait(remaining));
      await sleep(Math.min(1000, remaining));
    }
    return false;
  }
  async function retrylistrequest(endpoint, variables, operation, onwait) {
    let attempt = 0;
    while (!operation.cancelled) {
      try {
        await listrequest(endpoint, variables);
        return true;
      } catch (error) {
        if (!isratelimited(error)) throw error;
        attempt++;
        if (!await waitforlistratelimit(error, operation, attempt, onwait)) return false;
      }
    }
    return false;
  }
  async function getlist(id) {
    const result = await graphqlrequest(EP.listinfo, {listId: String(id)});
    if (!result || !result.ok) throw new Error("network");
    const list = result.data && result.data.data && result.data.data.list;
    if (!list) return {exists: false};
    const name = String(list.name || "").trim();
    const mode = String(list.mode || "").toLowerCase();
    if (!name && !mode) return {exists: false};
    if (!name || (mode !== "public" && mode !== "private")) throw new Error("unknown list state");
    return {exists: true, private: mode === "private", name};
  }
  function createdlistid(data) {
    const direct = data && data.data && (data.data.list || (data.data.list_create && data.data.list_create.list));
    if (direct && (direct.id_str || direct.id)) return String(direct.id_str || direct.id);
    let id = "";
    (function walk(value) {
      if (!value || typeof value !== "object" || id) return;
      if (value.__typename === "List" && (value.id_str || value.id)) {
        id = String(value.id_str || value.id);
        return;
      }
      for (const key in value) if (value[key] && typeof value[key] === "object") walk(value[key]);
    })(data);
    return id;
  }

  function folderlistid(folder) {
    const list = folder && folder.twitterlist;
    const id = typeof list === "string" ? list : list && list.id;
    return /^\d+$/.test(String(id || "")) ? String(id) : "";
  }
  async function bannerdata(color) {
    const response = await fetch(chrome.runtime.getURL("assets/images/listbannercolor.png"));
    if (!response.ok) throw new Error("banner unavailable");
    const image = await createImageBitmap(await response.blob());
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d", {willReadFrequently: true});
    context.drawImage(image, 0, 0);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    const match = /^#([0-9a-f]{6})$/i.exec(String(color || ""));
    const target = match ? [0, 2, 4].map(index => parseInt(match[1].slice(index, index + 2), 16)) : [29, 161, 242];
    const shifts = [target[0] - 29, target[1] - 161, target[2] - 242];
    for (let index = 0; index < pixels.data.length; index += 4) {
      pixels.data[index] += shifts[0];
      pixels.data[index + 1] += shifts[1];
      pixels.data[index + 2] += shifts[2];
    }
    context.putImageData(pixels, 0, 0);
    image.close();
    return canvas.toDataURL("image/png").split(",")[1];
  }
  async function uploadlistbanner(listid, color) {
    const uploaded = await listrequest(LISTEP.uploadbanner, {data: await bannerdata(color)});
    if (!uploaded || !uploaded.mediaId) throw new Error("banner upload failed");
    await listrequest(LISTEP.editbanner, {listId: listid, mediaId: String(uploaded.mediaId)});
  }
  async function memberids(members, operation) {
    const ids = new Set();
    let unresolved = 0;
    for (const member of members || []) {
      if (operation && operation.cancelled) break;
      const id = member && (member.userid || (member.handle && await resolveuserid(member.handle, operation)));
      if (id) ids.add(String(id)); else unresolved++;
    }
    return {ids, unresolved};
  }
  async function remotelistids(listid, operation) {
    const ids = new Set();
    let cursor = null;
    const cursors = new Set();
    for (let pagecount = 0; pagecount < 100; pagecount++) {
      if (operation.cancelled) throw new Error("cancelled");
      const page = await eppage(EP.list, {id: listid}, cursor, operation);
      if (operation.cancelled) throw new Error("cancelled");
      if (!page.ok) {
        const error = new Error("list members unavailable");
        error.status = page.status || 0;
        error.ratelimitreset = page.rateLimitReset || 0;
        throw error;
      }
      const previoussize = ids.size;
      for (const user of page.users) if (user && user.userid) ids.add(String(user.userid));
      if (page.users.length < 100 || ids.size === previoussize || !page.cursor || page.cursor === cursor || cursors.has(page.cursor)) break;
      cursors.add(page.cursor);
      cursor = page.cursor;
    }
    return ids;
  }
  async function retryremotelistids(listid, operation, onwait) {
    let attempt = 0;
    while (!operation.cancelled) {
      try {return await remotelistids(listid, operation)}
      catch (error) {
        if (!isratelimited(error)) throw error;
        attempt++;
        if (!await waitforlistratelimit(error, operation, attempt, onwait)) return null;
      }
    }
    return null;
  }

  let listuploading = false, listoperation = null;
  let uploadbar = null, uploadbartimer = 0;
  function wireuploadbardrag(bar) {
    const handle = bar.querySelector(".tumbatchdrag");
    handle.addEventListener("pointerdown", event => {
      if (event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();
      const rect = bar.getBoundingClientRect();
      const startx = event.clientX - rect.left, starty = event.clientY - rect.top;
      bar.style.left = rect.left + "px";
      bar.style.top = rect.top + "px";
      bar.style.right = "auto";
      bar.style.bottom = "auto";
      const move = moveevent => {
        if (moveevent.pointerId !== event.pointerId) return;
        bar.style.left = Math.max(0, Math.min(window.innerWidth - rect.width, moveevent.clientX - startx)) + "px";
        bar.style.top = Math.max(0, Math.min(window.innerHeight - rect.height, moveevent.clientY - starty)) + "px";
      };
      const end = endevent => {
        if (endevent.pointerId !== event.pointerId) return;
        document.removeEventListener("pointermove", move, true);
        document.removeEventListener("pointerup", end, true);
        document.removeEventListener("pointercancel", end, true);
      };
      document.addEventListener("pointermove", move, true);
      document.addEventListener("pointerup", end, true);
      document.addEventListener("pointercancel", end, true);
    });
  }
  function ensureuploadbar() {
    if (uploadbar && document.documentElement.contains(uploadbar)) return uploadbar;
    uploadbar = document.createElement("div");
    uploadbar.className = "tumbatchbar tumlistuploadbar";
    uploadbar.innerHTML = '<div class="tumbatchfill"></div><span class="tumbatchdrag"></span><div class="tumbatchrow"><span class="tumbatchlabel"></span><button type="button" class="tumbatchcancel" hidden>' + T("import.stop") + '</button></div>';
    uploadbar.querySelector(".tumbatchdrag").setAttribute("aria-label", T("settings.repopulate.drag"));
    wireuploadbardrag(uploadbar);
    uploadbar.querySelector(".tumbatchcancel").addEventListener("click", event => {
      if (!listoperation || listoperation.cancelled) return;
      listoperation.cancelled = true;
      event.currentTarget.disabled = true;
      event.currentTarget.textContent = T("toast.twlist.syncstopping");
      if (listoperation.verifyoperation) listoperation.verifyoperation.cancelled = true;
      if (listoperation.cancelrequest) listoperation.cancelrequest();
    });
    try {tum.theme.paint(uploadbar)} catch {}
    document.documentElement.appendChild(uploadbar);
    return uploadbar;
  }
  function removeuploadbar() {
    clearTimeout(uploadbartimer);
    if (uploadbar) {uploadbar.remove(); uploadbar = null}
  }
  function renderuploadbar(added, total, note, cancellable = !!listoperation) {
    clearTimeout(uploadbartimer);
    uploadbartimer = 0;
    const b = ensureuploadbar();
    b.querySelector(".tumbatchfill").style.width = (total ? Math.min(100, Math.round(added / total * 100)) : 0) + "%";
    b.querySelector(".tumbatchlabel").textContent = note || T("toast.twlist.progress", added, total);
    const cancelbutton = b.querySelector(".tumbatchcancel");
    cancelbutton.hidden = !cancellable;
    if (cancellable && listoperation && !listoperation.cancelled) {
      cancelbutton.disabled = false;
      cancelbutton.textContent = T("import.stop");
    } else if (listoperation && listoperation.cancelled) {
      cancelbutton.disabled = true;
      cancelbutton.textContent = T("toast.twlist.syncstopping");
    }
  }
  function finishuploadbar(note) {
    const b = ensureuploadbar();
    b.querySelector(".tumbatchfill").style.width = "100%";
    b.querySelector(".tumbatchlabel").textContent = note;
    b.querySelector(".tumbatchcancel").hidden = true;
    clearTimeout(uploadbartimer);
    uploadbartimer = setTimeout(removeuploadbar, 2600);
  }
  let refreshsequence = 0;
  function refreshcurrentlist(listid) {
    const id = "tumlistrefresh" + Date.now() + (++refreshsequence);
    return new Promise(resolve => {
      const finish = value => {
        clearTimeout(timer);
        window.removeEventListener("message", receive);
        resolve(value);
      };
      const receive = event => {
        const response = event.data;
        if (event.source === window && response && response.__tumlistrefreshresponse === 1 && response.id === id) finish(!!response.ok);
      };
      const timer = setTimeout(() => finish(false), 5000);
      window.addEventListener("message", receive);
      window.postMessage({__tumlistrefresh: 1, id, listid: String(listid)}, location.origin);
    });
  }
  async function uploadfolder(folder, callbacks) {
    if (listuploading) throw new Error("busy");
    const members = Array.isArray(folder && folder.members) ? folder.members : [];
    if (!members.length) throw new Error("empty");
    const onstart = callbacks && typeof callbacks.onstart === "function" ? callbacks.onstart : null;
    const oncreated = callbacks && typeof callbacks.oncreated === "function" ? callbacks.oncreated : null;
    const onprogress = typeof callbacks === "function" ? callbacks : (callbacks && typeof callbacks.onprogress === "function" ? callbacks.onprogress : null);
    const operation = {cancelled: false, cancelrequest: null, verifyoperation: null};
    let listid = "";
    let requested = 0, unresolved = 0, verifiedcount = null, verifyfailed = false, bannerfailed = false, permissiondenied = false;
    listuploading = true;
    listoperation = operation;
    try {
      renderuploadbar(0, members.length, null, false);
      if (onstart) onstart({total: members.length});
      const created = await listrequest(LISTEP.create, {
        isPrivate: true,
        name: (folder.name || T("folder.unnamed")).slice(0, 25),
        description: (folder.description || "").slice(0, 100)
      });
      listid = createdlistid(created);
      if (!listid) throw new Error("missing list id");
      try {
        renderuploadbar(0, members.length, T("toast.twlist.banner"));
        await uploadlistbanner(listid, folder.color);
      } catch {bannerfailed = true}
      if (oncreated) oncreated({id: listid, total: members.length});
      renderuploadbar(0, members.length, null, true);
      const resolved = await memberids(members, operation);
      const ids = resolved.ids;
      unresolved = resolved.unresolved;
      for (const id of ids) {
        if (operation.cancelled) break;
        try {
          const sent = await retrylistrequest(LISTEP.addmember, {listId: listid, userId: id}, operation, wait => {
            renderuploadbar(requested, ids.size, T("toast.twlist.ratelimitedwait", wait), true);
          });
          if (!sent) break;
          requested++;
        } catch (error) {
          if (isratelimited(error)) throw error;
          if (islistpermissionerror(error)) {permissiondenied = true; break}
        }
        renderuploadbar(requested, ids.size);
        if (onprogress) onprogress({added: requested, total: ids.size, skipped: unresolved});
      }
      renderuploadbar(requested, ids.size, T("toast.twlist.verifying"), true);
      const verifyoperation = {cancelled: false, cancelrequest: null};
      operation.verifyoperation = verifyoperation;
      let remote = null;
      try {
        remote = await retryremotelistids(listid, verifyoperation, wait => {
          renderuploadbar(requested, ids.size, T("toast.twlist.ratelimitedwait", wait), true);
        });
      } catch {verifyfailed = true}
      if (remote && !operation.cancelled && !permissiondenied) {
        let missing = [...ids].filter(id => !remote.has(id));
        for (const delay of [1000, 2500]) {
          if (!missing.length || operation.cancelled) break;
          await sleep(delay);
          try {remote = await retryremotelistids(listid, verifyoperation)} catch {verifyfailed = true; remote = null}
          missing = remote ? [...ids].filter(id => !remote.has(id)) : [];
        }
        if (missing.length && remote) {
          for (const id of missing) {
            if (operation.cancelled || !remote) break;
            const sent = await retrylistrequest(LISTEP.addmember, {listId: listid, userId: id}, operation, wait => {
              renderuploadbar(requested, ids.size, T("toast.twlist.ratelimitedwait", wait), true);
            });
            if (!sent) break;
            requested++;
            renderuploadbar(requested, ids.size);
          }
          if (missing.length && !operation.cancelled) {
            try {remote = await retryremotelistids(listid, verifyoperation)} catch {verifyfailed = true; remote = null}
          }
        }
      }
      operation.verifyoperation = null;
      if (remote) verifiedcount = [...ids].filter(id => remote.has(id)).length;
      const result = {id: listid, added: verifiedcount, requested, skipped: verifiedcount == null ? unresolved : unresolved + ids.size - verifiedcount, bannerfailed, cancelled: operation.cancelled, verifyfailed, permissiondenied};
      await refreshcurrentlist(listid);
      if (operation.cancelled) finishuploadbar(T(verifiedcount == null ? "toast.twlist.uploadstoppedunknown" : "toast.twlist.uploadstopped", verifiedcount));
      else if (permissiondenied) finishuploadbar(T("toast.twlist.adddenied"));
      else if (verifyfailed || verifiedcount == null) finishuploadbar(T("toast.twlist.verifyfailed"));
      else if (verifiedcount < ids.size || unresolved) finishuploadbar(T("toast.twlist.partial", verifiedcount, ids.size + unresolved));
      else finishuploadbar(T(bannerfailed ? "toast.twlist.donebannerfailed" : "toast.twlist.done", folder.name || T("folder.unnamed"), verifiedcount));
      return result;
    } catch (error) {
      if (operation.cancelled) {
        finishuploadbar(T(verifiedcount == null ? "toast.twlist.uploadstoppedunknown" : "toast.twlist.uploadstopped", verifiedcount));
        return {id: listid, added: verifiedcount, requested, cancelled: true};
      }
      finishuploadbar(T("toast.twlist.failed"));
      error.batchshown = true;
      throw error;
    } finally {
      if (listoperation === operation) listoperation = null;
      listuploading = false;
    }
  }

  async function syncfolder(folder) {
    const listid = folderlistid(folder);
    if (!listid) throw new Error("missing list id");
    if (listuploading) throw new Error("busy");
    const operation = {cancelled: false, cancelrequest: null};
    listoperation = operation;
    listuploading = true;
    let done = 0, added = 0, removed = 0, totalchanges = 0;
    try {
      renderuploadbar(0, 0, T("toast.twlist.syncchecking"), true);
      const wanted = await memberids(folder.members || [], operation);
      if (operation.cancelled) throw new Error("cancelled");
      const remote = await retryremotelistids(listid, operation, wait => {
        renderuploadbar(0, 0, T("toast.twlist.ratelimitedwait", wait), true);
      });
      if (!remote) throw new Error("cancelled");
      const add = [...wanted.ids].filter(id => !remote.has(id));
      const remove = wanted.unresolved ? [] : [...remote].filter(id => !wanted.ids.has(id));
      const changes = [...add.map(id => ({id, operation: LISTEP.addmember})), ...remove.map(id => ({id, operation: LISTEP.removemember}))];
      totalchanges = changes.length;
      renderuploadbar(0, changes.length, T("toast.twlist.syncprogress", 0, changes.length), true);
      if (!changes.length) {
        finishuploadbar(T("toast.twlist.synced", 0, 0));
        return {added: 0, removed: 0, unresolved: wanted.unresolved};
      }
      for (const change of changes) {
        if (operation.cancelled) break;
        const sent = await retrylistrequest(change.operation, {listId: listid, userId: change.id}, operation, wait => {
          renderuploadbar(done, changes.length, T("toast.twlist.ratelimitedwait", wait), true);
        });
        if (!sent) break;
        done++;
        if (change.operation === LISTEP.addmember) added++; else removed++;
        renderuploadbar(done, changes.length, T("toast.twlist.syncprogress", done, changes.length));
      }
      if (operation.cancelled) {
        finishuploadbar(T("toast.twlist.syncstopped", done));
        return {added, removed, unresolved: wanted.unresolved, cancelled: true};
      }
      renderuploadbar(done, changes.length, T("toast.twlist.syncprogress", done, changes.length));
      await refreshcurrentlist(listid);
      finishuploadbar(T("toast.twlist.synced", added, removed));
      return {added, removed, unresolved: wanted.unresolved};
    } catch (error) {
      if (operation.cancelled) {
        finishuploadbar(T("toast.twlist.syncstopped", 0));
        return {added: 0, removed: 0, cancelled: true};
      }
      if (islistpermissionerror(error)) {
        finishuploadbar(T("toast.twlist.syncdenied"));
        error.batchshown = true;
        throw error;
      }
      finishuploadbar(T("toast.twlist.syncfailed"));
      error.batchshown = true;
      throw error;
    } finally {
      if (listoperation === operation) listoperation = null;
      listuploading = false;
    }
  }

  async function deletelist(folder) {
    const listid = folderlistid(folder);
    if (!listid) throw new Error("missing list id");
    if (listuploading) throw new Error("busy");
    listuploading = true;
    try {await listrequest(LISTEP.delete, {listId: listid})}
    finally {listuploading = false}
  }

  async function setlistprivacy(folder, isprivate) {
    const listid = folderlistid(folder);
    if (!listid) throw new Error("missing list id");
    if (listuploading) throw new Error("busy");
    listuploading = true;
    try {
      await listrequest(LISTEP.update, {listId: listid, isPrivate: !!isprivate});
      await refreshcurrentlist(listid);
      return {id: listid, private: !!isprivate};
    } finally {listuploading = false}
  }

  const importstore = tum.storage.create("tum.importqueue");
  let importing = false, cancel = false, runtoken = 0;
  let bar = null;

  /*//////////////////////////////////////////////////////////////////////*/

  function parseabbrev(text) {
    const m = /([\d,.]+)([KM])?/.exec(text || "");
    if (!m) return 0;
    let n = parseFloat(m[1].replace(/,/g, ""));
    if (!isFinite(n)) return 0;
    const s = (m[2] || "").toUpperCase();
    if (s === "K") n *= 1000; else if (s === "M") n *= 1000000;
    return Math.round(n);
  }
  function listname() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    const h2 = col && col.querySelector('h2[role="heading"]');
    const t = h2 && (h2.textContent || "").trim();
    if (t) return t;
    const dt = (document.title || "").replace(/ \/ (X|Twitter)\s*$/, "").replace(/ on (X|Twitter).*$/, "").trim();
    return dt || T("list.defaultname");
  }
  function membercount() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    if (!col) return 0;
    for (const a of col.querySelectorAll('a[href$="/members"], a[href$="/members/"]')) {
      const n = parseabbrev(a.textContent || "");
      if (n) return n;
    }
    return 0;
  }
  function listdescription() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    if (!col) return "";
    const memlink = col.querySelector('a[href$="/members"], a[href$="/members/"]');
    if (!memlink) return "";
    let card = memlink;
    for (let i = 0; i < 6 && card.parentElement; i++) {
      card = card.parentElement;
      if (card.querySelector("h1, h2, [role=\"heading\"]") && (card.textContent || "").length < 800) break;
    }
    const name = listname();
    for (const d of card.querySelectorAll('div[dir="ltr"]')) {
      if (d.closest('a, button, [role="button"], [role="heading"]')) continue;
      const t = (d.textContent || "").trim();
      if (!t || t === name || t.startsWith("@") || t.length > 200) continue;
      if (/^[\d,.]+[KM]?\s+(Members|Followers)$/i.test(t)) continue;
      return t;
    }
    return "";
  }
  function headername() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    const h2 = col && col.querySelector('h2[role="heading"]');
    return h2 ? (h2.textContent || "").trim() : "";
  }
  function cap(s) {return s ? T("action.label." + s) : s}

  async function communityname(id) {
    try {
      const page = await graphqlrequest({qid: CQID, op: "CommunityQuery", feat: CQFEATURES}, {communityId: id});
      const j = page.data;
      let out = "";
      (function w(o) {if (!o || typeof o !== "object" || out) return; if (o.__typename === "Community" && o.name) {out = o.name; return} for (const k in o) if (o[k] && typeof o[k] === "object") w(o[k])})(j);
      return out;
    } catch {return ""}
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function ensurebar() {
    if (bar && document.documentElement.contains(bar)) return bar;
    bar = document.createElement("div");
    bar.className = "tumbatchbar";
    bar.innerHTML = '<div class="tumbatchfill"></div>' +
      '<div class="tumbatchrow"><span class="tumbatchlabel"></span><button class="tumbatchcancel">' + T("import.stop") + '</button></div>';
    bar.querySelector(".tumbatchcancel").addEventListener("click", () => {cancel = true; try {importstore.set(null)} catch {}});
    try {tum.theme.paint(bar)} catch {}
    document.documentElement.appendChild(bar);
    return bar;
  }
  function renderbar(count, expected, note) {
    const b = ensurebar();
    const pct = expected ? Math.min(100, Math.round(count / expected * 100)) : 0;
    b.querySelector(".tumbatchfill").style.width = pct + "%";
    b.querySelector(".tumbatchlabel").textContent = note || (expected ? T("import.progress.total", count, expected) : T("import.progress", count));
  }
  function removebar() {if (bar) {bar.remove(); bar = null}}

  const mkmember = u => ({...u, sourceurl: "https://x.com/" + u.handle, reason: "", badges: [], unfindable: false});

  /*//////////////////////////////////////////////////////////////////////*/

  function parsepage(j) {
    const users = [];
    let cursor = null;
    (function walk(o) {
      if (!o || typeof o !== "object") return;
      if (o.__typename === "User" && o.core && o.core.screen_name) {
        users.push({
          handle: o.core.screen_name,
          displayname: o.core.name || o.core.screen_name,
          avatarurl: (o.avatar && o.avatar.image_url) || (o.legacy && o.legacy.profile_image_url_https) || null,
          userid: o.rest_id || null,
          createdat: o.core.created_at || (o.legacy && o.legacy.created_at) || null,
          followers: o.relationship_counts && o.relationship_counts.followers != null ? o.relationship_counts.followers : (o.legacy && o.legacy.followers_count),
          following: o.relationship_counts && o.relationship_counts.following != null ? o.relationship_counts.following : (o.legacy && o.legacy.friends_count),
          tweets: o.tweet_counts && o.tweet_counts.tweets != null ? o.tweet_counts.tweets : (o.legacy && o.legacy.statuses_count)
        });
      }
      if (o.cursorType === "Bottom" && o.value) cursor = o.value;
      for (const k in o) {const v = o[k]; if (v && typeof v === "object") walk(v)}
    })(j);
    return {users, cursor};
  }
  async function eppage(ep, ctx, cursor, operation) {
    const vars = ep.vars(ctx, cursor);
    const response = await graphqlrequest(ep, vars, operation);
    const j = response.data;
    const parsed = j ? parsepage(j) : {users: [], cursor: null};
    const ok = response.ok && j && !(j.errors && j.errors.length && parsed.users.length === 0);
    return {ok, status: response.status, rateLimitReset: response.rateLimitReset || 0, users: parsed.users, cursor: parsed.cursor};
  }

  async function runimport(folder, name, expected, pagefn, fallback, job) {
    const token = ++runtoken;
    importing = true; cancel = false; ensureicons();
    const built = Array.isArray(job && job.built) ? job.built : [];
    const seen = new Set(built.map(member => (member.handle || "").toLowerCase()));
    let cursor = job && job.cursor || null, saved = built.length;
    const persistjob = () => {if (job) {job.cursor = cursor; job.built = built; job.ts = Date.now(); try {importstore.set(job)} catch {}}};
    persistjob();
    ensurebar(); renderbar(built.length, expected);
    while (!cancel && token === runtoken) {
      let page;
      try {page = await pagefn(cursor)} catch (e) {break}
      if (page.status === 429 || page.status === 420) {
        renderbar(built.length, expected, T("import.ratelimited"));
        const reset = Number(page.rateLimitReset) || 0;
        await sleep(reset > Date.now() ? Math.max(65000, reset - Date.now() + 2000) : 90000);
        continue;
      }
      if (!page.ok && built.length === 0) {if (token !== runtoken) return; importing = false; if (fallback) {fallback(folder, name, expected); return} break}
      let added = 0;
      for (const u of page.users) {
        const h = (u.handle || "").toLowerCase();
        if (!h || seen.has(h)) continue;
        seen.add(h);
        built.push(mkmember(u));
        added++;
      }
      renderbar(built.length, expected);
      if (built.length - saved >= 300) {tum.folders.update(folder.id, {members: built.slice()}, true); saved = built.length}
      if (!page.cursor || added === 0 || page.cursor === cursor) break;
      cursor = page.cursor;
      persistjob();
      await sleep(700 + Math.random() * 250);
    }
    if (token !== runtoken) {if (built.length) tum.folders.update(folder.id, {members: built}); return}
    if (cancel) {if (built.length) tum.folders.update(folder.id, {members: built}); removebar(); importing = false; return}
    if (built.length === 0 && fallback) {try {importstore.set(null)} catch {}; importing = false; fallback(folder, name, expected); return}
    finishimport(folder, built, name);
  }

  async function startapiimport(folder, name, expected, endpoint, ctx, fallback) {
    const job = {type: "api", folderid: folder.id, name, expected, endpoint, ctx, cursor: null, built: [], ts: Date.now()};
    try {await importstore.set(job)} catch {}
    runimport(folder, name, expected, cursor => eppage(EP[endpoint], ctx, cursor), fallback, job);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  function memberscope() {return document.querySelector('[aria-modal="true"][role="dialog"]') || document.querySelector('[role="dialog"]')}
  function scrollcontainer(scope) {
    const cell = scope && scope.querySelector('[data-testid="UserCell"]');
    let e = cell;
    while (e && e !== scope) {const st = getComputedStyle(e); if (/(auto|scroll)/.test(st.overflowY)) return e; e = e.parentElement}
    return null;
  }
  function handlefromlink(href) {
    const h = (href || "").replace(/^\//, "").replace(/\/$/, "");
    return /^[A-Za-z0-9_]+$/.test(h) && !/^(i|home|explore|search|notifications|messages|settings|compose)$/i.test(h) ? h : null;
  }
  function extractcell(cell) {
    let handle = null;
    for (const a of cell.querySelectorAll('a[href^="/"]')) {const h = handlefromlink(a.getAttribute("href")); if (h) {handle = h; break}}
    if (!handle) {
      const at = [...cell.querySelectorAll("span")].map(s => (s.textContent || "").trim()).find(t => /^@[A-Za-z0-9_]+$/.test(t));
      if (at) handle = at.slice(1);
    }
    if (!handle) return null;
    const img = cell.querySelector("img");
    const texts = [...cell.querySelectorAll("span")].map(s => (s.textContent || "").trim()).filter(Boolean);
    const nm = texts.find(t => t && !t.startsWith("@"));
    return {handle, displayname: nm || handle, avatarurl: img ? img.src : null};
  }
  function harvestcells(seen, built) {
    const scope = memberscope() || document.querySelector('[data-testid="primaryColumn"]');
    if (!scope) return;
    for (const cell of scope.querySelectorAll('[data-testid="UserCell"]')) {
      const u = extractcell(cell);
      if (!u) continue;
      const h = u.handle.toLowerCase();
      if (seen.has(h)) continue;
      seen.add(h);
      built.push(mkmember(u));
    }
  }
  function harvestarticles(seen, built) {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    if (!col) return;
    let boundary = null;
    for (const h of col.querySelectorAll('h2, [role="heading"]')) {if (/discover more/i.test(h.textContent || "")) {boundary = h; break}}
    for (const art of col.querySelectorAll("article")) {
      if (boundary && (art.compareDocumentPosition(boundary) & Node.DOCUMENT_POSITION_PRECEDING)) continue; // "Discover more"
      if (art.closest('[data-testid="placementTracking"]')) continue; // promoted
      if ([...art.querySelectorAll("span")].some(s => !s.children.length && /^(Ad|Promoted)$/.test((s.textContent || "").trim()))) continue;
      const av = art.querySelector('[data-testid^="UserAvatar-Container-"]');
      if (!av) continue;
      const m = /UserAvatar-Container-(.+)$/.exec(av.getAttribute("data-testid") || "");
      if (!m || m[1] === "unknown") continue;
      const handle = m[1], h = handle.toLowerCase();
      if (seen.has(h)) continue;
      seen.add(h);
      const img = av.querySelector("img");
      const nb = art.querySelector('[data-testid="User-Name"]');
      let nm = handle;
      if (nb) {const t = [...nb.querySelectorAll("span")].map(s => (s.textContent || "").trim()).find(x => x && !x.startsWith("@")); if (t) nm = t}
      built.push(mkmember({handle, displayname: nm, avatarurl: img ? img.src : null}));
    }
  }
  async function scrapeimport(folder, expected, name, mode, job) {
    const token = ++runtoken;
    importing = true; cancel = false; ensureicons();
    const built = Array.isArray(job && job.built) ? job.built : [];
    const seen = new Set(built.map(member => (member.handle || "").toLowerCase()));
    const persistjob = () => {if (job) {job.built = built; job.ts = Date.now(); try {importstore.set(job)} catch {}}};
    persistjob();
    const harvest = mode === "articles" ? harvestarticles : harvestcells;
    ensurebar(); renderbar(built.length, expected);
    let last = 0, stagnant = 0, saved = 0;
    for (let w = 0; w < 30 && !cancel && token === runtoken; w++) {
      const s = memberscope() || document.querySelector('[data-testid="primaryColumn"]');
      if (s && (s.querySelector('[data-testid="UserCell"]') || s.querySelector("article"))) break;
      await sleep(400);
    }
    let iters = 0;
    while (!cancel && token === runtoken) {
      harvest(seen, built);
      const scope = memberscope();
      if (scope) {const sc = scrollcontainer(scope); if (sc) sc.scrollTop = sc.scrollHeight; else {const cs = scope.querySelectorAll('[data-testid="UserCell"]'); if (cs.length) cs[cs.length - 1].scrollIntoView()}}
      else window.scrollTo(0, document.documentElement.scrollHeight);

      await sleep(document.hidden ? 1300 : 650);
      harvest(seen, built);
      renderbar(built.length, expected);
      persistjob();
      if (built.length - saved >= 300) {tum.folders.update(folder.id, {members: built.slice()}, true); saved = built.length; persistjob()}

      if (built.length === last) {if (!document.hidden) stagnant++} else stagnant = 0;
      last = built.length;
      if (expected && built.length >= expected) break;
      if (!document.hidden && built.length > 0 && stagnant >= 6) break;
      if (!document.hidden && stagnant >= 12) break;
      if (++iters > 9000) break;
    }
    if (token !== runtoken) {if (built.length) tum.folders.update(folder.id, {members: built}); return}
    if (cancel) {if (built.length) tum.folders.update(folder.id, {members: built}); removebar(); importing = false; return}
    finishimport(folder, built, name);
  }

  async function startscrapeimport(folder, expected, name, mode) {
    const job = {type: "scrape", folderid: folder.id, expected, name, mode, built: [], ts: Date.now()};
    try {await importstore.set(job)} catch {}
    scrapeimport(folder, expected, name, mode, job);
  }

  /*//////////////////////////////////////////////////////////////////////*/

  const pendingstore = tum.storage.create("tum.listpendingimport");
  function startscrapefallback(listid, folderid, name, expected) {
    try {pendingstore.set({listid, folderid, name, expected, ts: Date.now()})} catch {}
    removebar();
    try {tum.overlay.toast(T("import.fallback"))} catch {}
    location.href = "/i/lists/" + listid + "/members";
  }
  async function resumescrape() {
    let p;
    try {p = await pendingstore.get()} catch {p = null}
    if (!p || !p.listid) return;
    if (location.pathname.indexOf("/i/lists/" + p.listid) !== 0) {
      if (Date.now() - (p.ts || 0) > 90000) {try {pendingstore.set(null)} catch {}}
      return;
    }
    try {pendingstore.set(null)} catch {}
    startscrapeimport(tum.folders.get(p.folderid) || {id: p.folderid}, p.expected, p.name, "usercells");
  }
  async function resumeapiimport() {
    let job = null;
    try {job = await importstore.get()} catch {}
    if (!job || !job.folderid || !Array.isArray(job.built)) return;
    const folder = tum.folders.get(job.folderid);
    if (!folder) {try {importstore.set(null)} catch {}; return}
    if (job.type === "scrape") {scrapeimport(folder, job.expected, job.name, job.mode, job); return}
    if (job.type !== "api" || !EP[job.endpoint]) return;
    const fallback = job.endpoint === "list" ? (f, n, e) => startscrapefallback(job.ctx.id, f.id, n, e) : (f, n, e) => startscrapeimport(f, e, n, "usercells");
    runimport(folder, job.name, job.expected, cursor => eppage(EP[job.endpoint], job.ctx, cursor), fallback, job);
  }

  function finishimport(folder, built, name) {
    tum.folders.update(folder.id, {members: built});
    try {importstore.set(null)} catch {}
    removebar();
    importing = false;
    autoaction(folder, built);
    try {
      tum.overlay.toast(cancel ? T("import.stopped", built.length, name) : T("import.done", built.length, name), folder.action ? null : {
        label: T("action.undo"),
        onclick: () => tum.folders.remove(folder.id)
      });
    } catch {}
    setTimeout(() => {try {tum.overlay.open()} catch {}}, 400);
    ensureicons();
  }
  function autoaction(folder, built) {
    const f = tum.folders.get(folder.id);
    if (!f || !f.action || !built.length || cancel) return;
    const handles = built.map(m => m.handle);
    const run = () => {try {tum.actions.enqueue(f.action, handles)} catch {}};
    if (built.length > 200) {
      try {
        tum.overlay.confirm({
          title: T("action.confirm.title", cap(f.action), built.length),
          body: T("action.confirm.body", T("action.verb." + f.action), built.length),
          oklabel: T("action.confirm.ok", cap(f.action)),
          positive: f.action === "follow",
          onok: run
        });
      } catch {run()}
    } else run();
  }

  /*//////////////////////////////////////////////////////////////////////*/

  const RESERVED = /^(i|home|explore|search|notifications|messages|settings|compose|hashtag)$/i;
  const FOLLOWLABEL = {followers: "list.followers", following: "list.following", verified_followers: "list.verifiedfollowers"};

  function headerrow() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    const back = col && col.querySelector('[data-testid="app-bar-back"]');
    const row = back && back.parentElement && back.parentElement.parentElement;
    if (!row || row.children.length < 2) return null;
    const last = row.lastElementChild;
    if (last.querySelector('[data-testid$="-button"], [aria-label="More"], [aria-label="Share post"], button')) return {parent: row, before: last};
    if (last.tagName === "DIV" && !last.children.length && !(last.textContent || "").trim() && last.getBoundingClientRect().width < 90) return {parent: last, before: null};
    return {parent: row, before: null};
  }
  function dialogrow() {
    const dlg = document.querySelector('[aria-modal="true"][role="dialog"]') || document.querySelector('[role="dialog"]');
    if (!dlg) return null;
    const close = dlg.querySelector('[data-testid="app-bar-close"], [aria-label="Close"]');
    const row = close && close.parentElement;
    return row ? {parent: row, before: null} : null;
  }
  function replyfilterrow() {
    const col = document.querySelector('[data-testid="primaryColumn"]');
    if (!col) return null;
    let filter = null;
    for (const b of col.querySelectorAll('button[aria-haspopup="menu"], [role="button"]')) {
      const t = (b.textContent || "").trim();
      if (/^(Relevant|Most recent|Liked|Recency|Likes)$/i.test(t)) {filter = b; break}
    }
    if (!filter) return null;
    const colw = col.getBoundingClientRect().width || 600;
    let row = filter.parentElement;
    for (let i = 0; i < 5 && row && row !== col; i++) {
      if (row.getBoundingClientRect().width >= colw * 0.7) break;
      row = row.parentElement;
    }
    if (!row) return null;
    let child = filter;
    while (child.parentElement && child.parentElement !== row) child = child.parentElement;
    return {parent: row, before: child.nextSibling};
  }

  function searchboxrow() {
    const input = document.querySelector('[data-testid="SearchBox_Search_Input"]');
    const label = input && input.closest('[data-testid="SearchBox_Search_Input_label"]');
    return label ? {parent: label} : null;
  }

  const SURFACES = [
    {
      key: "list",
      match: () => {const m = /^\/i\/lists\/(\d+)$/.exec(location.pathname); return m ? {id: m[1]} : null},
      anchor: headerrow,
      meta: () => ({name: listname(), description: listdescription()}),
      start: (folder, ctx) => startapiimport(folder, listname(), membercount(), "list", ctx, (f, n, e) => startscrapefallback(ctx.id, f.id, n, e))
    },
    {
      key: "follows",
      match: () => {const m = /^\/([A-Za-z0-9_]+)\/(followers|following|verified_followers)$/.exec(location.pathname); return (m && !RESERVED.test(m[1])) ? {user: m[1], kind: m[2]} : null},
      anchor: headerrow,
      meta: ctx => ({name: (headername() || "@" + ctx.user) + " " + T(FOLLOWLABEL[ctx.kind]), description: "(@" + ctx.user + ")"}),
      start: async (folder, ctx, meta) => {
        const uid = await resolveuserid(ctx.user);
        if (uid) {ctx.userid = uid; startapiimport(folder, meta.name, 0, ctx.kind, ctx, (f, n, e) => startscrapeimport(f, e, n, "usercells"))}
        else startscrapeimport(folder, 0, meta.name, "usercells");
      }
    },
    {
      key: "community",
      match: () => {const m = /^\/i\/communities\/(\d+)\/(members|moderators)$/.exec(location.pathname); return m ? {id: m[1], kind: m[2]} : null},
      anchor: headerrow,
      meta: async ctx => {const nm = await communityname(ctx.id); return {name: (nm || T("list.defaultcommunity")) + " " + T("list.community." + ctx.kind), description: "(" + ctx.id + ")"}},
      start: (folder, ctx, meta) => startscrapeimport(folder, 0, meta.name, "usercells")
    },
    {
      key: "reposts",
      match: () => {const m = /^\/([A-Za-z0-9_]+)\/status\/(\d+)\/(retweets|reposts)$/.exec(location.pathname); return m ? {user: m[1], id: m[2]} : null},
      anchor: () => dialogrow() || headerrow(),
      meta: ctx => ({name: T("list.reposters", ctx.user), description: "(" + ctx.id + ")"}),
      start: (folder, ctx, meta) => startapiimport(folder, meta.name, 0, "reposts", ctx, (f, n, e) => startscrapeimport(f, e, n, "usercells"))
    },
    {
      key: "quotes",
      match: () => {const m = /^\/([A-Za-z0-9_]+)\/status\/(\d+)\/quotes$/.exec(location.pathname); return m ? {user: m[1], id: m[2]} : null},
      anchor: headerrow,
      meta: ctx => ({name: T("list.quoters", ctx.user), description: "(" + ctx.id + ")"}),
      start: (folder, ctx, meta) => startscrapeimport(folder, 0, meta.name, "articles")
    },
    {
      key: "replies",
      match: () => {const m = /^\/([A-Za-z0-9_]+)\/status\/(\d+)$/.exec(location.pathname); return (m && replyfilterrow()) ? {user: m[1], id: m[2]} : null},
      anchor: replyfilterrow,
      variant: "tumimportgrey",
      meta: ctx => ({name: "@" + ctx.user + " repliers", description: "(" + ctx.id + ")"}),
      start: (folder, ctx, meta) => startscrapeimport(folder, 0, meta.name, "articles")
    },
    {
      key: "people",
      match: () => {
        const params = new URLSearchParams(location.search);
        const query = params.get("q");
        return location.pathname === "/search" && params.get("f") === "user" && query ? {query} : null;
      },
      anchor: searchboxrow,
      variant: "tumimportsearch",
      meta: ctx => ({name: T("list.people.search", ctx.query), description: ""}),
      start: (folder, ctx, meta) => startapiimport(folder, meta.name, 0, "people", ctx, (folder, name, expected) => startscrapeimport(folder, expected, name, "usercells"))
    }
  ];

  const FOLDERSVG = '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2zm2 5 4 4h-3v4h-2v-4H8l4-4z"/></svg>';

  async function beginimport(surface) {
    const ctx = surface.match();
    if (!ctx) return;
    let meta;
    try {meta = await surface.meta(ctx)} catch {meta = {name: T("list.imported"), description: ""}}
    let center = null;
    try {center = tum.overlay.canvascenter()} catch {}
    tum.overlay.opencreatemodal({
      name: meta.name || T("list.imported"),
      description: meta.description || "",
      x: center ? center.x - 100 : undefined,
      y: center ? center.y - 144 : undefined,
      oncreate: folder => {try {surface.start(folder, ctx, meta)} catch {}}
    });
  }

  function makeicon(surface) {
    const b = document.createElement("button");
    b.className = "tumimportfolder" + (surface.variant ? " " + surface.variant : "");
    b.dataset.surface = surface.key;
    b.type = "button";
    b.title = T("import.btn");
    b.setAttribute("aria-label", T("import.btn"));
    b.innerHTML = FOLDERSVG;
    b.addEventListener("click", e => {e.preventDefault(); e.stopPropagation(); beginimport(surface)});
    return b;
  }
  function ensureicons() {
    const active = SURFACES.find(s => s.match());
    let existing = document.querySelector(".tumimportfolder");
    if (!active) {if (existing) existing.remove(); return}
    const anchor = active.anchor();
    if (existing && (!anchor || existing.dataset.surface !== active.key || existing.parentElement !== anchor.parent)) {
      existing.remove();
      existing = null;
    }
    if (existing) {existing.classList.toggle("tumbusy", importing); return}
    if (!anchor || !anchor.parent) return;
    const icon = makeicon(active);
    if (anchor.before) anchor.parent.insertBefore(icon, anchor.before); else anchor.parent.appendChild(icon);
    icon.classList.toggle("tumbusy", importing);
  }

  let scheduled = 0;
  function schedule() {if (!scheduled) scheduled = setTimeout(() => {scheduled = 0; ensureicons()}, 150)}

  window.tum.graphql = graphqlrequest;
  window.tum.lists = {
    uploadfolder, syncfolder, setlistprivacy, refreshcurrentlist, folderlistid, getlist, deletelist,
    init() {
      window.addEventListener("popstate", schedule);
      new MutationObserver(schedule).observe(document.body, {childList: true, subtree: true});
      schedule();
      setTimeout(() => {try {resumescrape(); resumeapiimport()} catch {}}, 1500);
    }
  };
})();
