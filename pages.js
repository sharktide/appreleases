function head(name, description) {
    return (
        `<h1>${name}</h1>
        <p>${description}</p>`
    );
}

function repo(name) {
    return (
        `<h3>Repository</h3>
        <a href="https://github.com/sharktide/${name}">
            <img src="https://github-readme-stats.vercel.app/api/pin/?username=sharktide&repo=${name}&show_owner=true">
        </a>`
    );
}

function api(repo) {
    return (
        `<h3>API</h3>
        <a href="https://github.com/sharktide/${repo}">
            <img src="https://github-readme-stats.vercel.app/api/pin/?username=sharktide&repo=${repo}&show_owner=true">
        </a>`
    );
}

function twoColumnLayout(contentLeft, contentRight) {
    return (
        `<div class="wrapper">
            <div class="container container-left">
                ${contentLeft}
            </div>
            <div class="container container-right">
                ${contentRight}
            </div>
        </div>`
    );
}


function singleColumnLayout(content) {
    return (
        `<div class="container">
            ${content}
        </div>`
    );
}

/*

// Function to generate HTML for Downloads
async function loadDownloadsHTML(projectName) {
    const contentElement = document.getElementById('container-right');
    //contentElement.innerHTML = ''; // Clear previous content

    try {
        const response = await fetch('data/downloads.json');
        const downloadsData = await response.json();

        if (!downloadsData[projectName]) {
            return `<p>No downloads available for this project.</p>`;
        }

        const projectData = downloadsData[projectName];
        let html = `<h2>Downloads for ${projectName}</h2>`;

        // Iterate through versions for this project
        for (let version in projectData) {
            const versionData = projectData[version];
            html += `<h3>Version: ${version}</h3>`;

            // Create platform dropdown
            html += `<label for="platformSelect">Select Platform:</label>
                     <select id="platformSelect-${version}" class="download-dropdown">
                         <option value="">Select Platform</option>`;
            
            Object.keys(versionData.platforms).forEach(platform => {
                html += `<option value="${platform}">${platform.charAt(0).toUpperCase() + platform.slice(1)}</option>`;
            });

            html += `</select>`;

            // Container for download options (packed/unpacked)
            html += `<div id="downloadOptions-${version}" class="download-options"></div>`;
        }

        return html; // Return HTML for the download section
    } catch (error) {
        console.error('Error loading download data:', error);
        return '<p>Failed to load download data. Please try again later.</p>';
    }
}
*/

// Function to generate HTML for Downloads
async function loadDownloadsHTML(projectName) {
    const contentElement = document.getElementById('container-right');
    // Clear previous content
    //contentElement.innerHTML = ''; // Uncomment this line to clear previous content

    try {
        const response = await fetch('data/downloads.json');
        const downloadsData = await response.json();

        if (!downloadsData[projectName]) {
            contentElement.innerHTML = `<p>No downloads available for this project.</p>`;
            return;
        }

        const projectData = downloadsData[projectName];
        let html = `<h2>Downloads for ${projectName}</h2>`;

        // Iterate through versions for this project
        for (let version in projectData) {
            const versionData = projectData[version];
            html += `<h3>Version: ${version}</h3>`;

            // Create platform dropdown
            html += `<label for="platformSelect-${version}">Select Platform:</label>
                     <select id="platformSelect-${version}" class="download-dropdown">
                         <option value="">Select Platform</option>`;

            // Loop through platforms (Windows, etc.) and create dropdown options
            Object.keys(versionData.platforms).forEach(platform => {
                html += `<option value="${platform}">${platform.charAt(0).toUpperCase() + platform.slice(1)}</option>`;
            });

            html += `</select>`;

            // Container for download options (packed/unpacked)
            html += `<div id="downloadOptions-${version}" class="download-options"></div>`;
        }

        // Insert HTML into the container for the download section
        contentElement.innerHTML = html;

        // Add event listeners for platform selection dropdowns
        Object.keys(projectData).forEach(version => {
            const platformSelect = document.getElementById(`platformSelect-${version}`);
            platformSelect.addEventListener('change', function() {
                const selectedPlatform = platformSelect.value;
                const downloadOptionsContainer = document.getElementById(`downloadOptions-${version}`);

                if (selectedPlatform) {
                    const platformData = projectData[version].platforms[selectedPlatform];

                    // Clear previous download options
                    //downloadOptionsContainer.innerHTML = '';

                    // Show packed/unpacked download links
                    if (platformData.packed) {
                        downloadOptionsContainer.innerHTML += `<p><strong>Packed:</strong> <a href="${platformData.packed}" target="_blank">Download</a></p>`;
                    }

                    if (platformData.unpacked) {
                        downloadOptionsContainer.innerHTML += `<p><strong>Unpacked:</strong> <a href="${platformData.unpacked}" target="_blank">Download</a></p>`;
                    }
                } else {
                    // Clear the download options if no platform is selected
                    //downloadOptionsContainer.innerHTML = '';
                }
            });
        });
    } catch (error) {
        console.error('Error loading download data:', error);
        contentElement.innerHTML = '<p>Failed to load download data. Please try again later.</p>';
    }
}


function loadContent() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    const contentElement = document.getElementById('container');
  
    // Clear previous content
    //contentElement.innerHTML = '';
  
    // Render content based on the 'page' query parameter
    if (page === 'currencyconverter') {
        let leftContent = head("Currency Converter", "A simple currency converter that can convert between over 150 currencies.") + repo("currency-converter") + api("currency-converter-api");
        loadDownloadsHTML("currencyconverter").then(rightContent => {
            contentElement.innerHTML = twoColumnLayout(leftContent, rightContent);
        });
    } else if (page === 'about') {
        const content = head("About", "This is an about page that tells you more about my projects.");
        contentElement.innerHTML = singleColumnLayout(content);
    } else {
        contentElement.innerHTML = `<h2>404 - Page Not Found</h2><p>The page you requested does not exist.</p>`;
    }
}

  
// Load content when the page is loaded
window.onload = loadContent;
