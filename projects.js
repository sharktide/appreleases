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
