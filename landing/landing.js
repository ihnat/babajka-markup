const input = document.querySelector('#email');

const handleChange = ({ target: { value } }) => {
  console.log('input change', value);
};

const handleSubmit = ({ key, target: { value } }) => {
  if (key === 'Enter') {
    console.log('submit', value);
  }
};

input.addEventListener('change', handleChange);
input.addEventListener('keydown', handleSubmit);
