document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const TAMANHO_MAXIMO_DIPLAY = 21;

  function adicionarNumero(numero) {
    if (display.innerText.length < TAMANHO_MAXIMO_DIPLAY) {
      display.innerText += numero;
    }
  }

  function adicionarPonto() {
    if (display.innerText.length < TAMANHO_MAXIMO_DIPLAY) {
      let parcelas = display.innerText.split(/[/*+-]/);

      if (!parcelas[parcelas.length - 1].includes(".")) {
        display.innerText += ".";
      }
    }
  }

  function adicionarOperador(operador) {
    if (display.innerText.length < TAMANHO_MAXIMO_DIPLAY) {
      if (
        /[/*+-]/.test(display.innerText.charAt(display.innerText.length - 1))
      ) {
        display.innerText = display.innerText.slice(0, -1) + operador;
      } else {
        if (!/[/*+-]/.test(display.innerText)) {
          if (display.innerText.length === 0) {
            display.innerText = "0" + operador;
          } else {
            display.innerText += operador;
          }
        }
      }
    }
  }

  function calcular() {
    if (display.innerText.length === 0) {
      return;
    }
    try {
      let resultado;
      let parcelas = display.innerText.split(/[/*+-]/);

      if (parcelas[1].length === 0 || parcelas[1] == ".") {
        parcelas[1] = 0;
      }

      if (display.innerText.includes("/")) {
        resultado = parseFloat(parcelas[0]) / parseFloat(parcelas[1]);
      }
      if (display.innerText.includes("*")) {
        resultado = parseFloat(parcelas[0]) * parseFloat(parcelas[1]);
      }
      if (display.innerText.includes("+")) {
        resultado = parseFloat(parcelas[0]) + parseFloat(parcelas[1]);
      }
      if (display.innerText.includes("-")) {
        resultado = parseFloat(parcelas[0]) - parseFloat(parcelas[1]);
      }

      if (resultado.toString().length > TAMANHO_MAXIMO_DIPLAY) {
        throw new Error("Tamanho display excedido");
      } else {
        display.innerText = resultado.toString();
      }
    } catch (e) {
      display.innerText = e.message;
    }
  }

  function limpar() {
    display.innerText = "";
  }

  window.adicionarNumero = adicionarNumero;
  window.adicionarOperador = adicionarOperador;
  window.calcular = calcular;
  window.limpar = limpar;
  window.adicionarPonto = adicionarPonto;
});
