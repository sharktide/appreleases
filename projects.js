document.addEventListener("DOMContentLoaded", function() {
    // Fetch GitHub repositories
    fetch('https://api.github.com/users/sharktide/repos')
        .then(response => response.json())
        .then(repos => {
            const repoContainer = document.getElementById('github-repositories');
            repos.forEach(repo => {
                const repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                const repoImage = document.createElement('img');
                repoImage.src = `https://github-readme-stats.vercel.app/api/pin/?username=sharktide&repo=${repo.name}&show_owner=true`;
                repoImage.alt = repo.name;
                repoImage.id = repo.name.toLowerCase();
                repoLink.appendChild(repoImage);
                repoContainer.appendChild(repoLink);
            });

            // Add search functionality
            document.getElementById('search-bar-repos').addEventListener('input', function() {
                const query = this.value.toLowerCase();
                const githubRepos = document.querySelectorAll('.github-repositories a');

                githubRepos.forEach(repo => {
                    const repoName = repo.querySelector('img').id.toLowerCase();
                    if (repoName.includes(query)) {
                        repo.style.display = 'block';
                    } else {
                        repo.style.display = 'none';
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching repositories:', error));

    // Fetch Hugging Face models
    fetch('https://huggingface.co/api/models?search=sharktide')
        .then(response => response.json())
        .then(models => {
            const modelContainer = document.getElementById('huggingface-models');
            models.forEach(model => {
                const modelLink = document.createElement('a');
                modelLink.href = `https://huggingface.co/${model.id}`;
                modelLink.classList.add('card');

                const cardTitle = document.createElement('div');
                cardTitle.classList.add('card-title');
                cardTitle.textContent = model.id;
                modelLink.appendChild(cardTitle);

                const cardOwner = document.createElement('div');
                cardOwner.classList.add('card-owner');
                cardOwner.textContent = model.author;
                modelLink.appendChild(cardOwner);

                let tags = model.tags.slice(); // Copy the tags array

                // Filter out specific tags
                tags = tags.filter(tag => ![
                    'base_model:microsoft/resnet-50',
                    'base_model:finetune:microsoft/resnet-50',
                    'endpoints_compatible',
                    'region:us',
                    'en'
                ].includes(tag));

                const cardTags = document.createElement('div');
                cardTags.classList.add('card-tags');
                cardTags.textContent = `Tags: ${tags.join(', ')}`;
                modelLink.appendChild(cardTags);

                const cardLib = document.createElement('div');
                cardLib.classList.add('card-lib');
                const libCircle = document.createElement('div');
                libCircle.classList.add('circle');

                // Set library based on tags and provided library
                let libraries = [];
                if (model.library) {
                    libraries.push(model.library);
                }
                if (tags.includes('transformers')) {
                    libraries.push('transformers');
                    cardLib.style.color = 'rgb(211, 200, 66)';
                    libCircle.style.backgroundColor = 'rgb(211, 200, 66)';
                    tags = tags.filter(tag => tag !== 'transformers');
                }

                // Check model files for TensorFlow
                fetch(`https://huggingface.co/api/models/${model.id}`)
                    .then(response => response.json())
                    .then(modelDetails => {
                        const files = modelDetails.siblings.map(file => file.rfilename);
                        if (files.includes('tf_model.h5') || files.includes('tf_model.keras')) {
                            libraries.push('tensorflow');
                            cardLib.style.color = 'orange';
                            libCircle.style.backgroundColor = 'orange';
                        }

                        cardLib.appendChild(libCircle); // Append the circle before the library text
                        cardLib.appendChild(document.createTextNode(libraries.join(', ')));
                        modelLink.appendChild(cardLib);

                        // Add image classification circle if applicable
                        if (tags.includes('image_classification')) {
                            const imgClassContainer = document.createElement('div');
                            imgClassContainer.classList.add('card-lib');

                            const imgClassCircle = document.createElement('div');
                            imgClassCircle.classList.add('circle');
                            imgClassCircle.style.backgroundColor = 'blue';

                            const imgClassText = document.createElement('div');
                            imgClassText.textContent = 'Image Classification';

                            imgClassContainer.appendChild(imgClassCircle);
                            imgClassContainer.appendChild(imgClassText);

                            modelLink.appendChild(imgClassContainer);
                        }

                        modelContainer.appendChild(modelLink);
                    })
                    .catch(error => console.error('Error fetching model details:', error));
            });

            // Add search functionality
            document.getElementById('search-bar-models').addEventListener('input', function() {
                const query = this.value.toLowerCase();
                const huggingfaceModels = document.querySelectorAll('.huggingface-models .card');

                huggingfaceModels.forEach(model => {
                    if (model.textContent.toLowerCase().includes(query)) {
                        model.style.display = 'block';
                    } else {
                        model.style.display = 'none';
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching models:', error));
});
