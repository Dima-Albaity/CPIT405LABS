
const themeToggle = document.getElementById("theme-toggle");

// Load the previously selected theme
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

// Update the button icon
function updateThemeIcon() {
    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
        themeToggle.textContent = "☾";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
}

// Change theme when the button is clicked
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    const currentTheme =
        document.body.classList.contains("dark-mode")
            ? "dark"
            : "light";

    localStorage.setItem("portfolio-theme", currentTheme);

    updateThemeIcon();
});

// Set the correct icon when the page loads
updateThemeIcon();
