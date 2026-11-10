const accessKey = "anyG_7Do68pwC6ddt2YUEmVlhH1i3EnodaBwqba1pNM";

function displayPhotos(data) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    data.results.forEach(photo => {
        const img = document.createElement("img");
        img.src = photo.urls.small;
        img.alt = photo.alt_description || "Unsplash photo";
        gallery.appendChild(img);
    });
}

function searchUsingXHR() {
    const query = document.getElementById("inputBox").value;
    const url = "https://api.unsplash.com/search/photos?query=" +
        encodeURIComponent(query) + "&per_page=8";

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                displayPhotos(JSON.parse(xhr.responseText));
            } else {
                console.error("XHR Error:", xhr.status);
            }
        }
    };

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Authorization", "Client-ID " + accessKey);
    xhr.send();
}

function searchUsingFetch() {
    const query = document.getElementById("inputBox").value;
    const url = "https://api.unsplash.com/search/photos?query=" +
        encodeURIComponent(query) + "&per_page=8";

    fetch(url, {
        headers: {
            Authorization: "Client-ID " + accessKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }
        return response.json();
    })
    .then(data => displayPhotos(data))
    .catch(error => console.error(error));
}

async function searchUsingFetchAwaitAsync() {
    const query = document.getElementById("inputBox").value;
    const url = "https://api.unsplash.com/search/photos?query=" +
        encodeURIComponent(query) + "&per_page=8";

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: "Client-ID " + accessKey
            }
        });

        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }

        const data = await response.json();
        displayPhotos(data);

    } catch (error) {
        console.error(error);
    }
}