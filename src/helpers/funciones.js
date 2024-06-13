const escribirTexto = (texto, elemento, tiempo) => {
  let index = 0;
  const timer = setInterval(() => {
    elemento.value += texto[index];
    document.querySelector("#content-text-ollama").scrollTop =
      document.querySelector("#content-text-ollama").scrollHeight;
    index++;
    if (index === texto.length) {
      clearInterval(timer);
    }
  }, tiempo);
};

export { escribirTexto };
