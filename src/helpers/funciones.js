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
    const utterance = new SpeechSynthesisUtterance(text);
    // Puedes configurar más propiedades del utterance, como el idioma, la voz, el tono y la velocidad
    utterance.lang = "es-AR"; // Configura el idioma a español
    utterance.pitch = 1; // Rango de 0 a 2
    utterance.rate = 1; // Rango de 0.1 a 10

    // Inicia la síntesis de voz
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Lo siento, tu navegador no soporta la síntesis de voz.");
  }
};

export { escribirTexto, copyText, speechText };
