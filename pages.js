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

// Function to generate HTML for Downloads
async function loadDownloadsHTML(projectName) {
    let html = '';  // We'll return this as the result

    try {
        const response = await fetch('data/downloads.json');
        const downloadsData = await response.json();

        if (!downloadsData[projectName]) {
            return `<p>No downloads available for this project.</p>`;
        }

        const projectData = downloadsData[projectName];
        html += `<h2>Downloads</h2>`;

        // Iterate through versions for this project
        for (let version in projectData) {
            const versionData = projectData[version];
            html += `<details><summary><strong>Version: ${version}</strong></summary>`;

            // Iterate through platforms for the current version
            Object.keys(versionData.platforms).forEach(platform => {
                const platformData = versionData.platforms[platform];
                html += `<details><summary><strong>${platform.charAt(0).toUpperCase() + platform.slice(1)}</strong></summary>`;

                // Add download links (packed/unpacked)
                if (platformData.packed) {
                    html += `<p><strong>Installer:</strong> <a href="${platformData.packed}" target="_blank">Download</a></p>`;
                }

                if (platformData.unpacked) {
                    html += `<p><strong>Unpacked:</strong> <a href="${platformData.unpacked}" target="_blank">Download</a></p>`;
                }

                html += `</details>`; // End platform details
            });

            html += `</details>`; // End version details
        }

    } catch (error) {
        html = `<p>Failed to load download data. Please try again later.</p>`;
    }

    return html; // Return the generated HTML as a string
}

function loadContent() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    let contentHtml = '';

    // Render content based on the 'page' query parameter
    if (page === 'currencyconverter') {
        let leftContent = head("Currency Converter", "A simple currency converter that can convert between over 150 currencies.") + repo("currency-converter") + api("currency-converter-api");
        
        loadDownloadsHTML("currencyconverter").then(rightContent => {
            contentHtml = twoColumnLayout(leftContent, rightContent);
            document.getElementById('container').innerHTML = contentHtml;
        });

    } else if (page === 'about') {
        const content = head("About", "This is an about page that tells you more about my projects.");
        contentHtml = singleColumnLayout(content);
        document.getElementById('container').innerHTML = contentHtml;

    } else {
        contentHtml = `<h2>404 - Page Not Found</h2><p>The page you requested does not exist.</p>`;
        document.getElementById('container').innerHTML = contentHtml;
    }
}

// Load content when the page is loaded
window.onload = loadContent;
