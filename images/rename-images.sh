#!/bin/bash

# Directory containing the images (current directory)
IMAGE_DIR="."

# Check if directory exists
if [ ! -d "$IMAGE_DIR" ]; then
    echo "Error: Directory $IMAGE_DIR not found!" >&2
    exit 1
fi

# Counter for sequential numbering
counter=1

# Sort files by name and loop through all image files in the current directory
find "$IMAGE_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | sort | while read -r file; do
    # Check if the file exists
    if [ -f "$file" ]; then
        # Get the file extension
        extension="${file##*.}"
        # Create a new filename
        new_name="$IMAGE_DIR/image${counter}.${extension}"

        # Check if the new filename already exists
        while [ -f "$new_name" ]; do
            echo "Conflict: $new_name already exists. Adding a unique suffix."
            new_name="$IMAGE_DIR/image${counter}_$(date +%s).${extension}"
        done

        # Rename the file
        if mv "$file" "$new_name"; then
            echo "Renamed $file to $new_name"
        else
            echo "Error: Failed to rename $file" >&2
        fi

        # Increment the counter
        counter=$((counter + 1))
    fi
done
