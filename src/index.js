import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { createOptionsMarkup, createInfoMarkup } from './js/markup';
import { refs } from './js/refs';

const renderOptions = markup => {
  refs.select.innerHTML = markup;
};

const onSelectChange = ev => {
  const id = ev.target.value;
  refs.loader.classList.remove('is-hidden');
  refs.error.classList.add('is-hidden');

  try {
    fetchCatByBreed(id)
      .then(({ data }) => {
        if (data) {
          refs.catInfo.classList.remove('is-hidden');
          refs.loader.classList.add('is-hidden');
        }
        const { breeds, url } = data[0];
        const { name, description, temperament } = breeds[0];
        const markup = createInfoMarkup({
          name,
          description,
          temperament,
          url,
        });
        refs.catInfo.innerHTML = markup;
      })
      .catch(error => {
        refs.loader.classList.add('is-hidden');
        refs.error.classList.remove('is-hidden');
      });
  } catch (error) {
    console.log(error.message);
    refs.loader.classList.add('is-hidden');
  }
};

refs.select.classList.add('is-hidden');
refs.catInfo.classList.add('is-hidden');
refs.error.classList.add('is-hidden');

try {
  fetchBreeds()
    .then(({ data }) => {
      if (data.length) {
        refs.select.classList.remove('is-hidden');
      }
      return data.map(({ id, name }) => ({ id, name }));
    })
    .then(breeds => renderOptions(createOptionsMarkup(breeds)))
    .catch(error => {
      refs.error.classList.remove('is-hidden');
    })
    .finally(refs.loader.classList.add('is-hidden'));
} catch (error) {
  console.log(error.message);
  refs.loader.classList.add('is-hidden');
}

refs.select.addEventListener('change', onSelectChange);
