import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

try {
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap";
  document.head.appendChild(l);
} catch (e) {}

// ─── Floating Paths Background ────────────────────────────────────────────────

function FloatingPaths({ position }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    opacity: 0.06 + i * 0.012,
    width: 0.4 + i * 0.03,
  }));
  return (
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
      <svg style={{width:"100%",height:"100%"}} viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="#7fffd4"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.3, opacity: 0.4 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, path.opacity, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + (path.id % 10),
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html,body,#root{height:100%;overflow:hidden;}
body{background:#08080b;}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes drawLine{from{stroke-dashoffset:400}to{stroke-dashoffset:0}}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(127,255,212,0.3)}50%{box-shadow:0 0 0 8px rgba(127,255,212,0)}}
@keyframes slideIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
@keyframes barFill{from{width:0}to{width:var(--w)}}
@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-9px)}}
@keyframes ripple{0%{transform:scale(0.8);opacity:1}100%{transform:scale(2.4);opacity:0}}
@keyframes scanPulse{0%,100%{opacity:0.4}50%{opacity:1}}
@keyframes floatUp{from{opacity:0;transform:translateZ(-60px) translateY(20px)}to{opacity:1;transform:translateZ(0) translateY(0)}}
@keyframes blockIn{from{opacity:0;transform:scale(0.86)}to{opacity:1;transform:scale(1)}}
@keyframes slidePanel{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes backdropIn{from{opacity:0}to{opacity:1}}
@keyframes modalIn{from{opacity:0;transform:translate(-50%,-48%) scale(0.94)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}

.wcard{background:linear-gradient(160deg,#111116 0%,#0c0c10 100%);border:0.5px solid rgba(255,255,255,0.07);border-radius:16px;box-shadow:0 40px 80px rgba(0,0,0,0.6),0 0 0 0.5px rgba(127,255,212,0.05) inset;position:relative;overflow:hidden;}
.wcard::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.01) 2px,rgba(255,255,255,0.01) 4px);pointer-events:none;}
.dbtn{background:rgba(255,255,255,0.03);border:0.5px solid rgba(255,255,255,0.08);border-radius:10px;color:#ece9e4;cursor:pointer;padding:11px 14px;text-align:left;transition:all 0.18s ease;font-family:'DM Sans',sans-serif;width:100%;}
.dbtn:hover{background:rgba(127,255,212,0.07);border-color:rgba(127,255,212,0.28);transform:translateX(3px);}
.dbtn:hover .di{color:#7fffd4!important;}
.tbtn{background:rgba(255,255,255,0.03);border:0.5px solid rgba(255,255,255,0.08);border-radius:10px;color:#ece9e4;cursor:pointer;padding:13px 14px;text-align:left;transition:all 0.2s ease;font-family:'DM Sans',sans-serif;position:relative;overflow:hidden;}
.tbtn:hover{background:rgba(127,255,212,0.06);border-color:rgba(127,255,212,0.22);}
.tbtn.sel{background:rgba(127,255,212,0.1);border-color:rgba(127,255,212,0.45);}
.tbtn.loading-state{pointer-events:none;opacity:0.6;}
.hcta{background:linear-gradient(25deg,rgb(0, 0, 0) 0%, #82261E 70%);border:0.5px solid rgba(130,38,30,0.45);border-radius:8px;color:#F0F5F3;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;letter-spacing:0.02em;padding:8px 18px;transition:all 0.18s;}
.hcta:hover{background:linear-gradient(25deg,rgb(0, 0, 0) 0%, #9a2f24 70%);border-color:rgba(130,38,30,0.62);color:#F0F5F3;}
.rbtn{background:rgba(127,255,212,0.07);border:0.5px solid rgba(127,255,212,0.22);border-radius:8px;color:#7fffd4;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.08em;padding:7px 14px;transition:all 0.18s;}
.rbtn:hover{background:rgba(127,255,212,0.14);}
.pbtn{background:rgba(127,255,212,0.12);border:0.5px solid rgba(127,255,212,0.4);border-radius:10px;color:#7fffd4;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:12px 28px;transition:all 0.2s;letter-spacing:0.02em;}
.pbtn:hover{background:rgba(127,255,212,0.2);transform:scale(1.02);}
.pbtn:disabled{opacity:0.55;cursor:not-allowed;transform:none;}
.accentbtn{background:linear-gradient(25deg,rgb(0, 0, 0) 0%, #82261E 70%);border:0.5px solid rgba(130,38,30,0.45);color:#F0F5F3;}
.accentbtn:hover{background:linear-gradient(25deg,rgb(0, 0, 0) 0%, #9a2f24 70%);border-color:rgba(130,38,30,0.62);color:#F0F5F3;}
.abtn{background:transparent;border:none;color:#5a5a62;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:400;letter-spacing:0.01em;padding:8px 14px;transition:color 0.18s;}
.abtn:hover{color:#ece9e4;}

/* ── Contact form inputs ── */
.cinput{width:100%;background:rgba(255,255,255,0.04);border:0.5px solid rgba(255,255,255,0.1);border-radius:8px;color:#ece9e4;font-family:'DM Sans',sans-serif;font-size:13px;padding:10px 14px;outline:none;transition:border-color 0.18s,background 0.18s;appearance:none;-webkit-appearance:none;resize:vertical;}
.cinput:focus{border-color:rgba(127,255,212,0.45);background:rgba(127,255,212,0.025);}
.cinput::placeholder{color:#2a2a3a;}
.cinput option{background:#111116;color:#ece9e4;}
.live-scroll::-webkit-scrollbar{width:3px;}
.live-scroll::-webkit-scrollbar-track{background:transparent;}
.live-scroll::-webkit-scrollbar-thumb{background:rgba(127,255,212,0.2);border-radius:3px;}
.live-scroll::-webkit-scrollbar-thumb:hover{background:rgba(127,255,212,0.4);}
`;


// ─── Data ─────────────────────────────────────────────────────────────────────

const DEPTS = [
  { id:"product",    label:"Product",    icon:"◈", sub:"Roadmap · Sprint cycles · Feedback" },
  { id:"growth",     label:"Growth",     icon:"◎", sub:"Lead scoring · Outreach · Attribution" },
  { id:"operations", label:"Operations", icon:"⬡", sub:"Approval chains · Runbooks · Reporting" },
  { id:"finance",    label:"Finance",    icon:"◉", sub:"Reconciliation · Forecasting · Alerts" },
  { id:"marketing",  label:"Marketing",  icon:"◫", sub:"Campaigns · Content · Analytics" },
];

const DEPT_TOOLS = {
  product:[
    {id:"tasks",    label:"Task Board",      icon:"⬚", desc:"Sprint kanban & priorities",    color:"#7fffd4"},
    {id:"roadmap",  label:"Roadmap",         icon:"◫", desc:"Milestones & release timeline", color:"#a78bfa"},
    {id:"docs",     label:"Sprint Docs",     icon:"▤", desc:"Meeting notes & spec briefs",   color:"#7fffd4"},
    {id:"wiki",     label:"Team Wiki",       icon:"◈", desc:"Knowledge base & SOPs",         color:"#fbbf24"},
    {id:"retro",    label:"Retrospective",   icon:"◎", desc:"Team health & learnings board", color:"#a78bfa"},
    {id:"prs",      label:"PR Tracker",      icon:"⬡", desc:"Reviews & deploy pipeline",     color:"#7fffd4"},
  ],
  growth:[
    {id:"pipeline", label:"Lead Pipeline",   icon:"◉", desc:"CRM stages & deal tracking",   color:"#7fffd4"},
    {id:"outreach", label:"Outreach Flows",  icon:"◎", desc:"Sequences & message templates",color:"#a78bfa"},
    {id:"analytics",label:"Attribution",     icon:"◈", desc:"Channel & source performance", color:"#7fffd4"},
    {id:"abtests",  label:"A/B Tests",       icon:"⬡", desc:"Experiment tracking board",    color:"#fbbf24"},
    {id:"funnel",   label:"Funnel View",     icon:"◫", desc:"Conversion stage analysis",    color:"#a78bfa"},
    {id:"reports",  label:"Growth Reports",  icon:"▤", desc:"Weekly & monthly summaries",   color:"#7fffd4"},
  ],
  operations:[
    {id:"procs",    label:"Process Library", icon:"⬡", desc:"Documented workflows & SOPs", color:"#7fffd4"},
    {id:"approvals",label:"Approvals",       icon:"◉", desc:"Request & sign-off chains",    color:"#a78bfa"},
    {id:"calendar", label:"Resource Board",  icon:"◫", desc:"Team capacity & scheduling",  color:"#7fffd4"},
    {id:"vendors",  label:"Vendor Tracker",  icon:"◈", desc:"Contracts & renewal alerts",  color:"#fbbf24"},
    {id:"kpis",     label:"KPI Dashboard",   icon:"▤", desc:"Operational metrics live",    color:"#a78bfa"},
    {id:"incidents",label:"Incident Log",    icon:"◎", desc:"Issues, status & resolution", color:"#7fffd4"},
  ],
  finance:[
    {id:"budget",   label:"Budget Tracker",  icon:"◉", desc:"Spend vs plan by category",  color:"#7fffd4"},
    {id:"invoices", label:"Invoice Auto",    icon:"▤", desc:"Generation & approval flows", color:"#a78bfa"},
    {id:"expenses", label:"Expense Reports", icon:"◫", desc:"Submission & reimbursement", color:"#7fffd4"},
    {id:"forecast", label:"Forecast Model",  icon:"◈", desc:"Rolling 90-day projections", color:"#fbbf24"},
    {id:"audit",    label:"Audit Trail",     icon:"⬡", desc:"Change log & compliance",     color:"#a78bfa"},
    {id:"payroll",  label:"Payroll View",    icon:"◎", desc:"Cycle tracking & approvals", color:"#7fffd4"},
  ],
  marketing:[
    {id:"campaigns",label:"Campaign Board",  icon:"◎", desc:"Multi-channel launch tracker",color:"#7fffd4"},
    {id:"content",  label:"Content Calendar",icon:"◫", desc:"Publishing & asset pipeline",color:"#a78bfa"},
    {id:"assets",   label:"Asset Library",   icon:"◈", desc:"Brand files & media hub",    color:"#7fffd4"},
    {id:"dashb",    label:"Analytics Hub",   icon:"▤", desc:"Performance across channels",color:"#fbbf24"},
    {id:"briefs",   label:"Brief Templates", icon:"⬡", desc:"Campaign & creative briefs", color:"#a78bfa"},
    {id:"social",   label:"Social Planner",  icon:"◉", desc:"Posts, schedule & captions", color:"#7fffd4"},
  ],
};

const JOURNEY = [
  { num:"01", title:"Meet the Team",       desc:"Align on goals, map stakeholders & existing tools",   dur:"Week 1",  color:"#7fffd4" },
  { num:"02", title:"Map Workflows",       desc:"Audit pain points, identify automation opportunities",  dur:"Wk 1–2",  color:"#a78bfa" },
  { num:"03", title:"Build Prototype",     desc:"First workspace draft, core automations wired up",     dur:"Wk 2–3",  color:"#7fffd4" },
  { num:"04", title:"Customize & Iterate", desc:"Feedback loops, refinement, edge cases covered",       dur:"Wk 3–5",  color:"#fbbf24" },
  { num:"05", title:"Team Onboarding",     desc:"Training sessions, docs written, adoption tracked",    dur:"Week 6",  color:"#a78bfa" },
  { num:"06", title:"Workspace Live",      desc:"Handoff, go-live & continuous improvement cycle",      dur:"Week 7+", color:"#7fffd4" },
];

// ─── Mini Tool Panels ─────────────────────────────────────────────────────────

function PanelTasks() {
  const cols={Todo:["Design review","API docs","UX audit"],InProgress:["Auth flow","Testing"],Done:["Setup","Wireframes","DB schema"]};
  const colors={Todo:"#5a5a62",InProgress:"#a78bfa",Done:"#7fffd4"};
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,height:"100%"}}>
      {Object.entries(cols).map(([col,items])=>(
        <div key={col}>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:colors[col],letterSpacing:"0.08em",marginBottom:6}}>{col.toUpperCase()}</div>
          {items.map((t,i)=>(
            <div key={t} style={{background:"rgba(255,255,255,0.04)",border:`0.5px solid ${col==="Done"?"rgba(127,255,212,0.15)":"rgba(255,255,255,0.07)"}`,borderRadius:5,padding:"5px 7px",marginBottom:4,fontSize:10,color:col==="Done"?"#4a4a52":"#ece9e4",textDecoration:col==="Done"?"line-through":"none",fontFamily:"'DM Sans',sans-serif",animation:`slideIn 0.4s ${i*0.08}s ease both`}}>
              {t}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function PanelRoadmap() {
  const items=[{label:"Q2 Core",pct:78,color:"#7fffd4"},{label:"API v2",pct:45,color:"#a78bfa"},{label:"Mobile",pct:22,color:"#fbbf24"},{label:"Analytics",pct:60,color:"#7fffd4"}];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {items.map((item,i)=>(
        <div key={item.label} style={{animation:`slideIn 0.4s ${i*0.1}s ease both`}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#ece9e4"}}>{item.label}</span>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:item.color}}>{item.pct}%</span>
          </div>
          <div style={{height:4,background:"rgba(255,255,255,0.06)",borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${item.pct}%`,background:item.color,borderRadius:3}}/>
          </div>
        </div>
      ))}
    </div>
  );
}

function PanelDocs() {
  const docs=[{title:"Sprint 24 Kickoff",time:"2h ago",tag:"Meeting"},{title:"Auth Flow Spec",time:"Yesterday",tag:"Spec"},{title:"Q2 Goals Review",time:"2d ago",tag:"Review"},{title:"API Design Brief",time:"3d ago",tag:"Brief"}];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      {docs.map((d,i)=>(
        <div key={d.title} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 9px",background:"rgba(255,255,255,0.03)",border:"0.5px solid rgba(255,255,255,0.06)",borderRadius:7,animation:`slideIn 0.4s ${i*0.09}s ease both`}}>
          <div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#ece9e4"}}>{d.title}</div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#3a3a42",marginTop:1}}>{d.time}</div>
          </div>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#a78bfa",background:"rgba(167,139,250,0.1)",border:"0.5px solid rgba(167,139,250,0.25)",borderRadius:4,padding:"2px 6px"}}>{d.tag}</span>
        </div>
      ))}
    </div>
  );
}

function PanelPipeline() {
  const stages=[{label:"Prospect",n:24,c:"#5a5a62"},{label:"Qualified",n:12,c:"#a78bfa"},{label:"Demo",n:8,c:"#fbbf24"},{label:"Proposal",n:5,c:"#7fffd4"},{label:"Won",n:3,c:"#7fffd4"}];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:7}}>
      {stages.map((s,i)=>(
        <div key={s.label} style={{display:"flex",alignItems:"center",gap:10,animation:`slideIn 0.4s ${i*0.08}s ease both`}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#8a8a95",width:62,flexShrink:0}}>{s.label}</div>
          <div style={{flex:1,height:14,background:"rgba(255,255,255,0.04)",borderRadius:4,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${(s.n/24)*100}%`,background:`${s.c}22`,borderLeft:`2px solid ${s.c}`,borderRadius:4}}/>
          </div>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:s.c,width:20,textAlign:"right"}}>{s.n}</span>
        </div>
      ))}
    </div>
  );
}

function PanelOutreach() {
  const steps=[{n:1,label:"Intro email",delay:"Day 0",done:true},{n:2,label:"LinkedIn connect",delay:"Day 2",done:true},{n:3,label:"Follow-up email",delay:"Day 5",done:true},{n:4,label:"Value content",delay:"Day 9",done:false},{n:5,label:"Demo ask",delay:"Day 14",done:false}];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      {steps.map((s,i)=>(
        <div key={s.n} style={{display:"flex",alignItems:"center",gap:10,animation:`slideIn 0.4s ${i*0.08}s ease both`}}>
          <div style={{width:16,height:16,borderRadius:4,background:s.done?"rgba(127,255,212,0.12)":"rgba(255,255,255,0.04)",border:`0.5px solid ${s.done?"rgba(127,255,212,0.4)":"rgba(255,255,255,0.1)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            {s.done&&<div style={{width:5,height:5,borderRadius:1,background:"#7fffd4"}}/>}
          </div>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:s.done?"#5a5a62":"#ece9e4",flex:1,textDecoration:s.done?"line-through":"none"}}>{s.label}</span>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#3a3a42"}}>{s.delay}</span>
        </div>
      ))}
    </div>
  );
}

function PanelBudget() {
  const cats=[{label:"Engineering",spent:142,total:180,c:"#7fffd4"},{label:"Marketing",spent:68,total:80,c:"#a78bfa"},{label:"Operations",spent:34,total:50,c:"#fbbf24"},{label:"Infrastructure",spent:22,total:25,c:"#7fffd4"}];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:9}}>
      {cats.map((c,i)=>(
        <div key={c.label} style={{animation:`slideIn 0.4s ${i*0.1}s ease both`}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#ece9e4"}}>{c.label}</span>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#5a5a62"}}>${c.spent}k / ${c.total}k</span>
          </div>
          <div style={{height:5,background:"rgba(255,255,255,0.06)",borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${(c.spent/c.total)*100}%`,background:c.c,borderRadius:3}}/>
          </div>
        </div>
      ))}
    </div>
  );
}

function PanelCampaigns() {
  const items=[{name:"Summer Launch",status:"Live",c:"#7fffd4"},{name:"Email Nurture",status:"Active",c:"#7fffd4"},{name:"Paid Social",status:"Review",c:"#fbbf24"},{name:"SEO Content",status:"Draft",c:"#5a5a62"}];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      {items.map((item,i)=>(
        <div key={item.name} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 9px",background:"rgba(255,255,255,0.03)",border:"0.5px solid rgba(255,255,255,0.06)",borderRadius:7,animation:`slideIn 0.4s ${i*0.09}s ease both`}}>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#ece9e4"}}>{item.name}</span>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:item.c,background:`${item.c}18`,border:`0.5px solid ${item.c}44`,borderRadius:4,padding:"2px 7px"}}>{item.status}</span>
        </div>
      ))}
    </div>
  );
}

function PanelAnalytics() {
  const chs=[{label:"Organic",v:42,c:"#7fffd4"},{label:"Paid",v:28,c:"#a78bfa"},{label:"Social",v:18,c:"#fbbf24"},{label:"Email",v:12,c:"#7fffd4"}];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {chs.map((ch,i)=>(
        <div key={ch.label} style={{display:"flex",alignItems:"center",gap:10,animation:`slideIn 0.4s ${i*0.09}s ease both`}}>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#8a8a95",width:50,flexShrink:0}}>{ch.label}</span>
          <div style={{flex:1,height:14,background:"rgba(255,255,255,0.04)",borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${(ch.v/42)*100}%`,background:ch.c,opacity:0.7,borderRadius:3}}/>
          </div>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:ch.c,width:28,textAlign:"right"}}>{ch.v}%</span>
        </div>
      ))}
    </div>
  );
}

function PanelWiki() {
  const cats=[{cat:"Product",items:["Getting Started","API Reference","Glossary"]},{cat:"Process",items:["Sprint Guide","Release Flow"]},{cat:"Team",items:["Onboarding","Norms"]}];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {cats.map((c,i)=>(
        <div key={c.cat} style={{animation:`slideIn 0.4s ${i*0.1}s ease both`}}>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#fbbf24",letterSpacing:"0.1em",marginBottom:4}}>{c.cat.toUpperCase()}</div>
          {c.items.map(item=>(
            <div key={item} style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#8a8a95",padding:"3px 0",borderBottom:"0.5px solid rgba(255,255,255,0.04)"}}>{item}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function PanelRetro() {
  const worked=["Clear sprint goals","Fast deploys","Good retros"];
  const improve=["Async comm","Scope creep","PR reviews"];
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      {[{label:"Worked Well",items:worked,c:"#7fffd4"},{label:"To Improve",items:improve,c:"#fbbf24"}].map(col=>(
        <div key={col.label}>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:col.c,letterSpacing:"0.08em",marginBottom:6}}>{col.label.toUpperCase()}</div>
          {col.items.map((item,i)=>(
            <div key={item} style={{display:"flex",alignItems:"center",gap:5,marginBottom:5,animation:`slideIn 0.4s ${i*0.09}s ease both`}}>
              <div style={{width:4,height:4,borderRadius:"50%",background:col.c,flexShrink:0}}/>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#8a8a95"}}>{item}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function PanelApprovals() {
  const items=[{req:"Vendor contract",from:"J. Kim",status:"Pending",c:"#fbbf24"},{req:"Budget increase",from:"L. Chen",status:"Approved",c:"#7fffd4"},{req:"Tool access",from:"M. Patel",status:"Pending",c:"#fbbf24"},{req:"Policy update",from:"A. Torres",status:"Approved",c:"#7fffd4"}];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:7}}>
      {items.map((item,i)=>(
        <div key={item.req} style={{display:"flex",alignItems:"center",justifyContent:"space-between",animation:`slideIn 0.4s ${i*0.09}s ease both`}}>
          <div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#ece9e4"}}>{item.req}</div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#3a3a42"}}>{item.from}</div>
          </div>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:item.c,background:`${item.c}18`,border:`0.5px solid ${item.c}44`,borderRadius:4,padding:"2px 7px"}}>{item.status}</span>
        </div>
      ))}
    </div>
  );
}

const PANEL_MAP = {
  tasks:PanelTasks, roadmap:PanelRoadmap, docs:PanelDocs, wiki:PanelWiki,
  retro:PanelRetro, prs:PanelDocs,
  pipeline:PanelPipeline, outreach:PanelOutreach, analytics:PanelAnalytics,
  abtests:PanelRetro, funnel:PanelPipeline, reports:PanelAnalytics,
  procs:PanelDocs, approvals:PanelApprovals, calendar:PanelRoadmap,
  vendors:PanelDocs, kpis:PanelAnalytics, incidents:PanelApprovals,
  budget:PanelBudget, invoices:PanelApprovals, expenses:PanelBudget,
  forecast:PanelRoadmap, audit:PanelDocs, payroll:PanelApprovals,
  campaigns:PanelCampaigns, content:PanelDocs, assets:PanelDocs,
  dashb:PanelAnalytics, briefs:PanelDocs, social:PanelCampaigns,
};

// ─── Isometric Workspace ──────────────────────────────────────────────────────

function IsoWorkspace({selectedTools, phase}) {
  const tools = selectedTools.slice(0,4);
  return (
    <div style={{perspective:700,height:210,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{transformStyle:"preserve-3d",transform:"rotateX(52deg) rotateZ(-28deg)",position:"relative",width:300,height:180}}>
        <div style={{position:"absolute",inset:0,background:"rgba(127,255,212,0.025)",border:"0.5px solid rgba(127,255,212,0.09)",borderRadius:12,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 20px,rgba(127,255,212,0.035) 20px,rgba(127,255,212,0.035) 21px),repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(127,255,212,0.035) 20px,rgba(127,255,212,0.035) 21px)"}}/>
        {[0,1,2,3,4].map(col=>[0,1,2,3].map(row=>(
          <div key={`${col}-${row}`} style={{position:"absolute",left:col*60+4,top:row*44+4,width:3,height:3,borderRadius:"50%",background:"rgba(127,255,212,0.18)"}}/>
        )))}
        {tools.map((tool,i)=>{
          const positions=[[16,18],[162,18],[16,100],[162,100]];
          const [lx,ly]=positions[i]||[80,60];
          return (
            <div key={tool.id} style={{position:"absolute",left:lx,top:ly,width:112,height:58,background:"rgba(10,10,14,0.96)",border:`0.5px solid ${tool.color}55`,borderRadius:8,display:"flex",flexDirection:"column",justifyContent:"center",padding:"8px 10px",transform:`translateZ(${phase>i?54:0}px)`,opacity:phase>i?1:0.15,transition:`transform 0.65s ${i*0.2}s cubic-bezier(0.34,1.56,0.64,1),opacity 0.4s ${i*0.2}s ease`,boxShadow:phase>i?`0 20px 40px rgba(0,0,0,0.7),0 0 0 0.5px ${tool.color}18`:undefined}}>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:tool.color,letterSpacing:"0.07em"}}>{tool.icon} {tool.label}</div>
              <div style={{width:"65%",height:2,background:tool.color,opacity:0.3,borderRadius:2,marginTop:6}}/>
              <div style={{width:"40%",height:2,background:"rgba(255,255,255,0.08)",borderRadius:2,marginTop:3}}/>
              <div style={{width:"52%",height:2,background:"rgba(255,255,255,0.08)",borderRadius:2,marginTop:3}}/>
            </div>
          );
        })}
        {phase>=4&&tools.length>1&&(
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",transform:"translateZ(27px)"}} viewBox="0 0 300 180">
            {[[72,47,214,47],[72,47,72,129],[214,47,214,129],[72,129,214,129]].slice(0,tools.length-1).map(([x1,y1,x2,y2],i)=>(
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(127,255,212,0.18)" strokeWidth="0.8" strokeDasharray="4 4"/>
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}

function MiniGraph({points}) {
  if(!points||points.length<2) return null;
  const W=200,H=56,pad=6;
  const minV=10,maxV=95;
  const toX=i=>pad+(i/(points.length-1||1))*(W-pad*2);
  const toY=v=>H-pad-((v-minV)/(maxV-minV))*(H-pad*2);
  const pts=points.map((v,i)=>`${toX(i)},${toY(v)}`).join(" ");
  const fill=`${pts} ${toX(points.length-1)},${H} ${toX(0)},${H}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:H}}>
      <defs><linearGradient id="gf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7fffd4" stopOpacity="0.2"/><stop offset="100%" stopColor="#7fffd4" stopOpacity="0"/></linearGradient></defs>
      <polygon points={fill} fill="url(#gf)"/>
      <polyline points={pts} fill="none" stroke="#7fffd4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {points.length>1&&<circle cx={toX(points.length-1)} cy={toY(points[points.length-1])} r="3" fill="#7fffd4" style={{animation:"pulse 1.4s infinite"}}/>}
    </svg>
  );
}

// ─── Step Components ──────────────────────────────────────────────────────────

function StepDialogue({onSelect}) {
  const [typed,setTyped]=useState("");
  const [showOpts,setShowOpts]=useState(false);
  const full="Which department are we\nbuilding for today?";
  useEffect(()=>{
    setTyped(""); setShowOpts(false);
    let i=0;
    const iv=setInterval(()=>{ i++; setTyped(full.slice(0,i)); if(i>=full.length){clearInterval(iv);setTimeout(()=>setShowOpts(true),320);} },36);
    return()=>clearInterval(iv);
  },[]);
  return (
    <div style={{padding:"28px 32px 24px",minHeight:340,display:"flex",flexDirection:"column",gap:18}}>
      <div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:"#7fffd4",animation:"pulse 1.6s infinite"}}/>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#7fffd4",letterSpacing:"0.12em"}}>WORKSPACE SETUP</span>
        </div>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:18,color:"#ece9e4",lineHeight:1.6,minHeight:56,whiteSpace:"pre-line"}}>
          {typed}<span style={{animation:"blink 1s infinite",opacity:typed.length<full.length?1:0}}>█</span>
        </div>
      </div>
      {showOpts&&(
        <div style={{display:"flex",flexDirection:"column",gap:7,animation:"fadeUp 0.4s ease"}}>
          {DEPTS.map(d=>(
            <button key={d.id} className="dbtn" onClick={()=>onSelect(d)}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span className="di" style={{fontSize:15,color:"#4a4a52",transition:"color 0.18s"}}>{d.icon}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:500}}>{d.label}</div>
                  <div style={{fontSize:10,color:"#4a4a52",fontFamily:"'JetBrains Mono',monospace",marginTop:1}}>{d.sub}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Bouncing Dots Loader ─────────────────────────────────────────────────────

function BounceDots({label}) {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,padding:"32px 0",animation:"fadeIn 0.3s ease"}}>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        {[0,1,2].map(i=>(
          <div key={i} style={{width:9,height:9,borderRadius:"50%",background:"#7fffd4",animation:`bounce 1.2s ${i*0.2}s ease-in-out infinite`}}/>
        ))}
      </div>
      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#5a5a62",letterSpacing:"0.1em",animation:"scanPulse 1.5s infinite"}}>{label}</span>
    </div>
  );
}

// ─── Step: Tool Select ────────────────────────────────────────────────────────

function StepToolSelect({dept, onDone}) {
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedRef = useRef([]);
  const tools = DEPT_TOOLS[dept?.id] || DEPT_TOOLS.product;

  const toggle = (id) => {
    if (loading) return;
    const s = selectedRef.current;
    const next = s.includes(id) ? s.filter(x => x !== id) : [...s, id];
    selectedRef.current = next;
    setSelected([...next]);
  };

  const handleContinue = () => {
    if (selectedRef.current.length < 2) return;
    setLoading(true);
    setTimeout(() => { onDone(selectedRef.current); }, 2000);
  };

  return (
    <div style={{padding:"28px 32px 24px",minHeight:380}}>
      {!loading ? (
        <>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#fbbf24"}}/>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#fbbf24",letterSpacing:"0.12em"}}>CONFIGURE WORKSPACE</span>
          </div>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#4a4a52",marginBottom:20}}>
            Select the tools for your <span style={{color:"#ece9e4"}}>{dept?.label}</span> workspace. Pick at least 2 to continue.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {tools.map((t,i)=>{
              const sel = selected.includes(t.id);
              return (
                <button key={t.id} className={`tbtn${sel?" sel":""}`} onClick={()=>toggle(t.id)}
                  style={{animation:`fadeUp 0.35s ${i*0.06}s ease both`}}>
                  {sel&&(
                    <div style={{position:"absolute",top:9,right:9,width:14,height:14,borderRadius:4,background:"rgba(127,255,212,0.2)",border:"0.5px solid rgba(127,255,212,0.5)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <div style={{width:5,height:5,borderRadius:1,background:"#7fffd4"}}/>
                    </div>
                  )}
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                    <span style={{fontSize:13,color:sel?t.color:"#5a5a62",transition:"color 0.18s"}}>{t.icon}</span>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:500,color:sel?"#ece9e4":"#8a8a95"}}>{t.label}</span>
                  </div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#3a3a42",paddingLeft:20}}>{t.desc}</div>
                </button>
              );
            })}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:14}}>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:selected.length>=2?"#7fffd4":"#3a3a42",transition:"color 0.3s"}}>
              {selected.length === 0 ? "none selected" : selected.length === 1 ? "1 selected, pick one more" : `${selected.length} selected`}
            </span>
            {selected.length >= 2 && (
              <button className="pbtn" onClick={handleContinue} style={{fontSize:12,padding:"9px 20px",animation:"fadeUp 0.3s ease"}}>
                Continue
              </button>
            )}
          </div>
        </>
      ) : (
        <div style={{display:"flex",flexDirection:"column",minHeight:280}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:24}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#fbbf24"}}/>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#fbbf24",letterSpacing:"0.12em"}}>CONFIGURE WORKSPACE</span>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:28}}>
            {selected.map(id=>{
              const t=(DEPT_TOOLS[dept?.id]||DEPT_TOOLS.product).find(x=>x.id===id);
              if(!t) return null;
              return (
                <div key={id} style={{display:"flex",alignItems:"center",gap:6,background:`${t.color}12`,border:`0.5px solid ${t.color}44`,borderRadius:8,padding:"6px 12px",animation:"fadeIn 0.3s ease"}}>
                  <span style={{fontSize:12,color:t.color}}>{t.icon}</span>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:t.color}}>{t.label}</span>
                </div>
              );
            })}
          </div>
          <BounceDots label="BUILDING YOUR WORKSPACE PLAN…"/>
        </div>
      )}
    </div>
  );
}

// ─── Step: Journey ────────────────────────────────────────────────────────────

function StepJourney({dept, selectedTools, onContinue}) {
  const [visible, setVisible] = useState(0);
  const [showCta, setShowCta] = useState(false);

  useEffect(()=>{
    setVisible(0); setShowCta(false);
    JOURNEY.forEach((_,i)=>{ setTimeout(()=>setVisible(v=>Math.max(v,i+1)),(i+1)*420); });
    setTimeout(()=>setShowCta(true),JOURNEY.length*420+500);
  },[]);

  const chosen = (DEPT_TOOLS[dept?.id]||DEPT_TOOLS.product).filter(t=>selectedTools.includes(t.id));

  return (
    <div style={{padding:"28px 32px 24px",minHeight:400}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <div style={{width:6,height:6,borderRadius:"50%",background:"#a78bfa",animation:"pulse 1.4s infinite"}}/>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#a78bfa",letterSpacing:"0.12em"}}>YOUR 90-DAY JOURNEY</span>
      </div>

      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
        {chosen.map(t=>(
          <span key={t.id} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:t.color,background:`${t.color}10`,border:`0.5px solid ${t.color}33`,borderRadius:4,padding:"2px 8px",letterSpacing:"0.06em"}}>{t.icon} {t.label}</span>
        ))}
      </div>

      <div style={{position:"relative",marginBottom:16}}>
        <div style={{position:"absolute",left:15,top:16,bottom:16,width:0.5,background:"rgba(255,255,255,0.06)"}}/>
        <div style={{position:"absolute",left:15,top:16,width:0.5,background:"rgba(127,255,212,0.25)",height:`${(visible/JOURNEY.length)*100}%`,transition:"height 0.45s ease"}}/>
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          {JOURNEY.map((stage,i)=>(
            <div key={stage.num} style={{display:"flex",gap:14,paddingBottom:i<JOURNEY.length-1?12:0,opacity:visible>i?1:0.12,transform:visible>i?"translateX(0)":"translateX(-8px)",transition:`opacity 0.4s ${i*0.04}s,transform 0.4s ${i*0.04}s`}}>
              <div style={{position:"relative",zIndex:1,flexShrink:0}}>
                <div style={{width:30,height:30,borderRadius:8,background:visible>i?`${stage.color}16`:"rgba(255,255,255,0.03)",border:`0.5px solid ${visible>i?stage.color+"3a":"rgba(255,255,255,0.07)"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.4s"}}>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:visible>i?stage.color:"#2a2a32"}}>{stage.num}</span>
                </div>
              </div>
              <div style={{paddingTop:5}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:1}}>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,color:"#ece9e4"}}>{stage.title}</span>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,color:"#3a3a42",background:"rgba(255,255,255,0.04)",borderRadius:4,padding:"1px 5px"}}>{stage.dur}</span>
                </div>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"#5a5a62",lineHeight:1.5}}>{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCta&&(
        <div style={{display:"flex",justifyContent:"flex-end",animation:"fadeUp 0.5s ease"}}>
          <button className="pbtn" onClick={onContinue}>
            See the results
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Step: Live Reveal ────────────────────────────────────────────────────────

function StepReveal({dept, selectedTools, isoPhase, taskPct, growthPct, graphPoints, revealPhase}) {
  const tools = (DEPT_TOOLS[dept?.id]||DEPT_TOOLS.product).filter(t=>selectedTools.includes(t.id));
  const cols = tools.length<=2?"1fr 1fr":tools.length===3?"1fr 1fr 1fr":"1fr 1fr";
  return (
    <div style={{minHeight:400,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"10px 20px",borderBottom:"0.5px solid rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:"#7fffd4",animation:"pulse 2s infinite"}}/>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#7fffd4",letterSpacing:"0.1em"}}>
            {dept?.label?.toUpperCase()} WORKSPACE · {revealPhase===0?"ASSEMBLING":"LIVE"}
          </span>
        </div>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#3a3a42"}}>
          {new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}
        </span>
      </div>

      {revealPhase===0 ? (
        <div style={{padding:"16px 24px 20px",flex:1}}>
          <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#4a4a52",marginBottom:14,letterSpacing:"0.06em"}}>
            {isoPhase<4?"Placing components into workspace…":"Workspace assembled."}
            {isoPhase<4&&<span style={{animation:"blink 0.7s infinite"}}>_</span>}
          </p>
          <IsoWorkspace selectedTools={tools} phase={isoPhase}/>
          <div style={{display:"flex",justifyContent:"center",gap:14,marginTop:10}}>
            {tools.map((t,i)=>(
              <div key={t.id} style={{display:"flex",alignItems:"center",gap:5,opacity:isoPhase>i?1:0.18,transition:`opacity 0.4s ${i*0.18}s`}}>
                <div style={{width:4,height:4,borderRadius:"50%",background:t.color}}/>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:t.color}}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="live-scroll" style={{padding:"14px 20px 16px",flex:1,overflowY:"auto",maxHeight:"calc(100vh - 220px)"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:12}}>
            {[
              {label:"Automations",val:`${tools.length*2}`,accent:"#7fffd4"},
              {label:"Tasks cleared",val:`${100-taskPct}%`,accent:"#7fffd4"},
              {label:"Growth index",val:`${growthPct}`,accent:"#a78bfa"},
              {label:"Time saved/wk",val:`${Math.round(tools.length*3.5)}h`,accent:"#fbbf24"},
            ].map(m=>(
              <div key={m.label} style={{background:"rgba(255,255,255,0.025)",border:"0.5px solid rgba(255,255,255,0.07)",borderRadius:8,padding:"7px 10px"}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,color:"#3a3a42",letterSpacing:"0.08em",marginBottom:3}}>{m.label.toUpperCase()}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,color:m.accent}}>{m.val}</div>
              </div>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
            <div style={{background:"rgba(255,255,255,0.025)",border:"0.5px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"12px 14px"}}>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,color:"#5a5a62",letterSpacing:"0.1em",marginBottom:7}}>REPETITIVE TASKS</div>
              <div style={{display:"flex",alignItems:"baseline",gap:5,marginBottom:8}}>
                <span style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:700,color:taskPct<30?"#7fffd4":"#ece9e4",transition:"color 0.5s"}}>{taskPct}%</span>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#5a5a62"}}>remaining</span>
              </div>
              <div style={{height:4,background:"rgba(255,255,255,0.05)",borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${taskPct}%`,background:taskPct<30?"#7fffd4":"#a78bfa",borderRadius:3,transition:"width 0.15s ease,background 0.4s"}}/>
              </div>
            </div>
            <div style={{background:"rgba(255,255,255,0.025)",border:"0.5px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"12px 14px"}}>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,color:"#5a5a62",letterSpacing:"0.1em",marginBottom:4}}>GROWTH INDEX</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:700,color:"#7fffd4",marginBottom:2}}>{growthPct}</div>
              <MiniGraph points={graphPoints}/>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:cols,gap:8}}>
            {tools.map(tool=>{
              const PanelComp=PANEL_MAP[tool.id]||PanelDocs;
              return (
                <div key={tool.id} style={{background:"rgba(255,255,255,0.02)",border:`0.5px solid ${tool.color}1a`,borderRadius:10,padding:"11px 13px",animation:"fadeIn 0.5s ease",minHeight:130}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:9,paddingBottom:7,borderBottom:"0.5px solid rgba(255,255,255,0.05)"}}>
                    <span style={{fontSize:11,color:tool.color}}>{tool.icon}</span>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,color:"#ece9e4"}}>{tool.label}</span>
                    <div style={{marginLeft:"auto",width:5,height:5,borderRadius:"50%",background:"#7fffd4",animation:"pulse 2s infinite"}}/>
                  </div>
                  <PanelComp/>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Contact Modal ────────────────────────────────────────────────────────────

function ContactModal({onClose, dept, selectedTools}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    teamSize: "",
    department: dept?.label || "",
    challenge: "",
    tools: "",
    source: "",
  });
  const [phase, setPhase] = useState("form"); // "form" | "submitting" | "success"

  // ⚠️ Replace this with your deployed Apps Script web app URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxHX4R2hc5ba2g7g1X-TekSqtjklcFXg6S7eyrU6KFutigkM8L9OwPNblUiEOZKwaIl/exec";

  const upd = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setPhase("submitting");

    const payload = {
      ...form,
      exploredDept: dept?.label || "",
      exploredTools: selectedTools.join(", "),
      submittedAt: new Date().toISOString(),
    };

    try {
      // Using no-cors because Apps Script doesn't support CORS preflight.
      // The data is sent and written to the sheet even though we can't read
      // the response — we show success optimistically after a short delay.
      fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (_) {}

    setTimeout(() => setPhase("success"), 900);
  };

  const lbl = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    color: "#5a5a62",
    letterSpacing: "0.1em",
    marginBottom: 6,
    display: "block",
  };

  const DEPT_OPTIONS = ["Product", "Growth", "Operations", "Finance", "Marketing", "Other"];
  const SIZE_OPTIONS = ["1–5", "6–20", "21–100", "101–500", "500+"];

  // Resolve explored tool labels for display in the note
  const exploredToolLabels = selectedTools
    .map((id) => {
      const allTools = Object.values(DEPT_TOOLS).flat();
      return allTools.find((t) => t.id === id)?.label;
    })
    .filter(Boolean);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.68)",
          zIndex: 60,
          animation: "backdropIn 0.3s ease",
          cursor: "pointer",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "min(540px, 95vw)",
          maxHeight: "92vh",
          background: "linear-gradient(160deg,#111116 0%,#0c0c10 100%)",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          zIndex: 70,
          display: "flex",
          flexDirection: "column",
          animation: "modalIn 0.38s cubic-bezier(0.34,1.56,0.64,1) both",
          boxShadow: "0 60px 120px rgba(0,0,0,0.85), 0 0 0 0.5px rgba(127,255,212,0.06) inset",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "20px 28px 18px",
            borderBottom: "0.5px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
            position: "sticky", top: 0,
            background: "linear-gradient(160deg,#111116 0%,#0c0c10 100%)",
            zIndex: 1,
          }}
        >
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#7fffd4",animation:"pulse 1.6s infinite"}}/>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#7fffd4",letterSpacing:"0.12em"}}>
              START THE CONVERSATION
            </span>
          </div>
          <button
            onClick={onClose}
            style={{background:"none",border:"none",color:"#5a5a62",cursor:"pointer",fontSize:18,padding:"4px 8px",transition:"color 0.18s",lineHeight:1}}
            onMouseEnter={e=>e.currentTarget.style.color="#ece9e4"}
            onMouseLeave={e=>e.currentTarget.style.color="#5a5a62"}
          >✕</button>
        </div>

        {/* Success state */}
        {phase === "success" ? (
          <div
            style={{
              padding: "56px 28px",
              textAlign: "center",
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 22,
              animation: "fadeUp 0.4s ease",
            }}
          >
            <div
              style={{
                width: 58, height: 58, borderRadius: "50%",
                background: "rgba(127,255,212,0.08)",
                border: "0.5px solid rgba(127,255,212,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:22,color:"#7fffd4"}}>✓</span>
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700,
                  color: "#ece9e4", marginBottom: 10, letterSpacing: "-0.01em",
                }}
              >
                You're on our radar.
              </h3>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#6b6b72",lineHeight:1.85,maxWidth:320,margin:"0 auto"}}>
                We've got everything we need. Expect to hear from us within{" "}
                <span style={{color:"#7fffd4"}}>3 business days</span>, we'll review what you shared and come to the conversation fully prepared.
              </p>
            </div>
            <div
              style={{
                background: "rgba(127,255,212,0.04)",
                border: "0.5px solid rgba(127,255,212,0.12)",
                borderRadius: 10, padding: "12px 20px",
                fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
                color: "#5a5a62", letterSpacing: "0.08em",
              }}
            >
              ↳ WE ALREADY HAVE AN UNDERSTANDING OF WHERE YOU'RE HEADED
            </div>
            <button className="pbtn accentbtn" onClick={onClose} style={{marginTop:4}}>
              Close
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={submit} style={{padding:"24px 28px 32px",display:"flex",flexDirection:"column",gap:16}}>

            {/* Context note */}
            <div
              style={{
                background: "rgba(127,255,212,0.04)",
                border: "0.5px solid rgba(127,255,212,0.14)",
                borderRadius: 10, padding: "14px 16px",
              }}
            >
              {dept ? (
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#6b6b72",lineHeight:1.8,margin:0}}>
                  We already have a sense of where you're headed,{" "}
                  <span style={{color:"#ece9e4",fontWeight:500}}>{dept.label}</span>
                  {exploredToolLabels.length > 0 && (
                    <> with tools like <span style={{color:"#ece9e4"}}>{exploredToolLabels.join(", ")}</span></>
                  )}. Share a bit more and we'll come to the conversation fully prepared.
                  <span style={{display:"block",fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#7fffd4",marginTop:8,letterSpacing:"0.09em"}}>
                    ↳ WE REACH OUT WITHIN 3 BUSINESS DAYS · MAX
                  </span>
                </p>
              ) : (
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#6b6b72",lineHeight:1.8,margin:0}}>
                  Tell us about your team and what you're trying to solve. We'll reach out within 3 business days, fully prepared to build something that fits.
                  <span style={{display:"block",fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#7fffd4",marginTop:8,letterSpacing:"0.09em"}}>
                  
                  </span>
                </p>
              )}
            </div>

            {/* Name + Email */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div>
                <label style={lbl}>FULL NAME *</label>
                <input
                  required name="name" value={form.name} onChange={upd}
                  placeholder="Jane Smith" className="cinput"
                />
              </div>
              <div>
                <label style={lbl}>WORK EMAIL *</label>
                <input
                  required type="email" name="email" value={form.email} onChange={upd}
                  placeholder="jane@company.com" className="cinput"
                />
              </div>
            </div>

            {/* Company + Role */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div>
                <label style={lbl}>COMPANY *</label>
                <input
                  required name="company" value={form.company} onChange={upd}
                  placeholder="Company name" className="cinput"
                />
              </div>
              <div>
                <label style={lbl}>YOUR ROLE *</label>
                <input
                  required name="role" value={form.role} onChange={upd}
                  placeholder="Head of Operations" className="cinput"
                />
              </div>
            </div>

            {/* Team size + Department */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div>
                <label style={lbl}>TEAM SIZE *</label>
                <select
                  required name="teamSize" value={form.teamSize} onChange={upd}
                  className="cinput" style={{cursor:"pointer"}}
                >
                  <option value="">Select…</option>
                  {SIZE_OPTIONS.map(s => (
                    <option key={s} value={s}>{s} people</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={lbl}>DEPARTMENT FOCUS *</label>
                <select
                  required name="department" value={form.department} onChange={upd}
                  className="cinput" style={{cursor:"pointer"}}
                >
                  <option value="">Select…</option>
                  {DEPT_OPTIONS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Biggest challenge — most important question */}
            <div>
              <label style={lbl}>WHAT'S YOUR BIGGEST OPERATIONAL CHALLENGE RIGHT NOW? *</label>
              <textarea
                required name="challenge" value={form.challenge} onChange={upd}
                placeholder="e.g. Our approval process takes weeks, tasks fall between tools, no visibility across the team, everything lives in spreadsheets…"
                className="cinput"
                style={{minHeight:90,lineHeight:1.65}}
              />
            </div>

            {/* Current tools */}
            <div>
              <label style={lbl}>TOOLS YOUR TEAM CURRENTLY USES <span style={{color:"#3a3a42"}}>(optional)</span></label>
              <input
                name="tools" value={form.tools} onChange={upd}
                placeholder="e.g. Notion, Slack, Asana, HubSpot, Airtable, Monday…"
                className="cinput"
              />
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#2a2a3a",marginTop:5}}>
                This helps us understand what needs to integrate or be replaced.
              </div>
            </div>

            {/* Source */}
            <div>
              <label style={lbl}>HOW DID YOU FIND US? <span style={{color:"#3a3a42"}}>(optional)</span></label>
              <input
                name="source" value={form.source} onChange={upd}
                placeholder="LinkedIn, referral, Google, event…"
                className="cinput"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="pbtn accentbtn"
              disabled={phase === "submitting"}
              style={{width:"100%",textAlign:"center",marginTop:4}}
            >
              {phase === "submitting"
                ? "Sending…"
                : "Send your request"}
            </button>

            <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#2a2a3a",textAlign:"center",letterSpacing:"0.06em"}}>
              No spam. Ever. Just a real conversation about your workspace.
            </p>
          </form>
        )}
      </div>
    </>
  );
}

// ─── Careers Panel ───────────────────────────────────────────────────────────

function CareersPanel({onClose, onContact}) {
  const [expanded, setExpanded] = useState(null);

  const jobs = [
    {
      id: "ae",
      title: "Account Executive",
      tag: "Sales",
      tagColor: "#7fffd4",
      short: "You'll be the first real conversation most of our clients have with us.",
      detail: "You'll work with startups from mid to high-level size — the ones that are serious about actually changing how they operate, not just buying another tool.\n\nThis isn't enterprise sales. There's no playbook, no deck to read from. You'll listen, understand what's actually broken, and figure out whether we're the right fit. Honestly, sometimes we're not — and you'll say so.\n\nIf you know how to have a real conversation, move fast, and genuinely care about the people on the other side of the call, you'll feel right at home here.",
    },
    {
      id: "fde",
      title: "Forward Deployed Engineer",
      tag: "Engineering · AI",
      tagColor: "#a78bfa",
      short: "You build the actual thing. The agent that runs, the workflow that ships.",
      detail: "This is an AI developer role. You'll be embedded with clients, working directly on their operations — mapping workflows, building agents, wiring things together until they actually work.\n\nYou don't need a traditional background. We don't care where you went to school or what your LinkedIn looks like. What matters is what you've actually built with AI and how you think through problems.\n\nYou'll be working with LLMs, automations, integrations, and occasionally some pretty gnarly legacy processes. If you like figuring things out from scratch and shipping things that matter — this is it.",
    },
  ];

  return (
    <>
      <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:40,animation:"backdropIn 0.3s ease",cursor:"pointer"}}/>
      <div style={{position:"fixed",top:0,right:0,width:"min(440px,100vw)",height:"100vh",background:"linear-gradient(180deg,#0f0f14 0%,#0a0a0d 100%)",borderLeft:"0.5px solid rgba(255,255,255,0.08)",zIndex:50,display:"flex",flexDirection:"column",animation:"slidePanel 0.38s cubic-bezier(0.32,0.72,0,1)",overflowY:"auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 28px 18px",borderBottom:"0.5px solid rgba(255,255,255,0.06)",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#7fffd4",animation:"pulse 1.6s infinite"}}/>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#7fffd4",letterSpacing:"0.12em"}}>CAREERS</span>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#5a5a62",cursor:"pointer",fontSize:18,lineHeight:1,padding:"4px 8px",transition:"color 0.18s"}}
            onMouseEnter={e=>e.currentTarget.style.color="#ece9e4"}
            onMouseLeave={e=>e.currentTarget.style.color="#5a5a62"}>✕</button>
        </div>
        <div style={{padding:"32px 28px 40px",display:"flex",flexDirection:"column",gap:28}}>
          <div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:700,color:"#ece9e4",lineHeight:1.25,letterSpacing:"-0.01em",marginBottom:14}}>
              We're growing fast. Come build with us.
            </h2>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#6b6b72",lineHeight:1.8}}>
              We're a small team doing serious work. Every client we take on, we commit to fully. If you want to be somewhere that actually ships things that change how people work — read on.
            </p>
          </div>
          <div style={{height:"0.5px",background:"rgba(255,255,255,0.06)"}}/>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#5a5a62",letterSpacing:"0.12em",marginBottom:4}}>OPEN ROLES</div>
            {jobs.map((job,i)=>(
              <div key={job.id}>
                <button className="dbtn" onClick={()=>setExpanded(expanded===job.id?null:job.id)}
                  style={{animation:`slideIn 0.4s ${i*0.1}s ease both`}}>
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10}}>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,color:"#ece9e4"}}>{job.title}</span>
                        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:job.tagColor,background:`${job.tagColor}14`,border:`0.5px solid ${job.tagColor}33`,borderRadius:4,padding:"2px 7px",letterSpacing:"0.06em"}}>{job.tag}</span>
                      </div>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#5a5a62",lineHeight:1.5}}>{job.short}</div>
                    </div>
                    <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:"#3a3a42",flexShrink:0,marginTop:2,display:"inline-block",transition:"transform 0.2s,color 0.18s",transform:expanded===job.id?"rotate(90deg)":"none"}}>›</span>
                  </div>
                  {expanded===job.id&&(
                    <div style={{marginTop:14,paddingTop:14,borderTop:"0.5px solid rgba(255,255,255,0.06)",animation:"fadeUp 0.25s ease"}}>
                      {job.detail.split("\n\n").map((para,pi)=>(
                        <p key={pi} style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#8a8a95",lineHeight:1.8,marginBottom:pi<job.detail.split("\n\n").length-1?12:0}}>{para}</p>
                      ))}
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
          <div style={{height:"0.5px",background:"rgba(255,255,255,0.06)"}}/>
          <div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#5a5a62",letterSpacing:"0.12em",marginBottom:10}}>HOW WE HIRE</div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#6b6b72",lineHeight:1.8}}>
              No degree requirements. No CV logo checks. No age filters. We want to know what you've built, how you think, and what you'd bring here. A portfolio link goes further than a resume every single time.
            </p>
          </div>
          <button className="pbtn" style={{width:"100%",textAlign:"center"}}
            onClick={()=>{onClose();onContact();}}>
            Contact with us
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Career Modal ────────────────────────────────────────────────────────────

function CareerModal({onClose}) {
  const [form, setForm] = useState({name:"",email:"",role:"",project:"",portfolio:""});
  const [phase, setPhase] = useState("form");

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz30usqYg5swiEFJYECbC4MWxyGZEV7kP7R-X97Ezhj3DREwT156z0PtwwINc3GmwSxVw/exec";

  const upd = e => setForm(f=>({...f,[e.target.name]:e.target.value}));

  const submit = async e => {
    e.preventDefault();
    setPhase("submitting");
    try {
      fetch(SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,type:"career",submittedAt:new Date().toISOString()})});
    } catch(_){}
    setTimeout(()=>setPhase("success"),900);
  };

  const lbl = {fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#5a5a62",letterSpacing:"0.1em",marginBottom:6,display:"block"};
  const ROLES = ["Account Executive","Forward Deployed Engineer"];

  return (
    <>
      <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.68)",zIndex:80,animation:"backdropIn 0.3s ease",cursor:"pointer"}}/>
      <div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"min(540px,95vw)",maxHeight:"92vh",background:"linear-gradient(160deg,#111116 0%,#0c0c10 100%)",border:"0.5px solid rgba(127,255,212,0.14)",borderRadius:16,zIndex:90,display:"flex",flexDirection:"column",animation:"modalIn 0.38s cubic-bezier(0.34,1.56,0.64,1) both",boxShadow:"0 60px 120px rgba(0,0,0,0.85)",overflowY:"auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 28px 18px",borderBottom:"0.5px solid rgba(255,255,255,0.06)",flexShrink:0,position:"sticky",top:0,background:"linear-gradient(160deg,#111116 0%,#0c0c10 100%)",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#7fffd4",animation:"pulse 1.6s infinite"}}/>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#7fffd4",letterSpacing:"0.12em"}}>APPLY</span>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#5a5a62",cursor:"pointer",fontSize:18,padding:"4px 8px",transition:"color 0.18s",lineHeight:1}}
            onMouseEnter={e=>e.currentTarget.style.color="#ece9e4"}
            onMouseLeave={e=>e.currentTarget.style.color="#5a5a62"}>✕</button>
        </div>

        {phase==="success" ? (
          <div style={{padding:"56px 28px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:22,animation:"fadeUp 0.4s ease"}}>
            <div style={{width:58,height:58,borderRadius:"50%",background:"rgba(127,255,212,0.08)",border:"0.5px solid rgba(127,255,212,0.3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:22,color:"#7fffd4"}}>✓</span>
            </div>
            <div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,color:"#ece9e4",marginBottom:10,letterSpacing:"-0.01em"}}>Got it. We'll take a look.</h3>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#6b6b72",lineHeight:1.85,maxWidth:320,margin:"0 auto"}}>
                We'll review what you shared and get back to you within <span style={{color:"#7fffd4"}}>a few days</span>. No automated responses — just real people.
              </p>
            </div>
            <button className="pbtn" onClick={onClose} style={{marginTop:4}}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit} style={{padding:"24px 28px 32px",display:"flex",flexDirection:"column",gap:16}}>
            <div style={{background:"rgba(127,255,212,0.04)",border:"0.5px solid rgba(127,255,212,0.12)",borderRadius:10,padding:"14px 16px"}}>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#6b6b72",lineHeight:1.8,margin:0}}>
                We don't care about your university degree, the logos on your CV, or your age. Just tell us what you've built with AI.
                <span style={{display:"block",fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#7fffd4",marginTop:8,letterSpacing:"0.09em"}}>↳ A PORTFOLIO LINK IS WORTH MORE THAN A CV HERE</span>
              </p>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div>
                <label style={lbl}>YOUR NAME *</label>
                <input required name="name" value={form.name} onChange={upd} placeholder="Jane Smith" className="cinput"/>
              </div>
              <div>
                <label style={lbl}>EMAIL *</label>
                <input required type="email" name="email" value={form.email} onChange={upd} placeholder="jane@example.com" className="cinput"/>
              </div>
            </div>

            <div>
              <label style={lbl}>ROLE YOU'RE INTERESTED IN *</label>
              <select required name="role" value={form.role} onChange={upd} className="cinput" style={{cursor:"pointer"}}>
                <option value="">Select a role...</option>
                {ROLES.map(r=><option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label style={lbl}>TELL US ABOUT A RECENT PROJECT WHERE YOU SOLVED A PROBLEM WITH AI *</label>
              <textarea required name="project" value={form.project} onChange={upd}
                placeholder="What was the problem, what did you build, what happened? No need to dress it up — just tell us what you actually did."
                className="cinput" style={{minHeight:110,lineHeight:1.65}}/>
            </div>

            <div>
              <label style={lbl}>PORTFOLIO / GITHUB / ANYTHING YOU'VE BUILT <span style={{color:"#3a3a42"}}>(appreciated)</span></label>
              <input name="portfolio" value={form.portfolio} onChange={upd} placeholder="github.com/you, your site, a Notion doc..." className="cinput"/>
            </div>

            <button type="submit" className="pbtn" disabled={phase==="submitting"}
              style={{width:"100%",textAlign:"center",marginTop:4}}>
              {phase==="submitting" ? "Sending..." : "Send it"}
            </button>
            <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#2a2a3a",textAlign:"center",letterSpacing:"0.06em"}}>We read everything ourselves.</p>
          </form>
        )}
      </div>
    </>
  );
}

// ─── Case Studies Panel ───────────────────────────────────────────────────────

const CASES = [
  {
    id:"ops",
    tag:"Operations",
    tagColor:"#7fffd4",
    situation:"A 60-person logistics company was spending 3 days a week manually matching freight invoices to purchase orders across 4 different systems. The process ran on spreadsheets, tribal knowledge, and one person who knew where everything lived.",
    found:"When we went inside, we discovered the matching logic was actually consistent, the same rules, every time. The only reason a human was doing it was because nobody had ever mapped it out end to end.",
    built:"A custom AI agent that handles invoice-to-PO matching automatically, flags exceptions for human review, and generates a daily exceptions report. Took 6 weeks from discovery to live.",
    result:"3 days of weekly ops work → under 2 hours. The team now handles exceptions only. The person who ran the old process moved to higher-leverage work.",
  },
  {
    id:"growth",
    tag:"Growth",
    tagColor:"#a78bfa",
    situation:"A B2B SaaS company had a sales team of 8 people manually triaging inbound leads, reading every submission, categorizing intent, and routing to the right rep. Response times averaged 6-9 hours.",
    found:"The routing criteria were buried in a Notion doc that half the team had never read. Intent signals were obvious once written down, company size, role, and two or three keywords in the message determined 80% of routes.",
    built:"An AI workflow that classifies inbound leads in real time, scores them, and routes directly to the right rep with a pre-drafted first response. Edge cases escalate to a shared queue.",
    result:"Response time dropped from 6–9 hours to under 4 minutes on average. The sales team stopped doing triage and started doing sales.",
  },
  {
    id:"finance",
    tag:"Finance",
    tagColor:"#fbbf24",
    situation:"A professional services firm was generating client reports manually every month, pulling data from 3 tools, writing commentary, formatting in Word, sending for approval. Each report took 4-5 hours per client.",
    found:"The data sources were consistent. The commentary followed a pattern. The bottleneck was assembly, nobody had connected the tools, and the formatting step was pure repetition.",
    built:"An automated reporting agent that pulls data, generates structured commentary using context from the client relationship, assembles the report, and sends a formatted draft for partner review.",
    result:"Report generation went from 4–5 hours to 20 minutes of partner review and send. The firm took on 40% more clients without adding headcount.",
  },
];

// ── Case visualizations ───────────────────────────────────────────────────────

function VizOps() {
  // Before: 4 boxes (systems) → person → 3 days. After: AI agent → 2hrs
  const before = ["ERP","TMS","Email","Sheets"];
  return (
    <div style={{background:"rgba(255,255,255,0.02)",border:"0.5px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"18px 20px"}}>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#5a5a62",letterSpacing:"0.1em",marginBottom:14}}>BEFORE VS AFTER</div>
      {/* BEFORE */}
      <div style={{marginBottom:14}}>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,color:"#3a3a42",letterSpacing:"0.1em",marginBottom:8}}>BEFORE</div>
        <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
          {before.map(s=>(
            <div key={s} style={{background:"rgba(255,255,255,0.04)",border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:6,padding:"4px 8px",fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#5a5a62"}}>{s}</div>
          ))}
          <div style={{color:"#3a3a42",fontSize:11}}>→</div>
          <div style={{background:"rgba(255,255,255,0.04)",border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:6,padding:"4px 8px",fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"#5a5a62"}}>1 person</div>
          <div style={{color:"#3a3a42",fontSize:11}}>→</div>
          <div style={{background:"rgba(130,38,30,0.15)",border:"0.5px solid rgba(130,38,30,0.3)",borderRadius:6,padding:"4px 10px",fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:"#e06050"}}>3 days / week</div>
        </div>
      </div>
      <div style={{height:"0.5px",background:"rgba(255,255,255,0.05)",marginBottom:14}}/>
      {/* AFTER */}
      <div>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,color:"#3a3a42",letterSpacing:"0.1em",marginBottom:8}}>AFTER</div>
        <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
          {before.map(s=>(
            <div key={s} style={{background:"rgba(255,255,255,0.04)",border:"0.5px solid rgba(255,255,255,0.08)",borderRadius:6,padding:"4px 8px",fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#5a5a62"}}>{s}</div>
          ))}
          <div style={{color:"#3a3a42",fontSize:11}}>→</div>
          <div style={{background:"rgba(127,255,212,0.08)",border:"0.5px solid rgba(127,255,212,0.3)",borderRadius:6,padding:"4px 10px",fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"#7fffd4"}}>AI agent</div>
          <div style={{color:"#3a3a42",fontSize:11}}>→</div>
          <div style={{background:"rgba(127,255,212,0.12)",border:"0.5px solid rgba(127,255,212,0.4)",borderRadius:6,padding:"4px 10px",fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:700,color:"#7fffd4"}}>2 hrs / week</div>
        </div>
      </div>
      {/* Saving callout */}
      <div style={{marginTop:14,display:"flex",alignItems:"center",gap:8}}>
        <div style={{flex:1,height:"0.5px",background:"rgba(127,255,212,0.1)"}}/>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#7fffd4",letterSpacing:"0.08em"}}>↓ 93% time saved</span>
        <div style={{flex:1,height:"0.5px",background:"rgba(127,255,212,0.1)"}}/>
      </div>
    </div>
  );
}

function VizGrowth() {
  // Response time bars: Before 6-9h, After 4min
  const bars = [
    {label:"Before",val:100,display:"6-9 hours",color:"rgba(130,38,30,0.5)",border:"rgba(130,38,30,0.4)"},
    {label:"After", val:1,  display:"4 minutes", color:"rgba(127,255,212,0.3)",border:"rgba(127,255,212,0.5)"},
  ];
  return (
    <div style={{background:"rgba(255,255,255,0.02)",border:"0.5px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"18px 20px"}}>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#5a5a62",letterSpacing:"0.1em",marginBottom:14}}>RESPONSE TIME</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {bars.map(b=>(
          <div key={b.label}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,color:"#3a3a42",letterSpacing:"0.1em"}}>{b.label.toUpperCase()}</span>
              <span style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:b.val===1?"#7fffd4":"#e06050"}}>{b.display}</span>
            </div>
            <div style={{height:10,background:"rgba(255,255,255,0.04)",borderRadius:4,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${b.val}%`,minWidth:b.val<5?"4px":undefined,background:b.color,border:`0.5px solid ${b.border}`,borderRadius:4,transition:"width 1s ease"}}/>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:14,display:"flex",gap:8}}>
        {["Prospect","Qualified","Routed","Drafted"].map((s,i)=>(
          <div key={s} style={{flex:1,textAlign:"center"}}>
            <div style={{height:24,background:`rgba(167,139,250,${0.05+i*0.06})`,border:"0.5px solid rgba(167,139,250,0.2)",borderRadius:4,marginBottom:4}}/>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:7,color:"#3a3a42",letterSpacing:"0.06em"}}>{s.toUpperCase()}</span>
          </div>
        ))}
      </div>
      <div style={{marginTop:10,display:"flex",alignItems:"center",gap:8}}>
        <div style={{flex:1,height:"0.5px",background:"rgba(167,139,250,0.1)"}}/>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#a78bfa",letterSpacing:"0.08em"}}>fully automated pipeline</span>
        <div style={{flex:1,height:"0.5px",background:"rgba(167,139,250,0.1)"}}/>
      </div>
    </div>
  );
}

function VizFinance() {
  // Time per report comparison + capacity
  const steps = ["Pull data","Write commentary","Format doc","Send for approval"];
  return (
    <div style={{background:"rgba(255,255,255,0.02)",border:"0.5px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"18px 20px"}}>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#5a5a62",letterSpacing:"0.1em",marginBottom:14}}>TIME PER REPORT</div>
      <div style={{display:"flex",gap:12,marginBottom:14}}>
        <div style={{flex:1,background:"rgba(130,38,30,0.1)",border:"0.5px solid rgba(130,38,30,0.25)",borderRadius:8,padding:"12px 14px",textAlign:"center"}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#e06050",lineHeight:1}}>4-5</div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#5a5a62",marginTop:4}}>hours before</div>
        </div>
        <div style={{display:"flex",alignItems:"center",color:"#3a3a42",fontSize:16}}>→</div>
        <div style={{flex:1,background:"rgba(251,191,36,0.08)",border:"0.5px solid rgba(251,191,36,0.3)",borderRadius:8,padding:"12px 14px",textAlign:"center"}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#fbbf24",lineHeight:1}}>20</div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#5a5a62",marginTop:4}}>min review</div>
        </div>
      </div>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,color:"#3a3a42",letterSpacing:"0.1em",marginBottom:8}}>OLD WORKFLOW</div>
      <div style={{display:"flex",gap:4,marginBottom:14}}>
        {steps.map((s,i)=>(
          <div key={s} style={{flex:1,background:"rgba(255,255,255,0.03)",border:"0.5px solid rgba(255,255,255,0.07)",borderRadius:5,padding:"6px 4px",textAlign:"center"}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:7,color:"#4a4a52",lineHeight:1.4}}>{s.split(" ").map((w,j)=><div key={j}>{w}</div>)}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <div style={{flex:1,height:"0.5px",background:"rgba(251,191,36,0.15)"}}/>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#fbbf24",letterSpacing:"0.08em"}}>+40% client capacity, same team</span>
        <div style={{flex:1,height:"0.5px",background:"rgba(251,191,36,0.15)"}}/>
      </div>
    </div>
  );
}

const CASE_VIZ = { ops: VizOps, growth: VizGrowth, finance: VizFinance };

function CaseStudiesPanel({onClose, onContact}) {
  const [active, setActive] = useState(null);
  const c = active ? CASES.find(x=>x.id===active) : null;
  const Viz = active ? CASE_VIZ[active] : null;

  return (
    <>
      <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:40,animation:"backdropIn 0.3s ease",cursor:"pointer"}}/>
      <div style={{position:"fixed",top:0,right:0,width:"min(520px,100vw)",height:"100vh",background:"linear-gradient(180deg,#0f0f14 0%,#0a0a0d 100%)",borderLeft:"0.5px solid rgba(255,255,255,0.08)",zIndex:50,display:"flex",flexDirection:"column",animation:"slidePanel 0.38s cubic-bezier(0.32,0.72,0,1)",overflowY:"auto"}}>

        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 28px 18px",borderBottom:"0.5px solid rgba(255,255,255,0.06)",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#7fffd4"}}/>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#7fffd4",letterSpacing:"0.12em"}}>CASE STUDIES</span>
          </div>
          <button onClick={()=>active?setActive(null):onClose()} style={{background:"none",border:"none",color:"#5a5a62",cursor:"pointer",fontSize:18,lineHeight:1,padding:"4px 8px",transition:"color 0.18s"}}
            onMouseEnter={e=>e.currentTarget.style.color="#ece9e4"}
            onMouseLeave={e=>e.currentTarget.style.color="#5a5a62"}>{active?"← back":"✕"}</button>
        </div>

        <div style={{padding:"32px 28px 40px",display:"flex",flexDirection:"column",gap:24}}>

          {!active && (<>
            <div>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,color:"#ece9e4",lineHeight:1.25,letterSpacing:"-0.01em",marginBottom:10}}>
                What it looks like when we go inside.
              </h2>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#6b6b72",lineHeight:1.8}}>
                Every engagement starts with us learning how your business actually works. These are real situations, the problems we found, what we built, and what changed.
              </p>
            </div>

            <div style={{height:"0.5px",background:"rgba(255,255,255,0.06)"}}/>

            <div style={{display:"flex",alignItems:"flex-start",gap:10,background:"rgba(255,255,255,0.02)",border:"0.5px solid rgba(255,255,255,0.06)",borderRadius:10,padding:"12px 16px"}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:"#3a3a42",flexShrink:0,marginTop:1}}>⬡</span>
              <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#3a3a42",lineHeight:1.7,margin:0,letterSpacing:"0.04em"}}>
                Client names and logos aren't shown here. Every workspace we build is private to the team it was built for — they own it fully, and we keep it that way.
              </p>
            </div>

            {CASES.map(cs=>(
              <button key={cs.id} onClick={()=>setActive(cs.id)}
                style={{background:"rgba(255,255,255,0.02)",border:"0.5px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"20px 22px",textAlign:"left",cursor:"pointer",transition:"all 0.18s",fontFamily:"'DM Sans',sans-serif"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.borderColor=cs.tagColor.replace(")",",0.3)").replace("rgb","rgba");}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.02)";e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:cs.tagColor,letterSpacing:"0.12em"}}>{cs.tag.toUpperCase()}</span>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:cs.tagColor,letterSpacing:"0.08em"}}>view case →</span>
                </div>
                <p style={{fontSize:13,color:"#6b6b72",lineHeight:1.75,margin:"0 0 12px"}}>{cs.situation.slice(0,120)}…</p>
                <div style={{display:"flex",alignItems:"center",gap:6,paddingTop:10,borderTop:"0.5px solid rgba(255,255,255,0.05)"}}>
                  <div style={{width:4,height:4,borderRadius:"50%",background:cs.tagColor,opacity:0.6}}/>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,color:"#3a3a42",letterSpacing:"0.08em"}}>CLICK TO SEE WHAT WE FOUND + BUILT</span>
                </div>
              </button>
            ))}

            <div style={{height:"0.5px",background:"rgba(255,255,255,0.06)"}}/>

            <button className="pbtn accentbtn" style={{width:"100%",textAlign:"center"}} onClick={()=>{onClose();onContact();}}>
              Talk about your operations
            </button>
          </>)}

          {active && c && Viz && (<>
            <div style={{display:"inline-flex",alignItems:"center",gap:6}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:c.tagColor,letterSpacing:"0.12em"}}>{c.tag.toUpperCase()}</span>
            </div>

            {/* Visualization */}
            <Viz />

            {[
              {label:"THE SITUATION", text:c.situation, color:"#5a5a62"},
              {label:"WHAT WE FOUND", text:c.found, color:"#a78bfa"},
              {label:"WHAT WE BUILT", text:c.built, color:"#7fffd4"},
              {label:"WHAT CHANGED",  text:c.result, color:"#fbbf24"},
            ].map(({label,text,color})=>(
              <div key={label}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color,letterSpacing:"0.12em",marginBottom:10}}>{label}</div>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#6b6b72",lineHeight:1.85,margin:0}}>{text}</p>
              </div>
            ))}

            <div style={{height:"0.5px",background:"rgba(255,255,255,0.06)"}}/>

            <button className="pbtn accentbtn" style={{width:"100%",textAlign:"center"}} onClick={()=>{onClose();onContact();}}>
              Talk about your operations
            </button>
          </>)}

        </div>
      </div>
    </>
  );
}

// ─── About Panel ──────────────────────────────────────────────────────────────

function AboutPanel({onClose, onContact}) {
  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:40,animation:"backdropIn 0.3s ease",cursor:"pointer"}}/>

      {/* Panel */}
      <div style={{position:"fixed",top:0,right:0,width:"min(440px,100vw)",height:"100vh",background:"linear-gradient(180deg,#0f0f14 0%,#0a0a0d 100%)",borderLeft:"0.5px solid rgba(255,255,255,0.08)",zIndex:50,display:"flex",flexDirection:"column",animation:"slidePanel 0.38s cubic-bezier(0.32,0.72,0,1)",overflowY:"auto"}}>

        {/* Panel header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 28px 18px",borderBottom:"0.5px solid rgba(255,255,255,0.06)",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#7fffd4"}}/>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#7fffd4",letterSpacing:"0.12em"}}>ABOUT US</span>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#5a5a62",cursor:"pointer",fontSize:18,lineHeight:1,padding:"4px 8px",transition:"color 0.18s"}}
            onMouseEnter={e=>e.currentTarget.style.color="#ece9e4"}
            onMouseLeave={e=>e.currentTarget.style.color="#5a5a62"}>✕</button>
        </div>

        {/* Panel body */}
        <div style={{padding:"32px 28px 40px",display:"flex",flexDirection:"column",gap:28}}>

          <div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:700,color:"#ece9e4",lineHeight:1.25,letterSpacing:"-0.01em",marginBottom:14}}>
              We go inside companies, learn how they actually work, and build custom AI around it.
            </h2>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#6b6b72",lineHeight:1.8}}>
              Every company has its own rhythm, its own bottlenecks, its own processes running on spreadsheets and institutional memory. We map the real thing, not the org-chart version, and build AI around it.
            </p>
          </div>

          <div style={{height:"0.5px",background:"rgba(255,255,255,0.06)"}}/>

          <div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#a78bfa",letterSpacing:"0.12em",marginBottom:12}}>THE REAL PROBLEM</div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#6b6b72",lineHeight:1.8,marginBottom:12}}>
              According to Deloitte's State of AI in the Enterprise report, the AI skills gap is the single biggest barrier to AI integration, and yet most companies are responding with education, not workflow redesign.
            </p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#8a8a95",lineHeight:1.8,marginBottom:12}}>
              Sending your team to AI courses doesn't get workflows built. It doesn't identify what's broken. It doesn't produce agents that actually run your operations better.
            </p>
            <a
              href="https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#a78bfa",letterSpacing:"0.08em",textDecoration:"none",borderBottom:"0.5px solid rgba(167,139,250,0.35)",paddingBottom:1,transition:"color 0.18s"}}
            >↗ Deloitte · State of AI in the Enterprise 2026</a>
          </div>

          <div style={{height:"0.5px",background:"rgba(255,255,255,0.06)"}}/>

          <div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#7fffd4",letterSpacing:"0.12em",marginBottom:12}}>WHAT IS FORWARD DEPLOYED ENGINEERING</div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#6b6b72",lineHeight:1.8,marginBottom:12}}>
              Forward Deployed Engineering is one of the fastest-growing roles in tech. A Forward Deployed Engineer (FDE) embeds directly inside a customer's business, learns how it actually operates, and builds solutions around the real problems, not the ones assumed from the outside.
            </p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#8a8a95",lineHeight:1.8,marginBottom:12}}>
              Salesforce called it "today's hottest role." Job postings for FDEs grew over 800% in 2025 alone. It's the model that works when complexity is high and off-the-shelf doesn't cut it. That's exactly how On Forward operates.
            </p>
            <a
              href="https://www.salesforce.com/blog/forward-deployed-engineer/"
              target="_blank"
              rel="noopener noreferrer"
              style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#7fffd4",letterSpacing:"0.08em",textDecoration:"none",borderBottom:"0.5px solid rgba(127,255,212,0.35)",paddingBottom:1,transition:"color 0.18s"}}
            >↗ Salesforce · Forward Deployed Engineer: 5 Skills for This New Role</a>
          </div>

          <div style={{height:"0.5px",background:"rgba(255,255,255,0.06)"}}/>

          <div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#7fffd4",letterSpacing:"0.12em",marginBottom:12}}>WE TRANSLATE</div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#6b6b72",lineHeight:1.8}}>
              We are the people who can sit between AI capability and real business problems and make them speak the same language. We understand both sides, and we build the bridge.
            </p>
          </div>

          <div style={{height:"0.5px",background:"rgba(255,255,255,0.06)"}}/>

          <div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#fbbf24",letterSpacing:"0.12em",marginBottom:12}}>HOW WE WORK</div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#6b6b72",lineHeight:1.8,marginBottom:12}}>
              We embed with your team. We ask the right questions and map how your operations actually run, not the org-chart version, the real version. Then we find what's underautomated, what's broken, what's eating hours that don't need to be eaten.
            </p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#8a8a95",lineHeight:1.8}}>
              Then we build. Custom AI workflows and agents designed specifically around those gaps. Not generic. Not off-the-shelf. Yours, and it stays yours after we're done.
            </p>
          </div>

          <div style={{background:"rgba(127,255,212,0.04)",border:"0.5px solid rgba(127,255,212,0.12)",borderRadius:12,padding:"20px 22px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              {[{n:"9",label:"Engagements completed"},{n:"12",label:"Early clients"}].map(s=>(
                <div key={s.label}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:"#7fffd4",lineHeight:1}}>{s.n}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#5a5a62",marginTop:4}}>{s.label}</div>
                </div>
              ))}
            </div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#6b6b72",lineHeight:1.75}}>
              Our first clients were early movers. They let us inside before it was obvious. Every engagement produced something custom, AI that runs in their business today, built around how they actually operate.
            </p>
          </div>

          <div style={{background:"rgba(255,255,255,0.025)",border:"0.5px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"18px 20px"}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#8a8a95",lineHeight:1.8,fontStyle:"italic"}}>
              "We go in. We learn how your business really works. We find what AI can fix. We build it. That's the whole model."
            </p>
          </div>

          {/* CTA — opens contact modal, closes about panel */}
          <button
            className="pbtn accentbtn"
            style={{width:"100%",textAlign:"center"}}
            onClick={()=>{ onClose(); onContact(); }}
          >
            Start the conversation
          </button>

        </div>
      </div>
    </>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [step, setStep]             = useState(0);
  const [dept, setDept]             = useState(null);
  const [selectedTools, setST]      = useState([]);
  const [isoPhase, setIsoPhase]     = useState(0);
  const [revealPhase, setRP]        = useState(0);
  const [taskPct, setTaskPct]       = useState(100);
  const [growthPct, setGrowthPct]   = useState(12);
  const [graphPoints, setGP]        = useState([12]);
  const [aboutOpen, setAboutOpen]         = useState(false);
  const [casesOpen, setCasesOpen]         = useState(false);
  const [contactOpen, setContact]         = useState(false);
  const [investorOpen, setInvestorOpen]   = useState(false);
  const [investorForm, setInvestorForm]   = useState(false);

  const openContact = () => setContact(true);
  const closeContact = () => setContact(false);

  const handleToolDone = (sel) => { setST(sel); setStep(3); };

  useEffect(()=>{
    if(step!==4) return;
    setRP(0); setIsoPhase(0);
    const phases=[1,2,3,4].map((p,i)=>setTimeout(()=>setIsoPhase(p),(i+1)*620));
    const transition=setTimeout(()=>setRP(1),3600);
    return()=>{ phases.forEach(clearTimeout); clearTimeout(transition); };
  },[step]);

  useEffect(()=>{
    if(step!==4||revealPhase!==1) return;
    setTaskPct(100); setGrowthPct(12); setGP([12]);
    let tick=0;
    const iv=setInterval(()=>{
      tick++;
      const t=Math.max(8,Math.round(100-tick*4.6));
      const g=Math.min(91,Math.round(12+tick*3.95));
      setTaskPct(t); setGrowthPct(g);
      setGP(p=>[...p.slice(-24),g]);
      if(tick>=20) clearInterval(iv);
    },160);
    const prompt=setTimeout(()=>setContact(true),7000);
    return()=>{ clearInterval(iv); clearTimeout(prompt); };
  },[step,revealPhase]);

  const reset=()=>{ setStep(0); setDept(null); setST([]); setIsoPhase(0); setRP(0); };

  const cardMaxW = step===4?"860px":step===3?"660px":"560px";
  const stepLabels = ["Select","Configure","Journey","Live"];

  return (
    <>
      <style>{CSS}</style>
      <div style={{height:"100vh",width:"100vw",overflow:"hidden",background:"#08080b",display:"flex",flexDirection:"column",fontFamily:"'DM Sans',sans-serif",position:"relative"}}>

        {/* Floating paths bg */}
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />

        {/* Grid bg */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",backgroundSize:"52px 52px",maskImage:"radial-gradient(ellipse 90% 90% at 50% 50%,black 20%,transparent 100%)"}}/>
        <div style={{position:"absolute",top:"8%",left:"50%",transform:"translateX(-50%)",width:700,height:500,background:"radial-gradient(ellipse,rgba(127,255,212,0.032) 0%,transparent 70%)",pointerEvents:"none"}}/>

        {/* HEADER */}
        <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 32px",height:54,flexShrink:0,borderBottom:"0.5px solid rgba(255,255,255,0.05)",position:"relative",zIndex:10}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <img
              src="/favicon.svg"
              alt="On Forward logo"
              style={{width:22,height:22,display:"block"}}
            />
            <span style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:600,color:"#ece9e4",letterSpacing:"0.02em"}}>On Forward</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            {step>0&&<button className="rbtn" onClick={reset}>↩ restart</button>}
            <button className="abtn" onClick={()=>setAboutOpen(true)}>About us</button>
            <button className="abtn" onClick={()=>setCasesOpen(true)}>Case studies</button>
            <button className="abtn" onClick={()=>setInvestorOpen(true)}>We're Hiring</button>
            {/* ── "Get in Touch" opens the contact modal ── */}
            <button className="hcta" onClick={openContact}>Get in Touch</button>
          </div>
        </header>

        {/* MAIN */}
        <main style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"10px 24px",position:"relative",zIndex:5,overflow:"hidden"}}>

          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,animation:"fadeUp 0.6s ease both"}}>
            <div style={{width:1,height:12,background:"rgba(130, 38, 30)"}}/>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#6b6b72",letterSpacing:"0.14em"}}>The AI skills gap is the #1 barrier to adoption.</span>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#82261E",letterSpacing:"0.14em"}}> We close it. </span>
            <div style={{width:1,height:12,background:"rgba(130, 38, 30)"}}/>
          </div>

          {step===0&&(
            <div style={{textAlign:"center",marginBottom:26,animation:"fadeUp 0.7s 0.1s ease both"}}>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,4vw,48px)",fontWeight:800,color:"#ece9e4",lineHeight:1.15,letterSpacing:"-0.02em",marginBottom:14}}>
                The world moves forward.<br/>
                <span style={{color:"transparent",backgroundImage:"linear-gradient(90deg,#F0F5F3,#82261E)",backgroundClip:"text",WebkitBackgroundClip:"text"}}>So should your business.</span>
              </h1>
              <p style={{fontSize:13,color:"#ece9e4",maxWidth:560,margin:"0 auto 10px",lineHeight:1.75}}>
                Most companies are trying to adopt AI through courses, tools, and strategy decks. That's not how it works. We embed with your team, map how your operations actually run, and build custom AI agents and workflows around the real thing.
              </p>
              <p style={{fontSize:13,color:"#5a5a62",maxWidth:380,margin:"0 auto",lineHeight:1.7}}>
                Not a platform. Not a template. Custom AI built for how your business actually works.{" "}
                <span style={{color:"#F0F5F3"}}>See it take shape.</span>
              </p>
            </div>
          )}

          {/* Wizard card */}
          <div className="wcard" style={{width:"100%",maxWidth:cardMaxW,transition:"max-width 0.5s cubic-bezier(0.4,0,0.2,1)",animation:"fadeUp 0.6s 0.2s ease both"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 18px",borderBottom:"0.5px solid rgba(255,255,255,0.05)"}}>
              <div style={{display:"flex",gap:6}}>
                {["#ff5f57","#febc2e","#28c840"].map((c,i)=><div key={i} style={{width:9,height:9,borderRadius:"50%",background:c,opacity:0.8}}/>)}
              </div>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#3a3a42",letterSpacing:"0.06em"}}>
                {["ready","dialogue","configure","journey","workspace · live"][step]}
              </span>
              <div style={{display:"flex",gap:4}}>
                {stepLabels.map((l,i)=>(
                  <div key={l} title={l} style={{width:18,height:3,borderRadius:2,background:step>i?"#7fffd4":"rgba(255,255,255,0.07)",transition:"background 0.4s"}}/>
                ))}
              </div>
            </div>

            {step===0&&(
              <div style={{padding:"44px 40px",textAlign:"center",animation:"fadeIn 0.4s ease"}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:"#F0F5F3",marginBottom:24}}>Your workspace begins with a conversation.</div>
                <button
                  className="pbtn"
                  onClick={()=>setStep(1)}
                  style={{background:"linear-gradient(25deg,rgb(0, 0, 0) 0%, #82261E 70%)",border:"0.5px solid rgba(130,38,30,0.45)",color:"#F0F5F3"}}
                >
                  Begin setup
                </button>
              </div>
            )}
            {step===1&&<StepDialogue onSelect={d=>{setDept(d);setStep(2);}}/>}
            {step===2&&<StepToolSelect dept={dept} onDone={handleToolDone}/>}
            {step===3&&<StepJourney dept={dept} selectedTools={selectedTools} onContinue={()=>setStep(4)}/>}
            {step===4&&<StepReveal dept={dept} selectedTools={selectedTools} isoPhase={isoPhase} taskPct={taskPct} growthPct={growthPct} graphPoints={graphPoints} revealPhase={revealPhase}/>}
          </div>

          {/* Progress indicators */}
          {step>0&&(
            <div style={{display:"flex",alignItems:"center",gap:12,marginTop:14,animation:"fadeIn 0.5s ease"}}>
              {stepLabels.map((label,i)=>(
                <div key={label} style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:14,height:14,borderRadius:"50%",background:step>i?"rgba(127,255,212,0.15)":"rgba(255,255,255,0.04)",border:`0.5px solid ${step>i?"rgba(127,255,212,0.4)":"rgba(255,255,255,0.07)"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.35s"}}>
                    {step>i&&<div style={{width:5,height:5,borderRadius:"50%",background:"#7fffd4"}}/>}
                  </div>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:step>i?"#7fffd4":"#2a2a32",transition:"color 0.35s",letterSpacing:"0.08em"}}>{label.toUpperCase()}</span>
                  {i<stepLabels.length-1&&<div style={{width:14,height:0.5,background:step>i+1?"rgba(127,255,212,0.3)":"rgba(255,255,255,0.05)",transition:"background 0.35s"}}/>}
                </div>
              ))}
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer style={{height:44,flexShrink:0,borderTop:"0.5px solid rgba(171, 79, 79, 0.04)",display:"flex",alignItems:"center",justifyContent:"center",gap:10,position:"relative",zIndex:10}}>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#6b6b72"}}>Your custom AI solution starts with a conversation.</span>
          {/* ── "Start the Conversation" opens the contact modal ── */}
          <button
            style={{background:"transparent",border:"none",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#8a8a95",cursor:"pointer",textDecoration:"underline",textDecorationColor:"rgba(253, 253, 253, 0.3)",textUnderlineOffset:3,padding:0}}
            onClick={openContact}
          >
            Start the Conversation
          </button>
        </footer>

        {/* ABOUT PANEL — passes onContact so its CTA opens the modal */}
        {aboutOpen && (
          <AboutPanel
            onClose={()=>setAboutOpen(false)}
            onContact={openContact}
          />
        )}

        {/* CASE STUDIES PANEL */}
        {casesOpen && (
          <CaseStudiesPanel
            onClose={()=>setCasesOpen(false)}
            onContact={openContact}
          />
        )}

        {/* CONTACT MODAL */}
        {contactOpen && (
          <ContactModal
            onClose={closeContact}
            dept={dept}
            selectedTools={selectedTools}
          />
        )}
        {investorOpen && <CareersPanel onClose={()=>setInvestorOpen(false)} onContact={()=>setInvestorForm(true)}/>}
        {investorForm && <CareerModal onClose={()=>setInvestorForm(false)}/>}
      </div>
    </>
  );
}