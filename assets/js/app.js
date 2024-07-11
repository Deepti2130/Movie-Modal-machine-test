const cl = console.log;

const moviecontainer = document.getElementById("moviecontainer");
const backdrop = document.getElementById("backdrop");
const movieModel =document.getElementById("movieModel");
const addMoviebtn = document.getElementById("addMoviebtn");
const movieclose = [...document.querySelectorAll(".movieclose")];
const moviesubmitbtn = document.getElementById("moviesubmitbtn");
const moviesupdatebtn = document.getElementById("moviesupdatebtn");
const movieform = document.getElementById("movieform");
const titleControls = document.getElementById("title");
const movieUrlControls = document.getElementById("movieUrl");
const contentControls = document.getElementById("content");
const ratingControls = document.getElementById("rating");



const generateUuid = () => {
    return String("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(
      /[xy]/g,
      (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;
  
        return value.toString(16);
      }
    );
  };


const createMovieCards = (arr) => {
    let result = " ";

    arr.forEach(movie => {
      result += `<div class="col-md-4">
                        <div class="card MovieCard" id="${movie.movieId}">
                            <figure class="mb-0">
                                <img src="${movie.movieUrl}"alt="">
                                <figcaption>
                                   <div class="figinfo">
                                    <h3>${movie.title}</h3>
                                    <strong>Rating:${movie.rating}/5</strong>
                                    <p class="content">
                                    ${movie.content}
                                    </p>
                                    </div>
                                    <div>
                                        <button class="btn btn-sm btn-light" onclick="onMovieEdit(this)">Edit</button>
                                        <button class="btn btn-sm btn-danger" onclick="onMovieRemove(this)">Remove</button>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    </div>`
    
                    moviecontainer.innerHTML = result;
    
    });
}

let movieArr = JSON.parse(localStorage.getItem("movieArr")) || [];

if(movieArr.length > 0){
    createMovieCards(movieArr); 
}



const toggleModelBackdrop = () =>{
    backdrop.classList.toggle(`visible`);
    movieModel.classList.toggle(`visible`);
    moviesubmitbtn.classList.remove(`d-none`);
    moviesupdatebtn.classList.add(`d-none`)

    movieform.reset();
}

const onMovieRemove = (ele) => {

    Swal.fire({
        title: "Do you want to save the changes?",
        showCancelButton: true,
        confirmButtonText: "Remove",
        confirmButtonColor:"#e50914",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            let removeId = ele.closest('.MovieCard').id;
            cl(removeId);

    //remove from array

    let getIndex = movieArr.findIndex(movie => movie.movieId === removeId);

    movieArr.splice(getIndex,1);

    localStorage.setItem("movieArr", JSON.stringify(movieArr));

    //remove from UI
    ele.closest('.MovieCard').parentElement.remove()

    swal.fire({
        title:`Movie removed successfully!!!`,
        timer:2500,
        icon:"success"
    })

}
      })
    }

const onMovieEdit = (ele) => {
    toggleModelBackdrop();
    let editId = ele.closest('.MovieCard').id;
    cl(editId);

    localStorage.setItem("editmovieId", editId)


    let editMovieObj = movieArr.find(movie => movie.movieId === editId);

        titleControls.value = editMovieObj.title;
        movieUrlControls.value =editMovieObj.movieUrl;
        contentControls.value = editMovieObj.content;
        ratingControls.value = editMovieObj.rating

        moviesupdatebtn.classList.remove(`d-none`);
        moviesubmitbtn.classList.add(`d-none`);
    };


const onmovieAdd = (eve) => {
    eve.preventDefault();

    let movieObj = {

        title:titleControls.value,
        movieUrl:movieUrlControls.value,
        content:contentControls.value,
        rating:ratingControls.value,
        movieId:generateUuid()
    };
    cl(movieObj);
    movieform.reset();
    movieArr.unshift(movieObj);
    localStorage.setItem("movieArr", JSON.stringify(movieArr));
    // createMovieCards(movieArr);
    toggleModelBackdrop();

    swal.fire({
        title:`New movie ${movieObj.title} is added successfully!!!`,
        timer:2500,
        icon:"success"
    })


//we will create a new card for new movie obj

let div = document.createElement("div");

div.className ="col-md-4";

div.innerHTML = `<div class="card MovieCard" id="${movieObj.movieId}">
                            <figure class="mb-0">
                                <img src="${movieObj.movieUrl}"alt="">
                                <figcaption>
                                    <h3>${movieObj.title}</h3>
                                    <strong>Rating:${movieObj.rating}/5</strong>
                                    <p class="content">
                                    ${movieObj.content}
                                    </p>
                                    <div>
                                        <button class="btn btn-sm btn-light" onclick="onMovieEdit(this)">Edit</button>
                                        <button class="btn btn-sm btn-danger" onclick="onMovieRemove(this)">Remove
                                        </button>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>`

                        moviecontainer.prepend(div)

                        

 }

 const onupdateMovie = () => {
//UdateId
    let updatemovieId = localStorage.getItem("editmovieId");

    //updateobj

    let updateMovieObj = {
        title:titleControls.value,
        movieUrl:movieUrlControls.value,
        content:contentControls.value,
        rating:ratingControls.value,
        movieId:generateUuid()
    }
    cl(updateMovieObj);

    //GetIndex of arr which object is edited

    let getIndex = movieArr.findIndex(movie => movie.movieId === updatemovieId);

    movieArr[getIndex] = updateMovieObj;

    localStorage.setItem("movieArr", JSON.stringify(movieArr));

    let getMovieCard = document.getElementById(updatemovieId);

    getMovieCard.innerHTML = `<figure class="mb-0">
                                <img src="${updateMovieObj.movieUrl}"alt="">
                                <figcaption>
                                    <h3>${updateMovieObj.title}</h3>
                                    <strong>Rating:${updateMovieObj.rating}/5</strong>
                                    <p class="content">
                                    ${updateMovieObj.content}
                                    </p>
                                    <div>
                                        <button class="btn btn-sm btn-light" onclick="onMovieEdit(this)">Edit</button>
                                        <button class="btn btn-sm btn-danger" onclick="onMovieRemove(this)">Remove
                                        </button>
                                    </div>
                                </figcaption>
                            </figure>`

                            toggleModelBackdrop();

 }


movieclose.forEach((btn)=>{
    btn.addEventListener("click",toggleModelBackdrop);
});



addMoviebtn.addEventListener("click", toggleModelBackdrop);
movieform.addEventListener("submit", onmovieAdd);
moviesupdatebtn.addEventListener("click", onupdateMovie);