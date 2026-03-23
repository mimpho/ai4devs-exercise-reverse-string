const input = document.getElementById("inputText");
const output = document.getElementById("outputText");

// Audio context (web audio API)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(frequency) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.value = frequency;

    gain.gain.value = 0.05;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
}

// Generador de color dinámico
function generateColor(length) {
    const hue = (length * 40) % 360;
    return `hsl(${hue}, 80%, 50%)`;
}

// Fondo dinámico
function updateBackground(length) {
    const hue = (length * 25) % 360;
    document.body.style.background = `radial-gradient(circle at center, hsl(${hue}, 70%, 20%), black)`;
}

input.addEventListener("input", (e) => {
    const text = e.target.value;

    // Invertir string
    const reversed = text.split("").reverse().join("");

    output.textContent = reversed;

    // Color dinámico
    const color = generateColor(text.length);
    output.style.color = color;

    // Background dinámico
    updateBackground(text.length);

    // Efecto glitch
    output.classList.remove("glitch");
    void output.offsetWidth; // trigger reflow
    output.classList.add("glitch");

    // Audio por tecla
    if (text.length > 0) {
        const charCode = text.charCodeAt(text.length - 1);
        const frequency = 200 + (charCode % 800);
        playTone(frequency);
    }
});