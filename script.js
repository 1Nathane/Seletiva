document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");

  function adicionarNumero(numero) {
    if (display.innerText.length < 22) {
      display.innerText += numero;
    }
  }

  function adicionarVirgula() {
    if (display.innerText.length < 22) {
      display.innerText += ",";
    }
  }

  function adicionarOperador(operador) {
    if (display.innerText.length < 22) {
      display.innerText += operador;
    }
  }

  function calcular() {
    try {
      let resultado = eval(display.innerText.replace("÷", "/"));
      display.innerText = resultado.toString().substring(0, 22);
    } catch (e) {
      display.innerText = "Erro";
    }
  }

  function limpar() {
    display.innerText = "";
  }

  window.adicionarNumero = adicionarNumero;
  window.adicionarOperador = adicionarOperador;
  window.calcular = calcular;
  window.limpar = limpar;
  window.adicionarVirgula = adicionarVirgula;
});
