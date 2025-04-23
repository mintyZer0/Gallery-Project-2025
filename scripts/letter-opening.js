document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded and DOM fully parsed."); // Debugging log

    const letterImages = document.querySelectorAll(".letter a img");

    if (letterImages.length > 0) {
        console.log("Found letter images:", letterImages); // Debugging log
        letterImages.forEach((letterImage) => {
            letterImage.addEventListener("click", (event) => {
                event.preventDefault(); // Prevent default anchor behavior
                letterImage.src = "../png/letter-opened.png"; // Update with the correct path

                // Debugging: Log to confirm the click event is triggered
                console.log("Letter image clicked. Source updated to:", letterImage.src);
            });
        });
    } else {
        console.error("No .letter a img elements were found in the DOM.");
    }
});
