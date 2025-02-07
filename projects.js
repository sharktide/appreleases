document.addEventListener("DOMContentLoaded", function() {
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

    document.getElementById('search-bar-models').addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const huggingfaceModels = document.querySelectorAll('.huggingface-models');

        huggingfaceModels.forEach(model => {
            if (model.textContent.toLowerCase().includes(query)) {
                model.style.display = 'block';
            } else {
                model.style.display = 'none';
            }
        });
    });
});
