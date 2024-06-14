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
      alert("Texto copiado al portapapeles");
    })
    .catch((err) => {
      console.error("Error al copiar el texto: ", err);
    });
};

export { escribirTexto, copyText };
