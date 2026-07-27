:root{--navy:#0b1f33;--gold:#c9a54d;--bg:#eef2f5;--border:#d9dee5;--muted:#68737d}
*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif;background:var(--bg);color:#17212b}button,input,select{font:inherit}
.authPage{min-height:100vh;display:grid;place-items:center;background:linear-gradient(135deg,var(--navy),#153f66);padding:20px}
.authCard{width:min(430px,100%);background:#fff;border-radius:20px;padding:30px;text-align:center}.logo{width:70px;height:70px;border-radius:50%;display:grid;place-items:center;background:var(--gold);font-weight:900;margin:auto}.eyebrow{color:var(--gold);font-size:.75rem;font-weight:900;letter-spacing:.14em}
.authTabs{display:grid;grid-template-columns:1fr 1fr;background:#edf0f2;padding:5px;border-radius:10px;margin:20px 0}.authTabs button{border:0;padding:10px;background:transparent;border-radius:8px;font-weight:700}.authTabs .active{background:#fff}
label{display:flex;flex-direction:column;gap:7px;text-align:left;font-weight:700;margin-bottom:14px}input,select{border:1px solid var(--border);padding:12px;border-radius:9px}
.primary{border:0;background:var(--gold);padding:12px 16px;border-radius:9px;font-weight:900}.message{background:#f2f5f7;padding:10px;border-radius:8px}
.shell{min-height:100vh;display:grid;grid-template-columns:240px 1fr}.shell aside{background:var(--navy);color:#fff;padding:22px;display:flex;flex-direction:column;gap:8px}.shell aside button{border:0;background:transparent;color:#fff;padding:12px;text-align:left;border-radius:9px;font-weight:700}.shell aside button.active{background:var(--gold);color:#111}
.content{padding:28px}.hero{background:linear-gradient(135deg,var(--navy),#153f66);color:#fff;border-radius:18px;padding:28px}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-top:18px}
.stats article,.panel{background:#fff;border:1px solid var(--border);border-radius:14px;padding:18px}.stats span{display:block;color:var(--muted);margin-bottom:8px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px}.full{grid-column:1/-1}
.row{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border)}.row small{display:block;color:var(--muted);margin-top:4px}.loading{min-height:100vh;display:grid;place-items:center}
@media(max-width:850px){.shell{grid-template-columns:1fr}.stats,.grid{grid-template-columns:1fr}}
