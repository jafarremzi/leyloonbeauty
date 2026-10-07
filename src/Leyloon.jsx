import { useState, useEffect, useRef } from "react";

/* ───────── data ───────── */
const f = (n) => n.toLocaleString("fa-IR");
const CATS = ["همه", "پوست", "آرایش", "مو", "عروس"];
const P = [
  { n: "سرم آبرسان پوست", p: 890000, c: "پوست", t: "serum", b1: "#f8e3dc", b2: "#f1c9c0", m: "#fff6f0", a: "#b08a57", tag: "پرفروش" },
  { n: "کرم شب ترمیم‌کننده", p: 1250000, c: "پوست", t: "jar", b1: "#efe3d2", b2: "#e0c9a6", m: "#fffaf2", a: "#171415" },
  { n: "پالت سایه نود", p: 1480000, c: "آرایش", t: "palette", b1: "#ead8e0", b2: "#d6b4c4", m: "#2a2124", a: "#e4b7a6", tag: "جدید" },
  { n: "رژلب مات مخملی", p: 420000, c: "آرایش", t: "lip", b1: "#f5d3d1", b2: "#e9a9a8", m: "#171415", a: "#b3363f" },
  { n: "روغن مراقبت مو", p: 650000, c: "مو", t: "oil", b1: "#e6e8d9", b2: "#c8cfae", m: "#fbfaf2", a: "#8a7a3f" },
  { n: "ست مراقبت عروس", p: 3200000, c: "عروس", t: "set", b1: "#f4dfd6", b2: "#e8c0b2", m: "#fffaf6", a: "#b08a57", tag: "ویژه عروس" },
];
const SERVICES = [
  ["آرایش عروس", "مشاوره عروس", "#e8b8b0"],
  ["آرایش دائم", "ابرو، چشم، لب", "#c9a36b"],
  ["خدمات پوست و مو", "مراقبت و زیبایی", "#d9c3d4"],
  ["آموزش فنی‌وحرفه‌ای", "دوره‌های آرایشگری", "#a9b8a3"],
];
const HERO_PATHS = [
  "M172 88C150 90 138 110 140 135C141 150 136 158 132 168C138 170 140 174 136 180C140 186 138 192 134 196C142 204 150 206 160 204C160 220 156 232 150 244C160 270 190 290 240 300",
  "M172 88C120 66 66 108 78 190C88 250 60 292 40 335",
  "M166 92C130 84 100 120 108 190C114 240 100 280 84 322",
  "M176 98C150 102 128 132 132 200C135 250 126 285 118 318",
];
const bg = (p) => ({ background: `linear-gradient(170deg,${p.b1},${p.b2})` });

/* ───────── product art ───────── */
function Art({ t, m, a, style }) {
  const g = {
    serum: (
      <>
        <rect x="64" y="96" width="72" height="128" rx="14" fill={m} />
        <rect x="84" y="74" width="32" height="26" rx="4" fill={a} />
        <path d="M88 74c0-26 24-26 24 0z" fill="#171415" />
        <rect x="76" y="132" width="48" height="44" rx="4" fill="none" stroke={a} strokeWidth="1.5" />
        <path d="M88 150h24M92 160h16" stroke={a} strokeWidth="1.5" />
      </>
    ),
    jar: (
      <>
        <rect x="52" y="140" width="96" height="86" rx="16" fill={m} />
        <rect x="48" y="112" width="104" height="34" rx="10" fill={a} />
        <path d="M76 184h48M84 196h32" stroke="#b08a57" strokeWidth="1.6" />
        <circle cx="100" cy="168" r="6" fill="none" stroke="#b08a57" strokeWidth="1.5" />
      </>
    ),
    palette: (
      <>
        <rect x="34" y="120" width="132" height="104" rx="14" fill={m} />
        {["#e4b7a6", "#c98c7a", "#a8655a", "#d9b98a", "#8a5a4a", "#f0d3c4"].map((c, i) => (
          <circle key={i} cx={62 + (i % 3) * 38} cy={152 + Math.floor(i / 3) * 38} r="14" fill={c} />
        ))}
      </>
    ),
    lip: (
      <>
        <rect x="76" y="140" width="48" height="86" rx="8" fill={m} />
        <rect x="82" y="86" width="36" height="58" rx="6" fill="#b08a57" />
        <path d="M84 88l28-18c6-4 10 2 6 8l-4 10z" fill={a} />
        <rect x="80" y="170" width="40" height="3" fill="#b08a57" />
      </>
    ),
    oil: (
      <>
        <rect x="70" y="100" width="60" height="126" rx="12" fill={m} />
        <rect x="92" y="60" width="16" height="44" fill={a} />
        <path d="M92 60h40a6 6 0 010 10h-40z" fill={a} />
        <rect x="80" y="140" width="40" height="52" rx="4" fill="none" stroke={a} strokeWidth="1.5" />
        <path d="M100 150c-8 10-8 22 0 28 8-6 8-18 0-28z" fill={a} />
      </>
    ),
    set: (
      <>
        <rect x="30" y="150" width="140" height="76" rx="10" fill={m} />
        <rect x="92" y="150" width="16" height="76" fill={a} />
        <path d="M100 150c-26-30-44-6-24 0zM100 150c26-30 44-6 24 0z" fill={a} />
        <rect x="56" y="92" width="34" height="62" rx="8" fill="#171415" />
        <rect x="64" y="78" width="18" height="18" rx="3" fill={a} />
        <rect x="112" y="108" width="34" height="46" rx="8" fill="#e8c0b2" stroke={a} />
      </>
    ),
  }[t];
  return (
    <svg viewBox="0 0 200 250" style={style} aria-hidden="true">
      <ellipse className="shadow" cx="100" cy="228" rx="52" ry="7" fill="rgba(80,40,40,.15)" />
      <g className="bottle">{g}</g>
    </svg>
  );
}

/* ───────── product card (reveals on scroll, confirms on add) ───────── */
function Card({ p, i, onAdd }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const add = () => {
    onAdd(P.indexOf(p));
    setOk(true);
    setTimeout(() => setOk(false), 1100);
  };
  return (
    <div ref={ref} className={"item" + (on ? " in" : "")} style={{ "--d": `${(i % 3) * 90}ms` }}>
      <div className="tile" style={bg(p)}>
        {p.tag && <span className="tag">{p.tag}</span>}
        <Art t={p.t} m={p.m} a={p.a} />
      </div>
      <h3>{p.n}</h3>
      <div className="row">
        <span>{f(p.p)} تومان</span>
        <button className={"add" + (ok ? " ok" : "")} onClick={add}>{ok ? "اضافه شد ✓" : "افزودن"}</button>
      </div>
    </div>
  );
}

/* ───────── app ───────── */
export default function Leyloon() {
  const [dark, setDark] = useState(() => typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches);
  const [cat, setCat] = useState("همه");
  const [cart, setCart] = useState({});
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [stuck, setStuck] = useState(false);
  const prog = useRef(null), ring = useRef(null), tm = useRef();

  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const sum = Object.entries(cart).reduce((s, [k, q]) => s + P[k].p * q, 0);

  useEffect(() => {
    const on = () => {
      const y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
      setStuck(y > 24);
      if (prog.current) prog.current.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const k = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const go = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const add = (k) => {
    setCart((c) => ({ ...c, [k]: (c[k] || 0) + 1 }));
    setToast(P[k].n + " به سبد اضافه شد");
    clearTimeout(tm.current);
    tm.current = setTimeout(() => setToast(""), 1800);
  };
  const qty = (k, d) => setCart((c) => {
    const n = (c[k] || 0) + d, x = { ...c };
    n < 1 ? delete x[k] : (x[k] = n);
    return x;
  });
  const tilt = (e) => {
    if (e.pointerType !== "mouse" || !ring.current) return;
    const r = ring.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width, dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    ring.current.style.setProperty("--ry", `${dx * 14}deg`);
    ring.current.style.setProperty("--rx", `${-dy * 14}deg`);
  };
  const untilt = () => { ring.current?.style.setProperty("--ry", "0deg"); ring.current?.style.setProperty("--rx", "0deg"); };

  return (
    <div className="ly" dir="rtl" lang="fa" data-theme={dark ? "dark" : "light"}>
      <style>{CSS + KF}</style>

      <div className={"bar" + (stuck ? " stuck" : "")}>
        <div className="wrap">
          <header>
            <a className="logo" href="#" onClick={go("top")}><b>Leyloon</b><small>BEAUTY</small></a>
            <nav>
              <a href="#shop" onClick={go("shop")}>فروشگاه</a>
              <a href="#cats" onClick={go("cats")}>خدمات</a>
              <a href="#book" onClick={go("book")}>رزرو و مشاوره</a>
              <a href="#contact" onClick={go("contact")}>تماس</a>
            </nav>
            <div className="acts">
              <button className="tg" onClick={() => setDark(!dark)} aria-label={dark ? "حالت روشن" : "حالت تیره"}>{dark ? "☀" : "☾"}</button>
              <button className="cartbtn" onClick={() => setOpen(true)} aria-label="سبد خرید">
                سبد خرید <span key={count} className="pop">{f(count)}</span>
              </button>
            </div>
          </header>
        </div>
        <i className="prog" ref={prog} />
      </div>

      <div className="herobg" id="top">
        <div className="blob" />
        <div className="wrap">
          <div className="hero" onPointerMove={tilt} onPointerLeave={untilt}>
            <div>
              <h1>
                <span className="w" style={{ "--i": 0 }}>حس خوب</span><br />
                <span className="w" style={{ "--i": 1 }}><em>زن</em></span>{" "}
                <span className="w" style={{ "--i": 2 }}>بودن</span>
              </h1>
              <p>سالن زیبایی و آموزشگاه فنی‌وحرفه‌ای لیلون در بیرجند. محصولات مراقبتی و آرایشی منتخب ما را حالا آنلاین سفارش دهید.</p>
              <div className="btns">
                <a className="btn solid" href="#shop" onClick={go("shop")}>مشاهده محصولات</a>
                <a className="btn" href="#book" onClick={go("book")}>رزرو نوبت</a>
              </div>
            </div>
            <div className="ring" ref={ring} aria-hidden="true">
              <svg viewBox="0 0 300 360">
                {HERO_PATHS.map((d, i) => <path key={i} pathLength="1" d={d} style={{ animationDelay: `${0.2 + i * 0.35}s` }} />)}
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <section id="cats" style={{ paddingTop: 64 }}>
          <h2>خدمات سالن</h2>
          <p className="sub">برای رزرو هر خدمت، با ما تماس بگیرید.</p>
          <div className="cats">
            {SERVICES.map(([n, s, c]) => (
              <a key={n} href="#book" onClick={go("book")}><i style={{ background: c }} />{n} <span>{s}</span></a>
            ))}
          </div>
        </section>

        <section id="shop">
          <h2>فروشگاه</h2>
          <p className="sub">محصولات نمونه برای نمایش طرح؛ تصاویر و قیمت‌ها با موارد واقعی جایگزین می‌شوند.</p>
          <div className="chips">
            {CATS.map((c) => <button key={c} className={"chip" + (c === cat ? " on" : "")} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          <div className="grid" key={cat}>
            {P.filter((p) => cat === "همه" || p.c === cat).map((p, i) => <Card key={p.n} p={p} i={i} onAdd={add} />)}
          </div>
        </section>
      </div>

      <div className="band" id="book">
        <div className="wrap">
          <div><h2>نوبت خود را رزرو کنید</h2><p>پاسخگویی هر روز از ساعت ۱۰ صبح تا ۷ عصر</p></div>
          <div>
            <a className="btn solid" href="tel:05632441344">رزرو خدمات: ۰۵۶-۳۲۴۴۱۳۴۴</a>
            <a className="btn" href="tel:09151603168">مشاوره عروس و آموزش: ۰۹۱۵۱۶۰۳۱۶۸</a>
          </div>
        </div>
      </div>

      <div className="wrap" id="contact">
        <footer>
          <div><b>لیلون</b>سالن زیبایی و آموزشگاه فنی‌وحرفه‌ای</div>
          <div><b>آدرس</b>بیرجند، خیابان پاسداران، پاسداران ۴۶، انتهای حافظ ۱۰، پلاک ۱</div>
          <div><b>اینستاگرام</b><span dir="ltr">@leyloon_beauty</span></div>
        </footer>
        <div className="lh"><span>نمونه اولیه طراحی سایت فروشگاهی</span><b>برای ساخت نسخه کامل با <span dir="ltr">Labelhook</span> در ارتباط باشید</b></div>
      </div>

      <div className={"ov" + (open ? " open" : "")} onClick={() => setOpen(false)} />
      <aside className={"drawer" + (open ? " open" : "")} aria-label="سبد خرید">
        <div className="top"><b>سبد خرید</b><button onClick={() => setOpen(false)} aria-label="بستن">بستن</button></div>
        <div className="lines">
          {count === 0 && <p className="empty">سبد خرید خالی است. از فروشگاه محصولی اضافه کنید.</p>}
          {Object.entries(cart).map(([k, q]) => {
            const p = P[k];
            return (
              <div className="ln" key={k}>
                <div className="tile" style={{ width: 44, height: 55, borderRadius: "22px 22px 6px 6px", flex: "none", ...bg(p) }}>
                  <Art t={p.t} m={p.m} a={p.a} style={{ width: "80%" }} />
                </div>
                <div>{p.n}<small>{f(p.p * q)} تومان</small></div>
                <div className="q">
                  <button onClick={() => qty(k, -1)} aria-label="کم کردن">−</button>{f(q)}
                  <button onClick={() => qty(k, 1)} aria-label="زیاد کردن">+</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="tot"><span>جمع کل</span><b>{f(sum)} تومان</b></div>
        <button className="btn solid">ادامه و ثبت سفارش</button>
      </aside>
      <div className={"toast" + (toast ? " show" : "")} role="status">{toast}</div>
    </div>
  );
}

/* ───────── styles (same palette & type as the HTML original) ───────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@200;300;400;600&family=Great+Vibes&display=swap');
.ly{--bg:#fdfaf9;--ink:#171415;--mute:#78706f;--line:#eadfdc;--blush:#f3d9d4;--sand:#ead8bf;--gold:#b08a57;--inv:#171415;--invt:#fdfaf9;--card:#fff;
background:var(--bg);color:var(--ink);font-family:Vazirmatn,Tahoma,sans-serif;font-weight:300;line-height:1.9;overflow-x:hidden;min-height:100vh;
&[data-theme="dark"]{--bg:#141112;--ink:#f6efed;--mute:#a79c9a;--line:#2e2728;--blush:#3a2427;--sand:#3a3022;--gold:#cfa970;--inv:#f6efed;--invt:#141112;--card:#1c1819}
&[data-theme="dark"] .ring{background:linear-gradient(160deg,#241c1d,var(--blush))}
&[data-theme="dark"] .ring path{stroke:#f6efed}
*{box-sizing:border-box;margin:0}
a{color:inherit;text-decoration:none}
button{font:inherit;color:inherit;cursor:pointer;background:none;border:0}
:focus-visible{outline:2px solid var(--gold);outline-offset:3px}
.wrap{max-width:1120px;margin:auto;padding:0 24px}

/* header */
.bar{position:fixed;top:0;left:0;right:0;z-index:7;padding-top:env(safe-area-inset-top,0px);transition:background .3s,box-shadow .3s}
.bar.stuck{background:color-mix(in srgb,var(--bg) 82%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 1px 0 var(--line)}
.prog{position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--gold);transform:scaleX(0);transform-origin:right;display:block}
header{display:flex;align-items:center;justify-content:space-between;padding:18px 0;gap:12px;transition:padding .3s}
.bar.stuck header{padding:8px 0}
.logo{display:flex;align-items:baseline;gap:8px;direction:ltr}
.logo b{font:400 38px/1 'Great Vibes',cursive}
.logo small{font-size:11px;color:var(--mute);letter-spacing:.2em}
nav{display:flex;gap:28px;font-size:14px}
nav a{color:var(--mute);transition:color .2s}nav a:hover{color:var(--ink)}
.acts{display:flex;align-items:center;gap:10px}
.tg{width:34px;height:34px;border-radius:50%;border:1px solid var(--line);font-size:15px;line-height:1;transition:.25s}
.tg:hover{border-color:var(--gold);color:var(--gold);transform:rotate(25deg)}
.cartbtn{display:flex;align-items:center;gap:8px;font-size:14px;border:1px solid var(--ink);border-radius:99px;padding:4px 6px 4px 16px}
.cartbtn span{background:var(--ink);color:var(--bg);border-radius:99px;min-width:24px;height:24px;display:grid;place-items:center;font-size:12px}
.pop{animation:pop .45s cubic-bezier(.3,1.6,.5,1)}

/* hero */
.herobg{position:relative;overflow:hidden;padding-top:84px;background:radial-gradient(60% 80% at 15% 30%,var(--blush),transparent 70%),radial-gradient(50% 70% at 90% 80%,var(--sand),transparent 70%)}
.blob{position:absolute;width:46vmax;height:46vmax;border-radius:50%;background:radial-gradient(closest-side,var(--blush),transparent);opacity:.7;top:-12vmax;left:-10vmax;animation:drift 18s ease-in-out infinite alternate;pointer-events:none}
.herobg .wrap{position:relative}
.hero{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center;padding:48px 0 80px}
.hero h1{font-weight:200;font-size:clamp(46px,7vw,86px);line-height:1.25}
.hero h1 .w{display:inline-block;animation:rise .9s calc(.15s + var(--i)*.14s) cubic-bezier(.2,.7,.2,1) both}
.hero h1 em{font-style:normal;color:var(--gold);background:linear-gradient(100deg,var(--gold) 30%,#f3dcb0 50%,var(--gold) 70%) 0 0/250% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:sheen 5s 1.4s ease-in-out infinite}
.hero p{color:var(--mute);max-width:420px;margin:20px 0 32px}
.btns{display:flex;gap:12px;flex-wrap:wrap}
.btn{padding:11px 28px;border-radius:99px;border:1px solid var(--ink);font-size:14px;transition:.25s;display:inline-block;text-align:center}
.btn.solid{background:var(--ink);color:var(--bg)}
.btn:hover{background:var(--gold);border-color:var(--gold);color:#fff;transform:translateY(-2px);box-shadow:0 10px 20px -10px var(--gold)}
.ring{--rx:0deg;--ry:0deg;aspect-ratio:1;border-radius:50%;border:10px solid rgba(255,255,255,.7);box-shadow:0 30px 60px -30px rgba(120,60,60,.35);display:grid;place-items:center;max-width:400px;justify-self:center;width:100%;background:linear-gradient(160deg,#fff,var(--blush));transform:perspective(800px) rotateX(var(--rx)) rotateY(var(--ry));transition:transform .25s ease-out}
.ring svg{width:80%;height:auto}
.ring path{fill:none;stroke:#171415;stroke-width:1.6;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;animation:draw 2.4s ease forwards}

h2{font-weight:300;font-size:30px;margin-bottom:6px}
.sub{color:var(--mute);font-size:14px;margin-bottom:28px}
section{padding:80px 0 0}

/* services */
.cats{border-top:1px solid var(--line)}
.cats a{display:flex;align-items:center;gap:16px;padding:20px 4px;border-bottom:1px solid var(--line);font-size:22px;transition:padding .25s,color .25s}
.cats a i{width:14px;height:14px;border-radius:50%;flex:none;transition:transform .3s}
.cats a span{margin-inline-start:auto;font-size:13px;color:var(--mute)}
.cats a:hover{padding-inline-start:16px;color:var(--gold)}
.cats a:hover i{transform:scale(1.7)}

/* shop */
.chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px}
.chip{border:1px solid var(--line);border-radius:99px;padding:3px 18px;font-size:14px;color:var(--mute);transition:.25s}
.chip:hover{border-color:var(--ink)}
.chip.on{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:40px 24px}
.item{opacity:0;transform:translateY(28px);transition:opacity .7s var(--d),transform .7s var(--d) cubic-bezier(.2,.7,.2,1)}
.item.in{opacity:1;transform:none}
.tile{aspect-ratio:4/5;border-radius:200px 200px 16px 16px;display:grid;place-items:end center;position:relative;overflow:hidden;transition:transform .35s,box-shadow .35s}
.item:hover .tile{transform:translateY(-4px);box-shadow:0 24px 40px -24px rgba(120,60,60,.45)}
.tile svg{width:78%;height:auto;margin-bottom:6%;overflow:visible}
.bottle{transform-box:fill-box;transform-origin:50% 100%;transition:transform .5s cubic-bezier(.3,1.4,.5,1)}
.item:hover .bottle{transform:translateY(-10px) rotate(-3deg)}
.shadow{transform-box:fill-box;transform-origin:center;transition:transform .5s,opacity .5s}
.item:hover .shadow{transform:scaleX(.8);opacity:.6}
.tag{position:absolute;top:14px;inset-inline-start:14px;background:var(--card);color:var(--ink);font-size:11px;border-radius:99px;padding:0 10px;z-index:1}
.item h3{font-weight:400;font-size:16px;margin-top:14px}
.item .row{display:flex;justify-content:space-between;align-items:center;color:var(--mute);font-size:14px}
.add{border:1px solid var(--ink);color:var(--ink);border-radius:99px;padding:0 14px;font-size:13px;transition:.25s;min-width:84px}
.add:hover,.add.ok{background:var(--ink);color:var(--bg)}
.add.ok{background:var(--gold);border-color:var(--gold);color:#fff}

/* band & footer */
.band{margin-top:96px;background:var(--inv);color:var(--invt);padding:64px 0;background-image:radial-gradient(40% 90% at 100% 0,rgba(176,138,87,.35),transparent)}
.band .wrap{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
.band h2{font-weight:200;font-size:36px}
.band p{opacity:.7;font-size:14px}
.band .btn{border-color:var(--invt);display:block;margin-bottom:10px}
.band .btn.solid{background:var(--invt);color:var(--inv)}
.band .btn:hover{background:var(--gold);border-color:var(--gold);color:#fff}
footer{padding:48px 0;display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;font-size:14px;color:var(--mute)}
footer b{color:var(--ink);font-weight:400;display:block;margin-bottom:6px}
.lh{border-top:1px solid var(--line);text-align:center;padding:24px 0 32px;display:flex;flex-direction:column;gap:2px}
.lh span{font-size:12px;color:var(--mute)}
.lh b{font-weight:400;font-size:15px;color:var(--gold)}
.lh b span{font-size:15px;color:var(--gold);letter-spacing:.04em}

/* cart */
.ov{position:fixed;inset:0;background:rgba(0,0,0,.35);backdrop-filter:blur(2px);opacity:0;pointer-events:none;transition:opacity .3s;z-index:8}
.ov.open{opacity:1;pointer-events:auto}
.drawer{position:fixed;top:0;bottom:0;right:0;width:min(400px,100%);background:var(--bg);transform:translateX(105%);visibility:hidden;transition:transform .45s cubic-bezier(.2,.8,.2,1),visibility .45s;z-index:9;display:flex;flex-direction:column;padding:calc(24px + env(safe-area-inset-top,0px)) 24px calc(24px + env(safe-area-inset-bottom,0px))}
.drawer.open{transform:none;visibility:visible}
.drawer .top{display:flex;justify-content:space-between;margin-bottom:12px}
.lines{flex:1;overflow:auto}
.ln{display:flex;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid var(--line);font-size:14px;animation:rise .4s both}
.ln .tile{display:grid}
.ln svg{width:44px;height:55px}
.ln>div:nth-child(2){flex:1}.ln small{color:var(--mute);display:block}
.q{display:flex;align-items:center;gap:8px}
.q button{width:26px;height:26px;border:1px solid var(--line);border-radius:50%;line-height:1;transition:.2s}
.q button:hover{background:var(--ink);color:var(--bg)}
.empty{color:var(--mute);font-size:14px;padding:24px 0}
.tot{display:flex;justify-content:space-between;padding:16px 0}
.toast{position:fixed;bottom:calc(24px + env(safe-area-inset-bottom,0px));left:50%;transform:translate(-50%,30px);background:var(--ink);color:var(--bg);border-radius:99px;padding:6px 22px;font-size:14px;opacity:0;transition:.35s;z-index:10;pointer-events:none;white-space:nowrap}
.toast.show{opacity:1;transform:translate(-50%,0)}

@media(max-width:800px){
nav{order:3;width:100%;overflow-x:auto;gap:22px;padding-bottom:4px;white-space:nowrap}
header{flex-wrap:wrap}
.herobg{padding-top:128px}
.hero,.band .wrap,footer{grid-template-columns:1fr}
.hero{padding:24px 0 56px}
.grid{grid-template-columns:1fr 1fr;gap:28px 14px}
.ring{max-width:260px;order:-1}
.cats a{font-size:18px}}

@media(prefers-reduced-motion:reduce){
*,*::before,*::after{animation:none!important;transition:none!important}
.ring path{stroke-dashoffset:0}
.item{opacity:1;transform:none}}
}
`;

/* keyframes must live outside the nested .ly{} block */
const KF = `
@keyframes pop{0%{transform:scale(.4)}100%{transform:scale(1)}}
@keyframes drift{to{transform:translate(18vmax,10vmax) scale(1.15)}}
@keyframes rise{from{opacity:0;transform:translateY(.5em);filter:blur(6px)}}
@keyframes sheen{0%{background-position:100% 0}60%,100%{background-position:-100% 0}}
@keyframes draw{to{stroke-dashoffset:0}}
`;
