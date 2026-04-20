import { useState, useEffect, useRef } from "react";

try {
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap";
  document.head.appendChild(l);
} catch (e) {}

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

.wcard{background:linear-gradient(160deg,#111116 0%,#0c0c10 100%);border:0.5px solid rgba(255,255,255,0.07);border-radius:16px;box-shadow:0 40px 80px rgba(0,0,0,0.6),0 0 0 0.5px rgba(127,255,212,0.05) inset;position:relative;overflow:hidden;}
.wcard::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.01) 2px,rgba(255,255,255,0.01) 4px);pointer-events:none;}
.dbtn{background:rgba(255,255,255,0.03);border:0.5px solid rgba(255,255,255,0.08);border-radius:10px;color:#ece9e4;cursor:pointer;padding:11px 14px;text-align:left;transition:all 0.18s ease;font-family:'DM Sans',sans-serif;width:100%;}
.dbtn:hover{background:rgba(127,255,212,0.07);border-color:rgba(127,255,212,0.28);transform:translateX(3px);}
.dbtn:hover .di{color:#7fffd4!important;}
.tbtn{background:rgba(255,255,255,0.03);border:0.5px solid rgba(255,255,255,0.08);border-radius:10px;color:#ece9e4;cursor:pointer;padding:13px 14px;text-align:left;transition:all 0.2s ease;font-family:'DM Sans',sans-serif;position:relative;overflow:hidden;}
.tbtn:hover{background:rgba(127,255,212,0.06);border-color:rgba(127,255,212,0.22);}
.tbtn.sel{background:rgba(127,255,212,0.1);border-color:rgba(127,255,212,0.45);}
.tbtn.loading-state{pointer-events:none;opacity:0.6;}
.hcta{background:transparent;border:0.5px solid rgba(255,255,255,0.18);border-radius:8px;color:#ece9e4;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;letter-spacing:0.02em;padding:8px 18px;transition:all 0.18s;}
.hcta:hover{background:rgba(127,255,212,0.09);border-color:rgba(127,255,212,0.4);color:#7fffd4;}
.rbtn{background:rgba(127,255,212,0.07);border:0.5px solid rgba(127,255,212,0.22);border-radius:8px;color:#7fffd4;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.08em;padding:7px 14px;transition:all 0.18s;}
.rbtn:hover{background:rgba(127,255,212,0.14);}
.pbtn{background:rgba(127,255,212,0.12);border:0.5px solid rgba(127,255,212,0.4);border-radius:10px;color:#7fffd4;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:12px 28px;transition:all 0.2s;letter-spacing:0.02em;}
.pbtn:hover{background:rgba(127,255,212,0.2);transform:scale(1.02);}
.abtn{background:transparent;border:none;color:#5a5a62;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:400;letter-spacing:0.01em;padding:8px 14px;transition:color 0.18s;}
.abtn:hover{color:#ece9e4;}
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
  const timerRef = useRef(null);
  const tools = DEPT_TOOLS[dept?.id] || DEPT_TOOLS.product;

  const toggle = (id) => {
    if (loading) return;
    const s = selectedRef.current;
    const next = s.includes(id) ? s.filter(x => x !== id) : [...s, id].slice(0, 4);
    selectedRef.current = next;
    setSelected([...next]);

    if (next.length >= 2 && !timerRef.current) {
      setLoading(true);
      timerRef.current = setTimeout(() => {
        onDone(selectedRef.current);
      }, 2000);
    }
  };

  useEffect(() => () => { if(timerRef.current) clearTimeout(timerRef.current); }, []);

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
          <div style={{display:"flex",justifyContent:"flex-end",marginTop:12}}>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:selected.length>=2?"#7fffd4":"#3a3a42",transition:"color 0.3s"}}>
              {selected.length} selected{selected.length>=2?" — analysing…":""}
            </span>
          </div>
        </>
      ) : (
        <div style={{display:"flex",flexDirection:"column",minHeight:280}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:24}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#fbbf24"}}/>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#fbbf24",letterSpacing:"0.12em"}}>CONFIGURE WORKSPACE</span>
          </div>
          {/* Selected tools confirmation */}
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

      {/* Confirmed tools row */}
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
        {chosen.map(t=>(
          <span key={t.id} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:t.color,background:`${t.color}10`,border:`0.5px solid ${t.color}33`,borderRadius:4,padding:"2px 8px",letterSpacing:"0.06em"}}>{t.icon} {t.label}</span>
        ))}
      </div>

      {/* Timeline */}
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
        <div style={{padding:"14px 20px 16px",flex:1}}>
          {/* Global stats */}
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

          {/* Task drain + graph */}
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

          {/* Live tool panels */}
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

// ─── About Panel ──────────────────────────────────────────────────────────────

function AboutPanel({onClose}) {
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

          {/* Opening */}
          <div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:700,color:"#ece9e4",lineHeight:1.25,letterSpacing:"-0.01em",marginBottom:14}}>
              We build workspaces for teams who are ready to shape the way they work.
            </h2>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#6b6b72",lineHeight:1.8}}>
              Every team has their own rhythm, their own tools, their own chaos. The problem is that most software forces you to adapt to it, not the other way around. We believe that's backwards.
            </p>
          </div>

          {/* Divider */}
          <div style={{height:"0.5px",background:"rgba(255,255,255,0.06)"}}/>

          {/* The honest truth */}
          <div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#a78bfa",letterSpacing:"0.12em",marginBottom:12}}>THE HONEST TRUTH</div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#6b6b72",lineHeight:1.8,marginBottom:12}}>
              Sometimes you just don't know how to put it together. And that's completely normal, not everyone knows what can be automated, or where things should go, or how to structure a workflow that actually holds up under pressure.
            </p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#8a8a95",lineHeight:1.8}}>
              It takes real experience to build something that fits. You need to have built a few of these to know what works and what doesn't. We have.
            </p>
          </div>

          {/* Divider */}
          <div style={{height:"0.5px",background:"rgba(255,255,255,0.06)"}}/>

          {/* Who we are */}
          <div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#7fffd4",letterSpacing:"0.12em",marginBottom:12}}>WHERE WE COME IN</div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#6b6b72",lineHeight:1.8}}>
              We enter exactly at that point, when you know something needs to change but you're not sure where to start. We ask the right questions. We map how your team actually works, not how you think it does on paper. Then we build.
            </p>
          </div>

          {/* Stats block */}
          <div style={{background:"rgba(127,255,212,0.04)",border:"0.5px solid rgba(127,255,212,0.12)",borderRadius:12,padding:"20px 22px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              {[{n:"9",label:"Workspaces built"},{n:"12",label:"First customers"}].map(s=>(
                <div key={s.label}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:"#7fffd4",lineHeight:1}}>{s.n}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#5a5a62",marginTop:4}}>{s.label}</div>
                </div>
              ))}
            </div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#6b6b72",lineHeight:1.75}}>
              Our first 12 customers were brave. They chose to bet on technology early, to raise their game before it became obvious. Nine workspaces built, nine teams that now work differently than they did before.
            </p>
          </div>

          {/* Divider */}
          <div style={{height:"0.5px",background:"rgba(255,255,255,0.06)"}}/>

          {/* The offer */}
          <div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#fbbf24",letterSpacing:"0.12em",marginBottom:12}}>WHAT WE OFFER</div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#6b6b72",lineHeight:1.8,marginBottom:12}}>
              Let us get our hands dirty on your setup. We'll build it right and then you use it forever. It's yours.
            </p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#8a8a95",lineHeight:1.8}}>
              And we don't disappear after launch. As your team grows, changes direction, hires new people, or just needs a tweak, we're here. Support to adapt, evolve, troubleshoot, and keep everything working the way it should.
            </p>
          </div>

          {/* Closing */}
          <div style={{background:"rgba(255,255,255,0.025)",border:"0.5px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"18px 20px"}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#8a8a95",lineHeight:1.8,fontStyle:"italic"}}>
              "We know it. We can do it. And we've done it. Now it's your turn, let's build something that actually fits the way your team works."
            </p>
          </div>

          {/* CTA */}
          <button className="pbtn" style={{width:"100%",textAlign:"center"}} onClick={onClose}>
            Start the conversation
          </button>

        </div>
      </div>
    </>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [step, setStep]           = useState(0);
  const [dept, setDept]           = useState(null);
  const [selectedTools, setST]    = useState([]);
  const [isoPhase, setIsoPhase]   = useState(0);
  const [revealPhase, setRP]      = useState(0);
  const [taskPct, setTaskPct]     = useState(100);
  const [growthPct, setGrowthPct] = useState(12);
  const [graphPoints, setGP]      = useState([12]);
  const [aboutOpen, setAboutOpen] = useState(false);

  // Step 2 → 3: handled inside StepToolSelect via onDone
  const handleToolDone = (sel) => { setST(sel); setStep(3); };

  // Step 4: iso animation, then live
  useEffect(()=>{
    if(step!==4) return;
    setRP(0); setIsoPhase(0);
    const phases=[1,2,3,4].map((p,i)=>setTimeout(()=>setIsoPhase(p),(i+1)*620));
    const transition=setTimeout(()=>setRP(1),3600);
    return()=>{ phases.forEach(clearTimeout); clearTimeout(transition); };
  },[step]);

  // Live dashboard animation
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
    return()=>clearInterval(iv);
  },[step,revealPhase]);

  const reset=()=>{ setStep(0); setDept(null); setST([]); setIsoPhase(0); setRP(0); };

  // Card width adapts per step
  const cardMaxW = step===4?"860px":step===3?"660px":"560px";

  // Step progress labels
  const stepLabels = ["Select","Configure","Journey","Live"];
  // step 0=landing, 1=dept, 2=tools, 3=journey, 4=live → progress 0-4
  const progressStep = step; // maps naturally

  return (
    <>
      <style>{CSS}</style>
      <div style={{height:"100vh",width:"100vw",overflow:"hidden",background:"#08080b",display:"flex",flexDirection:"column",fontFamily:"'DM Sans',sans-serif",position:"relative"}}>

        {/* Grid bg */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",backgroundSize:"52px 52px",maskImage:"radial-gradient(ellipse 90% 90% at 50% 50%,black 20%,transparent 100%)"}}/>
        <div style={{position:"absolute",top:"8%",left:"50%",transform:"translateX(-50%)",width:700,height:500,background:"radial-gradient(ellipse,rgba(127,255,212,0.032) 0%,transparent 70%)",pointerEvents:"none"}}/>

        {/* HEADER */}
        <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 32px",height:54,flexShrink:0,borderBottom:"0.5px solid rgba(255,255,255,0.05)",position:"relative",zIndex:10}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:22,height:22,borderRadius:6,background:"rgba(127,255,212,0.11)",border:"0.5px solid rgba(127,255,212,0.26)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <div style={{width:7,height:7,background:"#7fffd4",borderRadius:2}}/>
            </div>
            <span style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:600,color:"#ece9e4",letterSpacing:"0.02em"}}>The New Era of Work</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            {step>0&&<button className="rbtn" onClick={reset}>↩ restart</button>}
            <button className="abtn" onClick={()=>setAboutOpen(true)}>About us</button>
            <button className="hcta">Get in Touch</button>
          </div>
        </header>

        {/* MAIN */}
        <main style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"10px 24px",position:"relative",zIndex:5,overflow:"hidden"}}>

          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,animation:"fadeUp 0.6s ease both"}}>
            <div style={{width:1,height:12,background:"rgba(130, 38, 30)"}}/>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#3a3a42",letterSpacing:"0.14em"}}>When the world changes, you change with it.</span>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"#82261E",letterSpacing:"0.14em"}}> Change is constant; your adaptability is key. </span>
            <div style={{width:1,height:12,background:"rgba(130, 38, 30)"}}/>
          </div>

          {step===0&&(
            <div style={{textAlign:"center",marginBottom:26,animation:"fadeUp 0.7s 0.1s ease both"}}>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,4vw,48px)",fontWeight:800,color:"#ece9e4",lineHeight:1.15,letterSpacing:"-0.02em",marginBottom:14}}>
                build your own workspace.<br/>
                <span style={{color:"transparent",backgroundImage:"linear-gradient(90deg,#F0F5F3,#82261E)",backgroundClip:"text",WebkitBackgroundClip:"text"}}>set your automations.</span>
              </h1>
              <p style={{fontSize:13,color:"#4a4a52",maxWidth:6000,margin:"0 auto 10px",lineHeight:1.75}}>
                Regardless of who you are or what your team does, you deserve a workspace shaped exactly around your needs. No noise. No bloat. Just what you actually use.
              </p>
              <p style={{fontSize:13,color:"#5a5a62",maxWidth:380,margin:"0 auto",lineHeight:1.7}}>
                A workspace built around your team, from discovery to live.{" "}
                <span style={{color:"#F0F5F3"}}>Watch yours take shape.</span>
              </p>
            </div>
          )}

          {/* Wizard card */}
          <div className="wcard" style={{width:"100%",maxWidth:cardMaxW,transition:"max-width 0.5s cubic-bezier(0.4,0,0.2,1)",animation:"fadeUp 0.6s 0.2s ease both"}}>
            {/* Window chrome */}
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
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#2a2a32"}}>Your unique workspace is 90 days away.</span>
          <button style={{background:"transparent",border:"none",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"#8a8a95",cursor:"pointer",textDecoration:"underline",textDecorationColor:"rgba(253, 253, 253, 0.3)",textUnderlineOffset:3,padding:0}}
            onMouseEnter={e=>e.currentTarget.style.color="#8a8a95"}
            onMouseLeave={e=>e.currentTarget.style.color="#8a8a95"}>
            Start the Conversation
          </button>
        </footer>

        {/* ABOUT PANEL */}
        {aboutOpen&&<AboutPanel onClose={()=>setAboutOpen(false)}/>}
      </div>
    </>
  );
}
