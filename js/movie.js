import { urls } from "./http";

const list = document.getElementById("list");
const input = document.getElementById("input");
const textarea = document.getElementById("textarea");
const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const formData = {
      title: input.value,
      body: textarea.value,
      userId: 1,
    };
    // const formData = new FormData();
    // formData.append('title', input.value);
    // formData.append('body', textarea.value);
    // formData.append('userId', 1);

    const res = await fetch(urls.posts, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(`Error code ${response.status}`);
      }
    });

    input.value = "";
    textarea.value = "";

    UIkit.notification({
      message: res,
      status: "success",
    });
  } catch (error) {
    UIkit.notification({ message: error, status: "danger" });
  }
});

const renderList = (data) => {
  data.map(({ id, title, body: text }) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<h2>${title}</h2><span>${text}</span>`;
    listItem.innerHTML += `<span> - ${id}</span>`;
    list.appendChild(listItem);
  });
};

const getData = async () => {
  try {
    const res = await fetch(urls.posts);
    const parsedRes = await res.json();
    UIkit.notification({
      message: "Data loaded successfuly",
      status: "success",
    });
    return parsedRes;
  } catch (error) {
    UIkit.notification({ message: error, status: "danger" });
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const DATA = await getData();
  renderList(DATA || []);
});






























// import { urls } from "./http";

// const input = document.querySelector('.form-input');
// let params = {};

// function createCard(data) {
//     //console.log(`data: ${data.Title}`);
//     const element = document.createElement('div');
//     data.forEach((item,i)=>{
        
//         element.innerHTML += `
//             <p> ${i+1} - <b>Movie:</b> ${item.Title}  <b>Year:</b>${item.Year} </p>
//         `;
//         document.querySelector('.block-result').append(element);
//     });

// }

// const getMovies = async (params) => {
//     try {
//       params.title = params.title || '';
//       params.type = params.type || '';
//       params.page = params.page || 1;
//       const res = await fetch(`${urls.search}&s=${params.title}&type=${params.type}&page=${params.page}`);
//       const parsedRes = await res.json();
      
//       return parsedRes;
//     } catch (error) {
//       UiKit.notify({ message: error, status: "danger" });
//     }
//   };


// document.addEventListener("DOMContentLoaded", async () => {

//     const form = document.querySelector(".form");
//     if (form && form.length) {
//       form.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         try {
//           params = {
//             title: document.querySelector("[name='title']").value,
//             type: document.querySelector("[name='type']:checked").value,
//             page: 1,
//           };
         
//           const data = await getMovies(params);
//           console.log(data);
          
//           return;
//         } catch (error) {
//           console.log(error);
//           UIkit.notify({ message: error, status: "danger" });
//         }
//       });
//     }


// });



   
