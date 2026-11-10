let likes = 0;
let dislikes = 0;
let comments = [];
let userVote = "";
let hasCommented = false;

// Save a cookie for 7 days
function setCookie(name, value) {
    document.cookie = name + "=" +
        encodeURIComponent(value) +
        "; max-age=604800; path=/; SameSite=Lax";
}

// Read a cookie
function getCookie(name) {
    const cookies = document.cookie.split("; ");

    for (let cookie of cookies) {
        const [key, ...parts] = cookie.split("=");

        if (key === name) {
            return decodeURIComponent(parts.join("="));
        }
    }

    return null;
}

// Delete a cookie
function deleteCookie(name) {
    document.cookie = name +
        "=; max-age=0; path=/; SameSite=Lax";
}

// Load saved data
function loadData() {
    likes = Number(getCookie("likes") || 0);
    dislikes = Number(getCookie("dislikes") || 0);
    userVote = getCookie("userVote") || "";
    hasCommented = getCookie("hasCommented") === "true";

    try {
        comments = JSON.parse(getCookie("comments") || "[]");
        if (!Array.isArray(comments)) comments = [];
    } catch {
        comments = [];
    }

    updateUI();
}

// Update the page
function updateUI() {
    document.getElementById("likes").textContent = likes;
    document.getElementById("dislikes").textContent = dislikes;

    document.getElementById("like-btn").disabled = userVote !== "";
    document.getElementById("dislike-btn").disabled = userVote !== "";

    document.getElementById("submit-btn").disabled = hasCommented;

    const commentsList = document.getElementById("comments-list");
    commentsList.innerHTML = "";

    comments.forEach(comment => {
        const p = document.createElement("p");
        p.className = "comment";
        p.textContent = comment;
        commentsList.appendChild(p);
    });
}

// Like or dislike
function vote(type) {
    if (userVote !== "") {
        showMessage("You have already voted!");
        return;
    }

    if (type === "like") {
        likes++;
    } else {
        dislikes++;
    }

    userVote = type;

    setCookie("likes", likes);
    setCookie("dislikes", dislikes);
    setCookie("userVote", userVote);

    updateUI();
    showMessage("Your vote has been saved!");
}

// Submit a comment
function submitComment() {
    if (hasCommented) {
        showMessage("You have already commented!");
        return;
    }

    const input = document.getElementById("comment-input");
    const comment = input.value.trim();

    if (comment === "") {
        showMessage("Please write a comment.");
        return;
    }

    comments.push(comment);
    hasCommented = true;

    setCookie("comments", JSON.stringify(comments));
    setCookie("hasCommented", "true");

    input.value = "";
    updateUI();
    showMessage("Comment submitted!");
}

// Clear the text field
function clearComment() {
    document.getElementById("comment-input").value = "";
}

// Reset everything
function resetAll() {
    deleteCookie("likes");
    deleteCookie("dislikes");
    deleteCookie("userVote");
    deleteCookie("comments");
    deleteCookie("hasCommented");

    likes = 0;
    dislikes = 0;
    comments = [];
    userVote = "";
    hasCommented = false;

    clearComment();
    updateUI();
    showMessage("Everything has been reset!");
}

// Display a message
function showMessage(message) {
    document.getElementById("message").textContent = message;
}

// Event listeners
document.getElementById("like-btn").addEventListener("click", () => vote("like"));
document.getElementById("dislike-btn").addEventListener("click", () => vote("dislike"));
document.getElementById("submit-btn").addEventListener("click", submitComment);
document.getElementById("clear-btn").addEventListener("click", clearComment);
document.getElementById("reset-btn").addEventListener("click", resetAll);

// Initialize
loadData();