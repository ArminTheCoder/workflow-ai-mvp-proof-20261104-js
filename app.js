let count = 0;
const step = 1; // T1 decrement contract; T2 reset contract
const output = document.querySelector('#count');
document.querySelector('#increase').addEventListener('click', () => {
  count += step;
  output.textContent = String(count);
});
const decrease = document.createElement('button');
decrease.id = 'decrease';
decrease.textContent = 'Decrease';
decrease.addEventListener('click', () => {
  count -= step;
  output.textContent = String(count);
});
document.querySelector('main').append(decrease);
const reset = document.createElement('button');
reset.id = 'reset';
reset.textContent = 'Reset';
reset.addEventListener('click', () => {
  count = 0;
  output.textContent = String(count);
});
document.querySelector('main').append(reset);
