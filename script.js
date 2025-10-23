
        const form = document.querySelector('form');
        const container = document.querySelector('.image-container');
        const input = document.querySelector('.search-input');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let query = input.value.trim();

            if (query === "") {
                query = "marvel";
            }

            // Show loading state
            container.innerHTML = '<div class="loading">Searching for movies...</div>';

            tvMazeApi(query);
        });

        async function tvMazeApi(query) {
            try {
                const req = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
                const movies = await req.json();
                
                // Clear loading
                container.innerHTML = "";
                
                if (movies.length === 0) {
                    container.innerHTML = '<div class="no-results">No results found. Try another search! 🔍</div>';
                    return;
                }
                
                makeImages(movies);
            } catch (error) {
                console.error("Error fetching data:", error);
                container.innerHTML = '<div class="no-results">Oops! Something went wrong. Please try again.</div>';
            }
        }

        function makeImages(movies) {
            movies.forEach(movie => {
                if (movie.show.image && movie.show.image.medium) {
                    const card = document.createElement('div');
                    card.className = 'movie-card';
                    
                    const img = document.createElement('img');
                    img.src = movie.show.image.medium;
                    img.alt = movie.show.name;
                    
                    const info = document.createElement('div');
                    info.className = 'movie-info';
                    
                    const title = document.createElement('h3');
                    title.textContent = movie.show.name;
                    
                    info.appendChild(title);
                    card.appendChild(img);
                    card.appendChild(info);
                    container.appendChild(card);
                }
            });
        }

        // Load Marvel movies by default
        window.addEventListener('load', () => {
            tvMazeApi('marvel');
        });
    