let count = 0;
const step = 1;
const output = document.querySelector('#count');
document.querySelector('#increase').addEventListener('click', () => {
  count += step;
  output.textContent = String(count);
});
