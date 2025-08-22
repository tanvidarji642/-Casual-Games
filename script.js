function showGame(game) {
    const container = document.getElementById('game-container');
    container.innerHTML = '';

    // Remove previous game scripts and styles
    document.querySelectorAll('.dynamic-game').forEach(el => el.remove());

    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `games/${game}/${game}.css`;
    link.classList.add('dynamic-game');
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement('script');
    script.src = `games/${game}/${game}.js`;
    script.classList.add('dynamic-game');
    document.body.appendChild(script);
}
