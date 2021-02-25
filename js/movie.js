import "uikit/dist/css/uikit.min.css";
import UiKit from "uikit";
import { filmsUrls } from "./http";

let params = {};

const getMovies = async (params) => {

  try {
    params.title = params.title || '';
    params.category = params.category || '';
    params.page = params.page || 1;
    const res = await fetch(`${filmsUrls.search}&s=${params.title}&type="${params.category}"`);
    const parsedRes = await res.json();
    UiKit.notification({
      message: "Data loaded successfuly",
      status: "success",
    });
    return parsedRes;
  } 
  
  catch (error) {
    UiKit.notification({ message: error, status: "danger" });
  }
};


const createCards = (data=[]) => {
  const movies = data.Search;

    const ul = document.querySelector('.cards__list');

    if(data.Response === "True") {
      ul.innerHTML =  movies.map(({ Title: title, Poster: poster, Type:type, Year: year, imdbID: id }) => { 
        return `
        <li class="cards__item-list">
          <img class="cards__item-image" src=${poster}>
            <h3 class="cards__item-title">${title}</h3>
            <p class="cards__item-type">${type}, ${year}</p>
            <div class="cards__buttons">
              <button class="cards__item-deteils">Deteils</button>
              <button class="cards__item-add">add</button>
            </div>
        </li>
      `;
  
      }).join("");
    }

    else {
      console.log(data.Error);
      ul.innerHTML = `
      <p>${data.Error}</p>
      `;
    }
};

const clearBlockCards = () => {
  document.querySelector('.cards__list').innerHTML = ''; 
}
   
document.addEventListener("DOMContentLoaded", async () => {

  const form = document.getElementById('form');

  if (form && form.length) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        params = {
          title: document.getElementById('movie-name').value,
          category: document.querySelector('[name="category"]:checked').value,
          page: 1,
        };

        clearBlockCards();
        console.log(params.category);
        const DATA = await getMovies(params);
        console.log(DATA);
        createCards(DATA || []); 
        return;
      }  catch (error) {
        console.log(error);
        UIkit.notify({ message: error, status: "danger" });
      }

    });
  };

  
});

