#!/bin/bash

# Directory containing the files (current directory)
FILE_DIR="."

# Check if directory exists
if [ ! -d "$FILE_DIR" ]; then
    echo "Error: Directory $FILE_DIR not found!" >&2
    exit 1
fi

# Debugging: Log the directory being processed
echo "Processing files in directory: $FILE_DIR"

# Counter for sequential numbering
counter=1

# Sort files by name and loop through all files in the current directory
find "$FILE_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | sort | while read -r file; do
    # Debugging: Log the current file being processed
    echo "Processing file: $file"

    # Check if the file exists
    if [ -f "$file" ]; then
        # Get the file extension
        extension="${file##*.}"
        # Create a new filename
        new_name="$FILE_DIR/file${counter}.${extension}"

        # Debugging: Log the new filename
        echo "New filename: $new_name"

        # Rename the file only if the new name is different
        if [ "$file" != "$new_name" ]; then
            if mv "$file" "$new_name"; then
                echo "Renamed $file to $new_name"
            else
                echo "Error: Failed to rename $file" >&2
            fi
        else
            echo "No renaming needed for $file"
        fi

        # Increment the counter
        counter=$((counter + 1))
    else
        # Debugging: Log if the file does not exist
        echo "File does not exist: $file" >&2
    fi
done

# Debugging: Log completion
echo "Reordering complete. Processed $((counter - 1)) files."
