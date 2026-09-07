<img src="example.webp">
<h4 align="center">additional info for accounts and an overlay for sorting them!</h4>

drag any profile picture or name to bring up an overlay where you can create folders and categories to add users into.<br>
you might also run into a new <img width="20" src=".github/folder.png"> icon, present in most lists of users on the site, click it to import them as a folder!
<br><br>
as for the user info, some is pulled from twitter's new about menu (for location/installation info), along with:
<ul>
  <li>memory.lol (<a href="https://archive.org/details/twitterstream">username history before 2021</a>),</li>
  <li>breach.vip</li> 
  <li>and a custom api. (<a href="https://haveibeenpwned.com/Breach/Twitter200M">emails</a>)</li>
</ul>
to get better username history results, <a href="https://api.memory.lol/v1/login/google">log in on memory.lol</a>
<hr>
to install on chrome, simply clone the repository, enable developer mode in chrome extensions and "load unpacked", pointing to the cloned repo. <br><br>
to install on firefox, use firefox nightly/dev. if those don't work, then the firefox versions you're installing are too gated and you might need to find a workaround. you can try using the userscript version in releases! <i>(though this one is a bit stripped down due to limitations)</i>
<hr>
<h5>shortcuts:</h5>
<ul>
  <li><code>Ctrl + `</code> opens/closes the overlay from anywhere</li>
  <li>hold <code>Ctrl</code> to hide all elements from the extension</li>
  <sup>(so in case of ctrl+prtsc press the keys at the same time for a screenshot with additional info, and hold ctrl first for a clean one! is that neat? no? ok sorry)</sup>
  <li>while dragging someone: <code>1</code>-<code>9</code> to quick drop into one of the closest 9 folders,  <code>Esc</code> to cancel</li>
  <li>right click a folder, user, category or empty canvas for its menu</li>
  
</ul>

<h5>see also:</h5>
<table>
  <tr valign="center">
    <td>
      <a href="https://github.com/sogful/twitter-flags"><b>@sogful/twitter-flags</b></a><br>
      change twitter feature flag values from a sidebar
    </td>
  </tr>
</table>
