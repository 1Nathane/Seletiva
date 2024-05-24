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
      display.innerText = tratarTextoParaReceberOperador(
        display.innerText,
        operador
      );
    }
  }

  function tratarTextoParaReceberOperador(texto, operador) {
    if (/[/*+-]/.test(texto.charAt(texto.length - 1))) {
      return texto.slice(0, -1) + operador;
    }
    if (texto.length === 0) {
      return "0" + operador;
    }

    if (/[/*+-]/.test(texto)) {
      return texto;
    } else {
      return texto + operador;
    }
  }

  function calcular() {
    if (display.innerText.length === 0) {
      return;
    }
    try {
      let resultado;
      let parcelas = display.innerText.split(/[/*+-]/);
      let casasdecimais = 0;
      if (parcelas[0].includes(".")) {
        casasdecimais = quantidadeCasasDecimais(parcelas[0]);
      }
      if (parcelas[1].includes(".")) {
        casasdecimais += quantidadeCasasDecimais(parcelas[1]);
      }

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
        display.innerText = resultado.toFixed(casasdecimais).toString();
      }
    } catch (e) {
      display.innerText = e.message;
    }
  }

  function limpar() {
    display.innerText = "";
  }

  function quantidadeCasasDecimais(texto) {
    return texto.split(".")[1].length;
  }

  window.adicionarNumero = adicionarNumero;
  window.adicionarOperador = adicionarOperador;
  window.calcular = calcular;
  window.limpar = limpar;
  window.adicionarPonto = adicionarPonto;
});
