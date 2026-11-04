let count = 0;
const step = 1;
const output = document.querySelector('#count');
document.querySelector('#increase').addEventListener('click', () => {
  count += step;
  output.textContent = String(count);
});

document.addEventListener('keydown', (event) => {
  if (!event.repeat && (event.key === 'i' || event.key === 'I')) {
    document.querySelector('#increase').click();
  }
});
