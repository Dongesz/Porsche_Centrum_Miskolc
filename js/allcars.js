import { cars } from './data.js';

const list   = document.getElementById('all-car-list');
const search = document.getElementById('search-input');

render(cars);

search.addEventListener('input',e=>{
  const q=e.target.value.toLowerCase().trim();
  render(cars.filter(c=>
    `${c.model} ${c.submodel}`.toLowerCase().includes(q) ||
    String(c.year).includes(q)
  ));
});

function render(arr){
  list.innerHTML='';
  if(!arr.length){
    list.innerHTML='<p class="text-center">Nincs találat.</p>'; return;
  }
  arr.forEach(c=>list.appendChild(card(c)));
}

function card(car){
  const col=document.createElement('div');
  col.className='col-12 col-md-3';
  col.innerHTML=`
    <div class="card h-100 car-card">
      <img src="${img(car)}" class="card-img-top" alt="${car.model}"
           onerror="this.src='https://source.unsplash.com/featured/?porsche'">
      <div class="card-body">
        <h6 class="card-title">${car.model} ${car.submodel}</h6>
        <p class="small text-muted mb-1">${car.year} · ${car.transmission}</p>
        <p class="fw-semibold mb-1">${car.price.toLocaleString()} USD</p>
        <button class="btn btn-outline-dark w-100">Részletek</button>
      </div>
    </div>`;
  col.querySelector('button').onclick=()=>{
    localStorage.setItem('selectedCar',JSON.stringify(car));
    location.href='vehicle.html';
  };
  return col;
}

function img(car,a=23){
  const fam=car.model.split(' ')[0];
  return `https://cdn.imagin.studio/getImage?customer=demo&make=${car.make}&modelFamily=${fam}&angle=${a}&paintId=c0c0c0`;
}
