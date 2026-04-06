"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Particle = {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const EMOJIS = ["💗","💖","🐶","🐱","🐰"];

export default function ValentineHero(){

const root = useRef<HTMLDivElement>(null);
const container = useRef<HTMLDivElement>(null);
const mouse = useRef({x:0,y:0});
const particles = useRef<Particle[]>([]);
const raf = useRef<number | null>(null);
const audioRef = useRef<HTMLAudioElement>(null);
const [mounted,setMounted]=useState(false);

const photos = Array.from({length:22}).map((_,i)=>`/photo${i+1}.jpeg`);
const videos = ["/video1.mp4","/video2.mp4","/video3.mp4","/video4.mp4","/video5.mp4"];

useEffect(()=>setMounted(true),[]);

useEffect(()=>{

if(!mounted) return;

if(audioRef.current){
  audioRef.current.volume = 0.5;
  audioRef.current.play().catch(()=>{});
}

gsap.from(".hero-title",{y:80,opacity:0});
gsap.from(".hero-sub",{y:40,opacity:0,delay:.2});
gsap.from(".hero-img",{scale:.85,opacity:0,delay:.4});

gsap.from(".gallery-item",{
scrollTrigger:{trigger:".gallery",start:"top 75%"},
opacity:0,y:60,stagger:.04
});

ScrollTrigger.create({
trigger:".videos",
start:"top 70%",
onEnter:()=>document.querySelectorAll("video").forEach((v:any)=>{v.muted=true;v.loop=true;v.play().catch(()=>{})})
});

const el=container.current!;

window.addEventListener("mousemove",e=>{
const r=el.getBoundingClientRect();
mouse.current={x:e.clientX-r.left,y:e.clientY-r.top};
});

setTimeout(()=>initParticles(),200);

return()=>cancelAnimationFrame(raf.current!);

},[mounted]);

const initParticles=()=>{
const w=container.current!.offsetWidth;
const h=container.current!.offsetHeight;

container.current!.querySelectorAll(".particle").forEach((el:any)=>{
particles.current.push({
el,
x:Math.random()*(w-120),
y:Math.random()*(h-120),
vx:0,
vy:0
});
});

loop();
};

const loop=()=>{
const w=container.current!.offsetWidth;
const h=container.current!.offsetHeight;

particles.current.forEach(a=>{

const dx=a.x-mouse.current.x;
const dy=a.y-mouse.current.y;
const d=Math.sqrt(dx*dx+dy*dy)||1;

if(d<180){
const f=(180-d)/180;
a.vx+=(dx/d)*f*1.2;
a.vy+=(dy/d)*f*1.2;
}

particles.current.forEach(b=>{
if(a!==b){
const cx=a.x-b.x;
const cy=a.y-b.y;
const cd=Math.sqrt(cx*cx+cy*cy);
if(cd<110){
const p=(110-cd)/110;
a.vx+=(cx/cd)*p*.6;
a.vy+=(cy/cd)*p*.6;
}}
});

a.x+=a.vx;
a.y+=a.vy;

a.vx*=.88;
a.vy*=.88;

if(a.x<0||a.x>w-120)a.vx*=-.5;
if(a.y<0||a.y>h-120)a.vy*=-.5;

a.x=Math.max(0,Math.min(w-120,a.x));
a.y=Math.max(0,Math.min(h-120,a.y));

a.el.style.transform=`translate3d(${a.x}px,${a.y}px,0)`;

});

raf.current=requestAnimationFrame(loop);
};

if(!mounted) return null;

return(
<main ref={root} style={main}>

<audio ref={audioRef} src="/background.mp3" loop />

<section style={hero}>
<h1 className="hero-title" style={heroTitle}>Happy Valentine’s Day ❤️</h1>
<p className="hero-sub" style={heroSub}>Every moment with you matters.</p>
<div className="hero-img" style={heroImageWrap}>
<img src="/photo7.jpeg" style={{width:"100%"}}/>
</div>
</section>

<section className="gallery" style={gallerySection}>
<h2 style={sectionTitle}>Our Memories 📸</h2>
<div style={galleryGrid}>
{photos.map((p,i)=><img key={i} src={p} className="gallery-item" style={galleryImg}/>)}
</div>
</section>

<section className="videos" style={videoSection}>
<h2 style={sectionTitle}>Little Moments 🎥</h2>
<div style={videoWrap}>
{videos.map((v,i)=><video key={i} src={v} muted loop autoPlay playsInline controls style={videoCard}/>)}
</div>
</section>

<section style={{minHeight:"100vh"}}>

<div ref={container} style={{
width:"100vw",
height:"100vh",
position:"relative",
overflow:"hidden",
background:"linear-gradient(135deg,#ffd6ea,#ff9ecb,#ff6fa8)",
color:"#fff"
}}>

<h1 style={{textAlign:"center",marginTop:40,fontSize:50,fontWeight:800,color:"#fff"}}>
Us❤️
</h1>

{Array.from({length:10}).map((_,i)=>(
<div key={i} className="particle" style={{position:"absolute",fontSize:42}}>
{EMOJIS[Math.floor(Math.random()*EMOJIS.length)]}
</div>
))}

{photos.map((p,i)=><img key={i} src={p} className="particle" style={float(110)}/>)}
{videos.map((v,i)=><video key={i} src={v} muted loop autoPlay playsInline className="particle" style={float(130)}/> )}

</div>

</section>

</main>
);
}

/* ---------------- STYLES ---------------- */

const main={minHeight:"100vh",background:"linear-gradient(135deg,#ffd6ea,#ff9ecb,#ff6fa8)",overflowX:"hidden",color:"#fff"};
const hero={minHeight:"90vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",color:"#fff"};
const heroTitle={fontSize:"4rem",fontWeight:800,color:"#fff"};
const heroSub={fontSize:"1.3rem",marginBottom:40,color:"#fff"};
const heroImageWrap={maxWidth:600,borderRadius:30,overflow:"hidden"};
const gallerySection={padding:"80px 6%",color:"#fff"};
const sectionTitle={textAlign:"center" as const,fontSize:"2.4rem",marginBottom:40,color:"#fff"};
const galleryGrid={display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:20};
const galleryImg={width:"100%",borderRadius:20};
const videoSection={padding:"80px 10%",textAlign:"center" as const,color:"#fff"};
const videoWrap={display:"flex",gap:30,justifyContent:"center",flexWrap:"wrap" as const};
const videoCard={width:300,borderRadius:20};

function float(w:number){
return{position:"absolute" as const,width:w,borderRadius:14,boxShadow:"0 10px 30px rgba(0,0,0,.25)"};
}
