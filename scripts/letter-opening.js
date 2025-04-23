document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded and DOM fully parsed."); // Debugging log

    // Add event listeners to all letter links
    document.querySelectorAll('.letter a').forEach(anchor => {
        anchor.addEventListener('click', event => {
            event.preventDefault(); // Prevent default link behavior
            const overlayId = anchor.getAttribute('data-overlay'); // Get the corresponding overlay ID
            console.log(`Clicked letter. Data-overlay: ${overlayId}`); // Debugging log

            const overlay = document.getElementById(overlayId);
            if (overlay) {
                console.log(`Found overlay with ID: ${overlayId}`); // Debugging log
                overlay.classList.remove('hidden'); // Show the overlay
                document.body.classList.add('blurred'); // Blur the background
            } else {
                console.error(`Overlay with ID "${overlayId}" not found. Check the data-overlay attribute and corresponding ID.`);
            }
        });
    });

    // Add event listeners to all close buttons
    document.querySelectorAll('.close-overlay').forEach(button => {
        button.addEventListener('click', () => {
            const overlay = button.closest('.overlay'); // Get the parent overlay
            if (overlay) {
                console.log(`Closing overlay with ID: ${overlay.id}`); // Debugging log
                overlay.classList.add('hidden'); // Hide the overlay
                document.body.classList.remove('blurred'); // Remove blur from the background
            } else {
                console.error('Overlay element not found. Ensure the close button is inside the overlay.');
            }
        });
    });
});
