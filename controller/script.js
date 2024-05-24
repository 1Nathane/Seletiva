document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const TAMANHO_MAXIMO_DIPLAY = 15;
  const UM = 1;
  const UM_NEGATIVO = -1;
  const ZERO = 0;
  const ZERO_STRING = "0";
  const MULTIPLICADOR = "*";
  const DIVISOR = "/";
  const ADITOR = "+";
  const SUBTRATOR = "-";
  const PONTO = ".";
  const OPERADORES = /[/*+-]/;
  const MSG_ERRO_TAMANHO_EXCEDIDO = "Tamanho display excedido";
  const VAZIO = "";

  function adicionarNumero(numero) {
    if (display.innerText.length < TAMANHO_MAXIMO_DIPLAY) {
      display.innerText += numero;
    }
  }

  function adicionarPonto() {
    if (display.innerText.length < TAMANHO_MAXIMO_DIPLAY) {
      let parcelas = display.innerText.split(OPERADORES);

      if (!parcelas[parcelas.length - UM].includes(PONTO)) {
        display.innerText += PONTO;
      }
    }
  }

  function adicionarOperador(operador) {
    display.innerText = tratarTextoParaReceberOperador(
      display.innerText,
      operador
    );
  }

  function tratarTextoParaReceberOperador(texto, operador) {
    if (OPERADORES.test(texto.charAt(texto.length - UM))) {
      return texto.slice(ZERO, UM_NEGATIVO) + operador;
    }

    if (texto.length >= TAMANHO_MAXIMO_DIPLAY) {
      return texto;
    }

    if (texto.length === ZERO) {
      return ZERO_STRING + operador;
    }

    if (OPERADORES.test(texto)) {
      return texto;
    } else {
      return texto + operador;
    }
  }

  function calcular() {
    if (display.innerText.length === ZERO) {
      return;
    }

    if (!OPERADORES.test(display.innerText)) {
      return;
    }
    try {
      let resultado;
      let parcelas = display.innerText.split(OPERADORES);
      let casasdecimais = ZERO;
      casasdecimais = quantidadeCasasDecimais(parcelas[ZERO]);
      if (parcelas.length > 1) {
        casasdecimais += quantidadeCasasDecimais(parcelas[UM]);

        if (parcelas[UM].length === ZERO || parcelas[UM] == PONTO) {
          parcelas[UM] = ZERO;
        }
      }

      if (display.innerText.includes(DIVISOR)) {
        resultado = parseFloat(parcelas[ZERO]) / parseFloat(parcelas[UM]);
      }
      if (display.innerText.includes(MULTIPLICADOR)) {
        resultado = parseFloat(parcelas[ZERO]) * parseFloat(parcelas[UM]);
      }
      if (display.innerText.includes(ADITOR)) {
        resultado = parseFloat(parcelas[ZERO]) + parseFloat(parcelas[UM]);
      }
      if (display.innerText.includes(SUBTRATOR)) {
        resultado = parseFloat(parcelas[ZERO]) - parseFloat(parcelas[UM]);
      }

      if (resultado.toString().length > TAMANHO_MAXIMO_DIPLAY) {
        display.innerText = resultado.toString().length;
        throw new Error(MSG_ERRO_TAMANHO_EXCEDIDO);
      } else {
        display.innerText = resultado.toFixed(casasdecimais).toString();
      }
    } catch (e) {
      display.innerText = e.message;
    }
  }

  function limpar() {
    display.innerText = VAZIO;
  }

  function quantidadeCasasDecimais(texto) {
    if (!texto.includes(PONTO)) {
      return ZERO;
    }
    return texto.split(PONTO)[UM].length;
  }

  window.adicionarNumero = adicionarNumero;
  window.adicionarOperador = adicionarOperador;
  window.calcular = calcular;
  window.limpar = limpar;
  window.adicionarPonto = adicionarPonto;
});
