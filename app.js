const URL = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";
const albumsList = document.querySelector(".albums__list");
const singleAlbum = document.querySelector(".single-album");
const sortSelected = document.querySelector(".custom-select");



const getData = url => {
    return (fetch(url)
            .then(response => response.json())

    )

};


const dataToDisplay = getData(URL);

const displayAlbums = data => {

    data.forEach( item => {
        const clonedSingleAlbum = singleAlbum.cloneNode(true);
        clonedSingleAlbum.classList.remove('single-album--hide');

        const wrapper = clonedSingleAlbum.children[0].children;
        const coverAlbum = wrapper[0].firstElementChild;
        const category = wrapper[1].firstElementChild;
        const titleAlbum = wrapper[1].children[1];
        const artistAlbum = wrapper[1].lastElementChild;

        const moreInfo = clonedSingleAlbum.children[1].children;

        const artistInInfo = moreInfo[0];
        const releaseInfo = moreInfo[1];
        const rightInfo = moreInfo[2];
        const priceInfo = moreInfo[3];

        coverAlbum.src = item['im:image'][2].label;
        category.innerText = item.category.attributes.term;
        titleAlbum.innerText = item['im:name'].label;
        artistAlbum.innerText = item['im:artist'].label;

        artistInInfo.innerText = item['im:artist'].label;
        releaseInfo.innerText = `Release: ${item["im:releaseDate"].label.slice(0, 10)}`;
        rightInfo.innerText = `Rights: ${item.rights.label}`;
        priceInfo.innerText = `Price: ${item["im:price"].label}`;

        albumsList.appendChild(clonedSingleAlbum)


    })

    const arrowMoreInfo = document.querySelectorAll(".material-icons");
    arrowMoreInfo.forEach( item => {
        item.addEventListener("mouseenter", event => {
            let clickedArrow = event.target;
            let moreInfo = clickedArrow.parentElement.parentElement.nextElementSibling;
            moreInfo.style.right = "170px";

        })

        item.addEventListener("mouseleave", event => {
            let clickedArrow = event.target;
            let moreInfo = clickedArrow.parentElement.parentElement.nextElementSibling;
            moreInfo.style.right = "0px"

        })
    })
};

dataToDisplay.then(data => displayAlbums(data.feed.entry));


const sort = (typeSort, data) => {
        let sorted=null;

    if (typeSort === "1") {
        while (albumsList.hasChildNodes()) {
            albumsList.removeChild(albumsList.lastChild);
        }
        let sortedByCategory = data.feed.entry.sort((a,b) => (a.category.attributes.label > b.category.attributes.label) ? 1 : -1);
        sorted = sortedByCategory;

    } else if (typeSort === "2") {
        while (albumsList.hasChildNodes()) {
            albumsList.removeChild(albumsList.lastChild);
        }
        let sortedByArtist = data.feed.entry.sort((a,b) => (a['im:artist'].label > b['im:artist'].label) ? 1 : -1);
         sorted = sortedByArtist;
    }

    return sorted

}


sortSelected.addEventListener("change", evt => {
    let selected = evt.target.value;
    dataToDisplay.then(data => {
        let dataToDisplay = sort(selected,data);
        displayAlbums(dataToDisplay)

    })
})


