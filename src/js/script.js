 // Array of tool links
 const toolLinks = [
    'https://beta.masttools.com/holi-wish/',
    'https://beta.masttools.com/age-calculator/',
];

// Function to fetch and create tool boxes
const createToolBoxes = async () => {
    const toolsList = document.getElementById('toolsList');

    for (const link of toolLinks) {
        try {
            // Fetch the manifest.json file
            const manifestResponse = await fetch(`${link}/manifest.json`);
            const manifest = await manifestResponse.json();

            // Extract information from the manifest
            const title = manifest.short_name || 'Untitled Tool';
            const description = manifest.description || 'No description available';
            const imageUrl = manifest.icons ? manifest.icons[0].src : 'default-icon.png';

            // Create tool box element
            const toolBox = document.createElement('div');
            toolBox.className = 'tool-box';
            toolBox.innerHTML = `
                <img src="${link}/${imageUrl}" alt="${title}">
                <h2>${title}</h2>
                <p>${description}</p>
                <button onclick="window.location.href='${link}'">Open Tool</button>
            `;

            // Append tool box to the toolsList container
            toolsList.appendChild(toolBox);
        } catch (error) {
            console.error(`Error fetching manifest for ${link}:`, error);
        }
    }
};

// Call the function to create tool boxes
createToolBoxes();
