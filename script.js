document.addEventListener("DOMContentLoaded", async () => {
    const photoGrid = document.getElementById("photo-grid");
    const imageFolder = "images"; // Folder containing the images
    const batchSize = 20; // Number of images to load per batch
    let totalImages = 427; // Set the total number of images manually or dynamically via server-side API
    let currentImage = totalImages; // Start from the last image

    // Create a modal for viewing full images
    const modal = document.createElement("div");
    modal.id = "image-modal";
    modal.style.display = "none";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";

    const modalImage = document.createElement("img");
    modalImage.style.maxWidth = "90%";
    modalImage.style.maxHeight = "90%";
    modal.appendChild(modalImage);

    modal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    document.body.appendChild(modal);

    function loadBatch() {
        const startImage = Math.max(currentImage - batchSize + 1, 1);
        const imageFilenames = [];

        // Generate filenames in descending order
        for (let i = currentImage; i >= startImage; i--) {
            imageFilenames.push(`image${i}.jpg`);
        }

        // Append images to the grid
        imageFilenames.forEach((filename) => {
            const img = document.createElement("img");
            img.src = `${imageFolder}/${filename}`;
            img.alt = `Image ${filename}`;
            img.classList.add("photo-item");

            // Add click event to open the image in the modal
            img.addEventListener("click", () => {
                modalImage.src = img.src;
                modal.style.display = "flex";
            });

            // Check if the image loads successfully
            img.onerror = () => {
                console.error(`Error loading image: ${img.src}`);
                img.src = `${imageFolder}/${filename.replace(".jpg", ".jpeg")}`; // Try .jpeg if .jpg fails
                img.onerror = () => {
                    console.error(`Error loading image: ${img.src}`);
                    img.src = `${imageFolder}/${filename.replace(".jpg", ".png")}`; // Try .png if .jpeg fails
                };
            };

            photoGrid.appendChild(img);
        });

        currentImage = startImage - 1;
    }

    function handleScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            if (currentImage > 0) {
                loadBatch();
            }
        }
    }

    // Load the first batch of images
    if (totalImages > 0) {
        loadBatch();
        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);
    } else {
        console.error("No images found in the folder.");
    }
});
