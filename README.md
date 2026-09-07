from pathlib import Path
import math, zipfile

root=Path("/mnt/data/flash_data_plug_50gb")
root.mkdir(exist_ok=True)
prices=[]
price=4.50
for gb in range(1,51):
    if gb==1:
        price=4.50
    else:
        price*=1.16
    prices.append((gb, round(price,2)))

cards="\n".join(
f'''<div class="card"><h3>{gb}GB</h3><div class="price">GH₵{p:.2f}</div><a class="buy" href="https://www.cheapdata.shop/shop/data-bundle-1780359837144">BUY NOW</a></div>'''
for gb,p in prices
)

html=f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>FLASH DATA PLUG | MTN Data</title>
<style>
*{{box-sizing:border-box}}body{{margin:0;font-family:Arial,sans-serif;background:#f4f7fb;color:#172033}}
header{{background:#111827;color:#fff;padding:18px 6%;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:5}}
.logo{{font-size:22px;font-weight:900}}.logo span{{color:#facc15}}nav a{{color:white;text-decoration:none;margin-left:18px;font-weight:bold}}
.hero{{padding:65px 6%;text-align:center;background:linear-gradient(135deg,#2563eb,#111827);color:#fff}}
.hero h1{{font-size:clamp(2.3rem,7vw,4rem);margin:0 0 10px}}.hero p{{font-size:1.1rem}}
.btn{{display:inline-block;padding:13px 22px;border-radius:10px;text-decoration:none;font-weight:800;margin:8px}}
.primary{{background:#facc15;color:#111827}}.whatsapp{{background:#16a34a;color:white}}
section{{max-width:1150px;margin:auto;padding:48px 5%}}h2{{text-align:center;font-size:2rem;margin-bottom:25px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px}}
.card{{background:white;border-radius:15px;padding:20px;text-align:center;box-shadow:0 5px 18px #0001}}.card h3{{margin:0;color:#2563eb}}
.price{{font-size:1.45rem;font-weight:900;margin:10px 0 15px}}.buy{{display:block;background:#2563eb;color:#fff;padding:10px;border-radius:8px;text-decoration:none;font-weight:bold}}
.note{{background:#fff7d6;padding:15px;border-radius:12px;text-align:center;margin-bottom:25px}}
.contact{{text-align:center}}footer{{background:#111827;color:#cbd5e1;text-align:center;padding:28px}}
@media(max-width:650px){{nav{{display:none}}}}
</style></head><body>
<header><div class="logo">FLASH <span>DATA PLUG</span></div>
<nav><a href="#home">Home</a><a href="#bundles">Bundles</a><a href="#contact">Contact</a></nav></header>
<div class="hero" id="home"><h1>FLASH DATA PLUG</h1><p>Affordable MTN data bundles from 1GB up to 50GB.</p>
<a class="btn primary" href="#bundles">VIEW BUNDLES</a>
<a class="btn whatsapp" href="https://wa.me/233531413414?text=Hello%20FLASH%20DATA%20PLUG%2C%20I%20want%20to%20buy%20data.">WHATSAPP US</a></div>
<section id="bundles"><h2>MTN Data Bundles</h2>
<div class="note">Pricing starts at GH₵4.50 for 1GB. Each next amount is calculated with a 16% increase and rounded to 2 decimal places.</div>
<div class="grid">{cards}</div></section>
<section id="contact" class="contact"><h2>Contact Us</h2><div class="card">
<p><strong>WhatsApp:</strong> 053 141 3414</p><p><strong>Call:</strong> 050 566 4384</p>
<a class="btn whatsapp" href="https://wa.me/233531413414">CHAT ON WHATSAPP</a></div></section>
<footer><strong>FLASH DATA PLUG</strong><p>Affordable data bundles made simple.</p><small>© 2026 FLASH DATA PLUG</small></footer>
</body></html>'''
(root/"index.html").write_text(html,encoding="utf-8")
zip_path=Path("/mnt/data/FLASH_DATA_PLUG_1GB_to_50GB.zip")
with zipfile.ZipFile(zip_path,"w",zipfile.ZIP_DEFLATED) as z:z.write(root/"index.html","index.html")
print("Created",zip_path)
print("50GB price:", prices[-1][1])
