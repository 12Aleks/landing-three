function soundClick() {
    const audio = document.getElementById('audio');
    const button = document.querySelector('.music-button');
    let notes = document.querySelector('.music-notes');
    const circle = document.querySelector('.progress-ring__circle');
    const circumference = circle.r.baseVal.value * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }

    if (audio.paused) {
        audio.play();
        button.classList.add('playing');
        notes.classList.add('show')
        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            setProgress(progress);
        });

        audio.addEventListener('ended', () => {
            button.classList.remove('playing');
            notes.classList.remove('show');
            setProgress(0); // Reset progress
        }, { once: true });
    } else {
        audio.pause();
        notes.classList.remove('show');
        button.classList.remove('playing');
    }
}
