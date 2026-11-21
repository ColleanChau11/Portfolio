(function(){
  var hs=[].slice.call(document.querySelectorAll('.dbody h4'));
  if(hs.length<3)return;
  var nav=document.createElement('nav');nav.className='toc';nav.setAttribute('aria-label','On this page');
  var t=document.createElement('p');t.className='toc-t';t.textContent='On this page';nav.appendChild(t);
  var ul=document.createElement('ul');nav.appendChild(ul);
  var links=hs.map(function(h,i){
    var id='s-'+(h.textContent||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||('s'+i);
    h.id=id;
    var li=document.createElement('li'),a=document.createElement('a');
    a.href='#'+id;a.textContent=h.textContent;
    a.addEventListener('click',function(e){
      e.preventDefault();
      var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      h.scrollIntoView({behavior:rm?'auto':'smooth',block:'start'});
    });
    li.appendChild(a);ul.appendChild(li);return a;
  });
  document.body.appendChild(nav);
  function update(){
    var y=window.scrollY+140,cur=0;
    hs.forEach(function(h,i){if(h.getBoundingClientRect().top+window.scrollY<=y)cur=i;});
    if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4)cur=hs.length-1;
    links.forEach(function(a,i){a.classList.toggle('on',i===cur&&window.scrollY>120)});
    nav.classList.toggle('show',window.scrollY>260);
  }
  window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();
})();

(function(){var n=document.querySelector(".nav");if(!n)return;function f(){n.classList.toggle("stuck",window.scrollY>8)}window.addEventListener("scroll",f,{passive:true});f();})();

/* Instagram embeds: paste a post or reel link into data-ig="" on a .ig block.
   With a link the real Instagram player loads; empty blocks show a placeholder. */
(function(){
  var blocks=document.querySelectorAll('.ig');if(!blocks.length)return;
  var any=false;
  blocks.forEach(function(el){
    var url=(el.getAttribute('data-ig')||'').trim();
    if(!/^https:\/\/(www\.)?instagram\.com\/(p|reel|reels|tv)\//.test(url)){
      el.className='ph';el.textContent=el.getAttribute('data-label')||'Add: Instagram link';return;
    }
    url=url.split('?')[0];if(url.slice(-1)!=='/')url+='/';
    var bq=document.createElement('blockquote');bq.className='instagram-media';
    bq.setAttribute('data-instgrm-permalink',url+'?utm_source=ig_embed');bq.setAttribute('data-instgrm-version','14');
    bq.style.cssText='max-width:540px;min-width:280px;width:100%;margin:0 auto';
    var a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener';a.textContent='View on Instagram';
    bq.appendChild(a);el.appendChild(bq);el.setAttribute('data-set','1');any=true;
  });
  if(any){var sc=document.createElement('script');sc.async=true;sc.src='https://www.instagram.com/embed.js';document.body.appendChild(sc);}
})();
