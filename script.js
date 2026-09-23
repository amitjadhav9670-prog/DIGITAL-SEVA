const presets={
 aadhaar:{name:'Aadhaar Card',icon:'🪪',w:85.6,h:53.98,paper:'A4',note:'Card-size preset: 85.6 × 53.98 mm. Verify the source document/layout before final printing.'},
 pan:{name:'PAN Card',icon:'💳',w:85.6,h:53.98,paper:'A4',note:'Standard ID-card-size preset: 85.6 × 53.98 mm.'},
 ayushman:{name:'Ayushman Card',icon:'🏥',w:85.6,h:53.98,paper:'A4',note:'Card-size preset. Some downloaded PDFs may be designed for A4; preview before printing.'},
 voter:{name:'Voter ID',icon:'🗳️',w:85.6,h:53.98,paper:'A4',note:'Card-size preset. Check the current source document before final print.'},
 ration:{name:'Ration Card',icon:'🧾',w:190,h:270,paper:'A4',note:'A4 document preset.'},
 eshram:{name:'e-Shram Card',icon:'👷',w:85.6,h:53.98,paper:'A4',note:'Card-size preset.'},
 abha:{name:'ABHA Card',icon:'🩺',w:85.6,h:53.98,paper:'A4',note:'Card-size preset.'},
 dl:{name:'Driving Licence',icon:'🚗',w:85.6,h:53.98,paper:'A4',note:'Card-size preset.'},
 passport:{name:'Passport Photo',icon:'📸',w:35,h:45,paper:'A4',note:'35 × 45 mm passport-photo preset.'},
 stamp:{name:'Stamp Photo',icon:'📷',w:25,h:35,paper:'A4',note:'25 × 35 mm preset.'},
 visa:{name:'Visa Photo',icon:'🛂',w:50,h:50,paper:'A4',note:'50 × 50 mm example preset; requirements vary by country.'},
 signature:{name:'Signature',icon:'✍️',w:50,h:20,paper:'A4',note:'Example 50 × 20 mm preset; adjust if the receiving authority specifies another size.'},
 a4:{name:'A4 Document',icon:'📄',w:190,h:277,paper:'A4',note:'A4 printable area preset with margins.'},
 other:{name:'Other ID Card',icon:'🪪',w:85.6,h:53.98,paper:'A4',note:'Generic ID-card preset; verify the actual document dimensions.'}
};
const services=[['aadhaar','Aadhaar Card'],['pan','PAN Card'],['ayushman','Ayushman Card'],['voter','Voter ID'],['ration','Ration Card'],['eshram','e-Shram Card'],['abha','ABHA Card'],['dl','Driving Licence'],['passport','Passport Photo'],['stamp','Stamp Photo'],['visa','Visa Photo'],['signature','Signature'],['a4','A4 Document'],['other','Other ID Card']];
const grid=document.getElementById('serviceGrid'), select=document.getElementById('preset');
services.forEach(([id,label])=>{let s=presets[id];let d=document.createElement('div');d.className='service';d.dataset.search=label.toLowerCase();d.innerHTML=`<div class="icon">${s.icon}</div><h3>${label}<br>Print</h3>`;d.onclick=()=>{select.value=id;updatePreset();document.getElementById('tools').scrollIntoView({behavior:'smooth'})};grid.appendChild(d);let o=document.createElement('option');o.value=id;o.textContent=label;select.appendChild(o)});
function updatePreset(){const id=select.value,p=presets[id];document.getElementById('presetInfo').innerHTML=`<b>${p.name}</b><br>Print size: ${p.w} × ${p.h} mm<br>Paper: ${p.paper}<br>${p.note}`;render();}
function loadImage(e){const f=e.target.files[0];if(!f)return;if(!f.type.startsWith('image/')){alert('अभी JPG/PNG image upload करें।');e.target.value='';return}const r=new FileReader();r.onload=()=>{window.uploadedImage=r.result;render()};r.readAsDataURL(f)}
function changeCopies(n){let el=document.getElementById('copies');let v=Math.max(1,Math.min(50,(parseInt(el.value)||1)+n));el.value=v;render()}
document.getElementById('copies').addEventListener('input',render);
function render(){const a4=document.getElementById('a4');a4.innerHTML='';const p=presets[select.value];document.getElementById('paperLabel').textContent=`${p.paper} • Portrait • ${p.w}×${p.h} mm`;let copies=Math.max(1,parseInt(document.getElementById('copies').value)||1);for(let i=0;i<copies;i++){let img=document.createElement('img');img.className='print-item';img.alt=p.name;img.style.width=`${(p.w/210)*100}%`;img.style.height=`${(p.h/297)*100}%`;if(window.uploadedImage)img.src=window.uploadedImage;else{img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%" height="100%" fill="#edf3fa"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="22" fill="#5b6b84">Upload ${p.name}</text></svg>`)}a4.appendChild(img)}}
function resetTool(){window.uploadedImage=null;document.getElementById('file').value='';document.getElementById('copies').value=1;select.value='aadhaar';updatePreset()}
function filterServices(){const q=document.getElementById('search').value.toLowerCase().trim();document.querySelectorAll('.service').forEach(x=>x.style.display=!q||x.dataset.search.includes(q)?'block':'none');document.getElementById('services').scrollIntoView({behavior:'smooth'})}
updatePreset();
