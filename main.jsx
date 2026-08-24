import React,{useState}from"react";import{createRoot}from"react-dom/client";import"./styles.css";
const morning=[
{name:"Chin tucks + neck side stretch",dose:"30 sec",breath:"Exhale into the tuck/stretch; inhale back to neutral.",instructions:"Stand tall. Draw your chin straight back without looking down. Then gently tilt one ear toward the shoulder."},
{name:"Standing reach + side bend",dose:"25 sec",breath:"Inhale reaching tall; exhale into each side bend.",instructions:"Reach both arms overhead. Alternate gentle side bends. Think tall, not deep."},
{name:"Standing torso rotations",dose:"35 sec",breath:"Easy rhythmic breathing; exhale into each rotation.",instructions:"Feet shoulder-width, knees soft. Rotate left and right with relaxed arms."},
{name:"Bodyweight squats",dose:"10 reps",breath:"Inhale down; exhale as you stand.",instructions:"Feet about shoulder width. Sit hips back and down to a comfortable depth."},
{name:"World's Greatest Stretch + twist",dose:"2 / side",breath:"Inhale to lengthen; exhale as you rotate and look up.",instructions:"Long lunge. Inside hand to floor. Rotate the top arm to the ceiling and look at it."},
{name:"Cat-cow",dose:"6–8 reps",breath:"Inhale into cow; exhale into cat.",instructions:"On hands and knees, slowly extend then round the spine."},
{name:"Wall slides",dose:"8 reps",breath:"Inhale sliding up; exhale returning down.",instructions:"Back and head against wall. Slide arms up only as far as comfortable."},
{name:"Calf raises + ankle rocks",dose:"10 + 10",breath:"Calf raise: exhale up, inhale down. Ankle rock: exhale forward, inhale back.",instructions:"Do 10 calf raises, then 10 gentle ankle rocks."}
];
const night=[
{name:"Knee-to-wall ankle rocks",dose:"45 sec / side",breath:"Inhale back; exhale as the knee travels forward.",instructions:"Heel stays flat. Drive the knee forward over the toes, then rock back."},
{name:"Lying windshield wipers",dose:"8–10 / side",breath:"Inhale at centre; exhale as the knees fall.",instructions:"Lie on your back with knees bent. Let both knees fall side to side while shoulders stay down."},
{name:"Bodyweight squats",dose:"15 reps",breath:"Inhale down; exhale as you stand.",instructions:"Feet about shoulder width. Sit hips back and down through a comfortable range."},
{name:"Deep squat hold",dose:"30 sec",breath:"Slow inhale into belly/ribs; long exhale and relax deeper.",instructions:"Settle into a comfortable deep squat. Keep feet planted and chest tall."},
{name:"Open Books",dose:"5 / side",breath:"Inhale to prepare; long exhale while rotating open.",instructions:"Lie on your side, knees stacked. Rotate top arm and chest open. Eyes follow the hand."},
{name:"Low-lunge torso twist",dose:"4–5 / side",breath:"Inhale to lengthen; exhale as you rotate and look up.",instructions:"Inside hand down. Rotate chest open, reach the other arm up, and look toward the hand."},
{name:"Push-ups",dose:"8–15 reps",breath:"Inhale down; exhale while pushing up.",instructions:"Keep your body in one line. Lower under control. Stop 2–3 reps before failure."},
{name:"Wall slides",dose:"8 slow reps",breath:"Inhale sliding upward; exhale coming down.",instructions:"Keep back and head against the wall. Slide arms up only as far as comfortable."},
{name:"Neck release",dose:"20–30 sec / side",breath:"Inhale neutral; exhale gently into the stretch.",instructions:"Use very light hand pressure for upper-trap and levator stretches. Never force the neck."},
{name:"Child's-pose lat stretch",dose:"45 sec / side",breath:"Breathe into the stretched-side ribs; long exhale and soften.",instructions:"Sit hips back and walk hands slightly to one side until you feel the opposite lat."},
{name:"Windshield-wiper hold",dose:"30–45 sec",breath:"About 4-sec inhale; 6-sec exhale.",instructions:"Drop knees to one side and let the hips relax. Do not force range."},
{name:"Supine spinal twist",dose:"30–45 sec / side",breath:"4-sec inhale; 6-sec exhale. Soften on every exhale.",instructions:"Bring knees slightly toward chest, let them fall together, and keep shoulders relaxed toward the floor."}
];
const office=[
{name:"Chin tucks",dose:"8 reps",breath:"Exhale as you draw the chin back; inhale to release.",instructions:"Sit or stand tall. Slide your head straight back as if making a gentle double chin."},
{name:"Upper-trap neck stretch",dose:"20 sec / side",breath:"Slow inhale; longer exhale as the shoulder relaxes.",instructions:"Bring one ear gently toward the same-side shoulder while keeping the opposite shoulder heavy."},
{name:"Doorway pec opener",dose:"20–30 sec / side",breath:"Inhale tall; exhale as you rotate away.",instructions:"Forearm on doorway or wall edge. Turn gently away until you feel the chest/front shoulder."},
{name:"Seated thoracic rotation",dose:"5 / side",breath:"Inhale tall; exhale into the rotation.",instructions:"Sit tall with feet planted. Rotate your chest without forcing the low back."},
{name:"Standing hip-flexor reset",dose:"20 sec / side",breath:"Inhale tall; exhale as you gently tuck the pelvis.",instructions:"Split stance. Squeeze the back-side glute and gently tuck the pelvis."},
{name:"Desk-supported ankle rocks",dose:"10 / side",breath:"Exhale forward; inhale back.",instructions:"Hold the desk lightly. Keep heel down and drive the knee forward over toes."}
];
const routines={Morning:morning,Night:night,Office:office};
function App(){const[tab,setTab]=useState("Night"),[idx,setIdx]=useState(0),[logs,setLogs]=useState(()=>JSON.parse(localStorage.getItem("mobility-logs")||"[]")),[feel,setFeel]=useState("Good"),[amount,setAmount]=useState(""),[note,setNote]=useState(""),[coach,setCoach]=useState(false),[q,setQ]=useState(""),[reply,setReply]=useState(""),[loading,setLoading]=useState(false);const list=routines[tab],ex=list[idx];
function switchTab(t){setTab(t);setIdx(0);setFeel("Good");setAmount("");setNote("")}
function save(){const e={ts:new Date().toISOString(),routine:tab,exercise:ex.name,dose:ex.dose,amount,feel,note};const n=[...logs,e];setLogs(n);localStorage.setItem("mobility-logs",JSON.stringify(n));setAmount("");setNote("");setFeel("Good");if(idx<list.length-1)setIdx(idx+1)}
async function ask(e){e.preventDefault();if(!q.trim())return;setLoading(true);setReply("");try{const r=await fetch("/api/coach",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:q,context:logs.slice(-25),routines})});const d=await r.json();setReply(d.answer||d.error||"Coach unavailable.")}catch{setReply("AI Coach is not connected yet. Deploy with OPENAI_API_KEY to enable it.")}finally{setLoading(false)}}
return <main className="app"><header><div><div className="kicker">Personal mobility</div><h1>Mobility Coach</h1></div><button className="coachBtn" onClick={()=>setCoach(true)}>AI Coach</button></header>
<nav className="tabs">{Object.keys(routines).map(t=><button key={t} onClick={()=>switchTab(t)} className={tab===t?"active":""}>{t}</button>)}</nav>
<div className="progress"><div style={{width:`${((idx+1)/list.length)*100}%`}}/></div>
<section className="card"><div className="topline"><span>{tab} • {idx+1}/{list.length}</span><b>{ex.dose}</b></div><div className="figure">{idx+1}</div><h2>{ex.name}</h2>
<div className="info"><h3>Instructions</h3><p>{ex.instructions}</p></div><div className="breath"><h3>Breathing</h3><p>{ex.breath}</p></div>
<label>What did you complete?</label><input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="reps or seconds"/>
<label>How did it feel?</label><div className="feel">{["Easy","Good","Challenging","Too much"].map(x=><button key={x} className={feel===x?"sel":""} onClick={()=>setFeel(x)}>{x}</button>)}</div>
<label>Note (optional)</label><textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Tighter on left, shoulder felt better, etc."/>
<div className="actions"><button disabled={idx===0} onClick={()=>setIdx(Math.max(0,idx-1))}>Back</button><button className="primary" onClick={save}>{idx===list.length-1?"Finish + Save":"Save + Next"}</button></div></section>
<section className="stats"><div><b>{logs.filter(x=>x.routine===tab).length}</b><span>Logs</span></div><div><b>{logs.filter(x=>x.feel==="Good"||x.feel==="Easy").length}</b><span>Good/Easy</span></div><div><b>{new Set(logs.map(x=>x.ts.slice(0,10))).size}</b><span>Days</span></div></section>
{coach&&<div className="backdrop" onClick={()=>setCoach(false)}><section className="modal" onClick={e=>e.stopPropagation()}><div className="modalHead"><div><div className="kicker">AI Coach</div><h2>Ask about your routine</h2></div><button onClick={()=>setCoach(false)}>×</button></div><p className="muted">Uses recent logs to help with progression, swaps, and technique. Not for diagnosing injuries.</p><form onSubmit={ask}><textarea value={q} onChange={e=>setQ(e.target.value)} placeholder="My wall slides keep feeling challenging. Should I change anything?"/><button className="primary" disabled={loading}>{loading?"Thinking…":"Ask Coach"}</button></form>{reply&&<div className="reply">{reply}</div>}</section></div>}</main>}
createRoot(document.getElementById("root")).render(<App/>);