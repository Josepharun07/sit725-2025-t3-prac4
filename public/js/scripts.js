const cardList = [
    {
        title: "Inception",
        image: "images/inception.jpg",
        link: "About Inception",
        description: "A mind-bending thriller by Christopher Nolan."
    },
    {
        title: "The Matrix",
        image: "images/matrix.jpg",
        link: "About The Matrix",
        description: "A sci-fi classic that questions reality."
    },
    {
        title: "Interstellar",
        image: "images/interstellar.jpg",
        link: "About Interstellar",
        description: "A journey through space and time by Christopher Nolan."
    },
    {
        title: "Avatar",
        image: "images/avatar.jpg",
        link: "About Avatar",
        description: "A visually stunning epic by James Cameron."
    },
    {
        title: "Titanic",
        image: "images/titanic.jpg",
        link: "About Titanic",
        description: "A tragic love story aboard the ill-fated Titanic."
    },
    {
        title: "Jurassic Park",
        image: "images/jurassic_park.jpg",
        link: "About Jurassic Park",
        description: "A thrilling adventure with dinosaurs by Steven Spielberg."
    }
]

const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}

const submitForm = () => {
    let formData = {};
    formData.movie_name = $('#movie_name').val();
    formData.movie_title = $('#movie_title').val();
    formData.release_year = $('#release_year').val();
    console.log("Form Data Submitted: ", formData);
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
            '</div><div class="card-content">'+
            '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
            '<div class="card-reveal">'+
            '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
            '<p class="card-text">'+item.description+'</p>'+
            '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        submitForm();
    })
    addCards(cardList);
    $('.modal').modal();
});
