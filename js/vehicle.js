const container=document.getElementById('vehicle-container');
const car=JSON.parse(localStorage.getItem('selectedCar')||'null');

if(!car){container.textContent='Nincs kiválasztott autó.';}else{renderPage();}

function renderPage(){
  container.innerHTML=`
  <div class="row g-4">
    <div class="col-lg-7">
      <div id="carCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner" id="carousel-inner"></div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
      <div class="d-flex gap-2 mt-3" id="color-swatches"></div>
    </div>

    <div class="col-lg-5">
      <h2>${car.make} ${car.model} ${car.submodel}</h2>
      <p>${car.description}</p>
      <ul class="list-group mb-3">
        ${li('Gyártási év',  car.year)}
        ${li('Váltó',         car.transmission)}
        ${li('Teljesítmény', `${car.horsepower} LE`)}
        ${li('Végsebesség',  `${car.topSpeed} km/h`)}
        ${li('Ár',           `${car.price.toLocaleString()} USD`)}
      </ul>
      <a href="index.html" class="btn btn-secondary">Vissza</a>
    </div>
  </div>`;
  initColors(); initImages('tint-silver');
}

/* helpers + kép/szín logika változatlan */


/* ---------- helpers ---------- */
function li(label,val){return `<li class="list-group-item d-flex justify-content-between"><span>${label}</span><span class="fw-semibold">${val ?? '—'}</span></li>`;}

function baseImg(angle=23){
  const fam=car.model.split(' ')[0]||'911';
  return `https://cdn.imagin.studio/getImage?customer=demo&make=${encodeURIComponent(car.make)}&modelFamily=${encodeURIComponent(fam)}&angle=${angle}&paintId=c0c0c0`;
}

function initImages(tint){
  const inner=document.getElementById('carousel-inner');
  inner.innerHTML='';
  [23,33,13,0].forEach((a,i)=>{
    inner.innerHTML += `<div class="carousel-item${i?'':' active'}">
      <img src="${baseImg(a)}" class="d-block w-100 tinted-image ${tint}" alt="${car.model}">
    </div>`;
  });
}

function initColors(){
  const palette={
    'tint-red':'#ff0000','tint-yellow':'#ffee00','tint-blue':'#0033ff',
    'tint-black':'#000','tint-white':'#fff','tint-silver':'#c0c0c0'
  };
  const wrap=document.getElementById('color-swatches');
  wrap.innerHTML='';
  Object.entries(palette).forEach(([cls,hex])=>{
    const dot=document.createElement('div');
    dot.className='color-swatch'+(cls==='tint-silver'?' selected':'');
    dot.style.backgroundColor=hex;
    dot.onclick=()=>{
      document.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('selected'));
      dot.classList.add('selected');
      document.querySelectorAll('.tinted-image').forEach(img=>{
        img.className=img.className.replace(/tint-[a-z]+/,'').trim();
        img.classList.add(cls);
      });
    };
    wrap.appendChild(dot);
  });
}
