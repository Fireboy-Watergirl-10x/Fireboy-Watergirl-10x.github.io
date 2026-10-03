const G=()=>typeof games!=='undefined'&&Array.isArray(games)?games:(Array.isArray(window.games)?window.games:[]);
const safe=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function category(n=''){n=n.toLowerCase();if(/soccer|basket|football|boxing|volley|golf|chess|checkers/.test(n))return'Sports';if(/car|drive|drift|racing|bike|track|road/.test(n))return'Logic & Motion';if(/2048|alchemy|blox|merge|block|puzzle|economical/.test(n))return'Problem Solving';if(/idle|tycoon|mart|farming|mining/.test(n))return'Strategy';return'Interactive';}
function cards(list){return list.map(g=>`<a class="card" href="activity.html?id=${encodeURIComponent(g.identifier)}"><img class="thumb" loading="lazy" src="${safe(g.img)}" alt="${safe(g.name)} activity"><div class="cardBody"><h3>${safe(g.name)}</h3></div></a>`).join('')}
function initActivities(limit){let all=G().filter(g=>g.identifier&&g.name&&g.img&&g.iframe);let box=document.querySelector('#activityGrid'),q=document.querySelector('#activitySearch');if(!box)return;function draw(){let term=(q?.value||'').toLowerCase();let list=all.filter(g=>g.name.toLowerCase().includes(term));if(limit&&!term)list=list.slice(0,limit);box.innerHTML=list.length?cards(list):'<div class="empty">No activities found. Try another search.</div>';}q?.addEventListener('input',draw);draw();let count=document.querySelector('[data-game-count]');if(count)count.textContent=all.length;}
function initGame(){let shell=document.querySelector('#gameMount');if(!shell)return;let id=new URLSearchParams(location.search).get('id');let g=G().find(x=>x.identifier===id);if(!g){shell.innerHTML='<div class="empty">Activity not found.</div>';return;}document.title=`${g.name} Unblocked | Play Online - Fireboy-Watergirl Unblocked`;
let md=document.querySelector('#metaDescription');
if(md)md.content=`Play ${g.name} unblocked online in your browser. Read game details, controls and useful play notes, then explore related activities on Fireboy-Watergirl Unblocked.`.slice(0,158);
let cl=document.querySelector('#canonicalLink');
if(cl)cl.href=`https://Fireboy-Watergirl-10x.github.io/activity.html?id=${encodeURIComponent(g.identifier)}`;
document.querySelector('#gameTitle').textContent=g.name;let catEl=document.querySelector('#gameCat');if(catEl)catEl.textContent=g.category||category(g.name);let cover=document.querySelector('#cover'),img=document.querySelector('#coverImg'),frame=document.querySelector('#player');img.src=g.img;img.alt=g.name;cover.style.setProperty('--bg',`url("${g.img}")`);let urls=[g.iframe];for(let i=2;i<=Number(g.servers||1);i++)if(g['iframe'+i])urls.push(g['iframe'+i]);let active=0,servers=document.querySelector('#servers');if(urls.length>1){servers.innerHTML=urls.map((_,i)=>`<button class="server ${i===0?'active':''}" data-i="${i}">Source ${i+1}</button>`).join('');servers.onclick=e=>{let b=e.target.closest('.server');if(!b)return;active=+b.dataset.i;servers.querySelectorAll('.server').forEach(x=>x.classList.toggle('active',x===b));if(frame.style.display==='block')frame.src=urls[active];};}document.querySelector('#playBtn').onclick=()=>{cover.style.display='none';frame.style.display='block';frame.src=urls[active];};document.querySelector('#fullBtn').onclick=()=>frame.requestFullscreen?.();window.openSelectedGame=()=>{let w=open('about:blank','_blank');if(!w)return;w.document.write(`<title>${safe(g.name)}</title><iframe src="${safe(urls[active])}" style="position:fixed;inset:0;width:100%;height:100%;border:0"></iframe>`);w.document.close();};
document.querySelector('#newBtn').onclick=()=>{window.openAfterAd=true;try{show_preroll()}catch(e){window.openAfterAd=false;window.openSelectedGame();}};let favBtn=document.querySelector('#favBtn');if(favBtn){favBtn.onclick=e=>{let f=JSON.parse(localStorage.getItem('fireboywatergirl10x-favs')||'[]');f=f.includes(id)?f.filter(x=>x!==id):[...f,id];localStorage.setItem('fireboywatergirl10x-favs',JSON.stringify(f));e.currentTarget.textContent=f.includes(id)?'★ Favorite':'☆ Favorite';};let f=JSON.parse(localStorage.getItem('fireboywatergirl10x-favs')||'[]');if(f.includes(id))favBtn.textContent='★ Favorite';}let article=document.querySelector('#gameArticle');
if(article){
  let genre=safe(g.genre||g.category||category(g.name));
  let dev=g.dev?`<p><strong>Developer:</strong> ${safe(g.dev)}${g.releaseDate?` &nbsp; <strong>Release:</strong> ${safe(g.releaseDate)}`:''}${g.build?` &nbsp; <strong>Technology:</strong> ${safe(g.build)}`:''}</p>`:'';
  let about=safe(g.originalAbout||g.about||`${g.name} is part of the browser activity catalog.`);
  let controls=Array.isArray(g.controls)&&g.controls.length?`<h2>${safe(g.name)} controls</h2><ul>${g.controls.map(x=>`<li>${safe(x)}</li>`).join('')}</ul>`:'';
  article.innerHTML=`<h2>About ${safe(g.name)}</h2>${dev}<p>${about}</p><h2>Playing ${safe(g.name)} in your browser</h2><p>${safe(g.name)} is listed in the ${genre} section of Fireboy-Watergirl Unblocked. Use the game prompts as the final reference for controls because embedded builds can vary by version. If the player does not respond immediately, allow the game a moment to load before refreshing the page.</p>${controls}<h2>What to try next</h2><p>The Popular section above is generated from the same catalog, so you can move to another activity without changing the core layout or searching from scratch.</p>`;
}
let related=G().filter(x=>x.identifier!==id&&x.identifier&&x.name&&x.img&&x.iframe).slice().sort((a,b)=>popularityValue(b.popularity)-popularityValue(a.popularity)).slice(0,28);document.querySelector('#related').innerHTML=cards(related);}

;document.addEventListener("DOMContentLoaded",function(){var p=document.getElementById("playBtn"),o=document.getElementById("openBtn");if(p)p.addEventListener("click",function(){try{show_preroll()}catch(e){}});if(o)o.addEventListener("click",function(){try{show_preroll()}catch(e){}});});

function popularityValue(v){
  v=String(v||'').toUpperCase().replace('+','').trim();
  let n=parseFloat(v)||0;
  if(v.includes('B')) n*=1000000000;
  else if(v.includes('M')) n*=1000000;
  else if(v.includes('K')) n*=1000;
  return n;
}
document.addEventListener('DOMContentLoaded',function(){
  const box=document.getElementById('popularGrid');
  if(!box)return;
  const list=G().filter(g=>g.identifier&&g.name&&g.img&&g.iframe)
    .slice().sort((a,b)=>popularityValue(b.popularity)-popularityValue(a.popularity))
    .slice(0,28);
  box.innerHTML=cards(list);
});
