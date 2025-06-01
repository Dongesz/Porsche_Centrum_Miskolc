import { cars } from './data.js';

const popular = cars.slice(0,3);        // három „népszerű” modell
const list    = document.getElementById('car-list');
render(popular);

function render(arr){
  list.innerHTML='';
  arr.forEach(c=>list.appendChild(card(c)));
}

function card(car){
  const col=document.createElement('div');
  col.className='col-12 col-md-4';
  col.innerHTML=`
    <div class="card h-100 car-card">
      <img src="${img(car)}" class="card-img-top" alt="${car.model}"
           onerror="this.src='https://source.unsplash.com/featured/?porsche'">
      <div class="card-body">
        <h5 class="card-title">${car.make} ${car.model} ${car.submodel}</h5>
        <p class="small text-muted mb-2">${car.year} · ${car.transmission}</p>
        <p class="fw-semibold mb-2">Ár: ${car.price.toLocaleString()} USD</p>
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
