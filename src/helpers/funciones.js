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

export { escribirTexto };
