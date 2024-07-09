const escribirTexto = (texto, elemento, tiempo, activador) => {
  let index = 0;
  const timer = setInterval(() => {
    elemento.value += texto[index];
    document.querySelector("#content-text-ollama").scrollTop =
      document.querySelector("#content-text-ollama").scrollHeight;
    index++;
    if (index === texto.length) {
      clearInterval(timer);
      activador.value = false;
    }
  }, tiempo);
};

const copyText = (texto) => {
  navigator.clipboard
    .writeText(texto)
    .then(() => {
      console.log("Texto copiado al portapapeles");
    })
    .catch((err) => {
      console.error("Error al copiar el texto: ", err);
    });
};

const speechText = (text) => {
  if ("speechSynthesis" in window) {
    const readText = new SpeechSynthesisUtterance(text);
    // Podés configurar más propiedades del readText, como el idioma, la voz, el tono y la velocidad
    readText.lang = "es-AR"; // Configura el idioma a español Argentino
    readText.pitch = 1; // El tono - Rango de 0 a 2
    readText.rate = 1; // Velocidad - Rango de 0.1 a 10

    // Inicia la síntesis de voz
    window.speechSynthesis.speak(readText);
  } else {
    alert("Lo siento, tu navegador no soporta la síntesis de voz.");
  }
};

export { escribirTexto, copyText, speechText };
