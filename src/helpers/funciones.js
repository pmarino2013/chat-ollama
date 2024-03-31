const escribirTexto = (texto, elemento, tiempo) => {
  let index = 0;
  const timer = setInterval(() => {
    elemento.value += texto[index];
    index++;
    if (index === texto.length) {
      clearInterval(timer);
      terminado = true;
    }
  }, tiempo);
};

export { escribirTexto };
