//CLASSE
class Personagem {
  constructor(nome, classe, poder, idade, foto) {
    this.nome = nome;
    this.classe = classe;
    this.poder = poder;
    this.idade = idade; 
    this.foto = foto;   
    this.ultimaRolagem = ""; 
  }
}

//VARIÁVEIS
const personagens = [];
const inputNome = document.getElementById("nome");
const selectClasse = document.getElementById("classe");
const inputPoder = document.getElementById("poder");
const inputIdade = document.getElementById("idade");
const inputFoto = document.getElementById("foto");
const btnAdicionar = document.getElementById("btnAdicionar");
const mensagem = document.getElementById("mensagem");
const lista = document.getElementById("lista");

const selectDado = document.getElementById("selectDado");
const inputQtd = document.getElementById("inputQtd");
const inputMod = document.getElementById("inputMod");
const btnRolar = document.getElementById("btnRolar");
const resultadoDado = document.getElementById("resultadoDado");

const notaEstrelas = document.getElementById("notaEstrelas");
const motivoAvaliacao = document.getElementById("motivoAvaliacao");
const btnAvaliar = document.getElementById("btnAvaliar");
const alertaEstrelas = document.getElementById("alertaEstrelas");
const estrelas = document.getElementById("estrelas");
const motivoEstrelas = document.getElementById("motivoEstrelas");
const btnFecharAlerta = document.getElementById("btnFecharAlerta");
let notaSelecionada = 0;

//FEEDBACK
function mostrarMsg(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

// NÍVEL DE PODER
function ctgrPoder(poder) {
  if (poder >= 80) {
    return "lendario";
  } else if (poder >= 50) {
    return "veterano";
  } else {
    return "iniciante";
  }
}

//IMAGENS DIVONICAS
function imagemClasse(classe) {
  switch (classe) {
    case "Guerreiro":
      return "imagens/guerreiro.png";
    case "Guerreira":
      return "imagens/guerreira.png";
    case "Mago":
      return "imagens/mago.png";
    case "Maga":
      return "imagens/maga.png";
    case "Arqueiro":
      return "imagens/arqueiro.png";
    case "Arqueira":
      return "imagens/arqueira.png";
    case "Ladino":
      return "imagens/ladino.png";
    case "Ladina":
      return "imagens/ladina.png";
    case "Paladino":
      return "imagens/paladino.png";
    case "Paladina":
      return "imagens/paladina.png";
    case "Clérigo":
      return "imagens/clerigo.png";
    case "Clériga":
      return "imagens/cleriga.png";
    case "Bárbaro":
      return "imagens/barbaro.png";
    case "Bárbara":
      return "imagens/barbara.png";
    case "Bardo":
      return "imagens/bardo.png";
    case "Barda":
      return "imagens/barda.png";
    case "Necromante":
      return "imagens/necromante.png";
    case "Necromante 2":
      return "imagens/necromante2.png";
    case "Princesa":
      return "imagens/princesa.png";
    case "Príncipe":
      return "imagens/principe.png";
    default:
      return "imagens/padrao.png";
  }
}

//LISTA
function listaP() {
  lista.innerHTML = "";

  for (let i = 0; i < personagens.length; i++) {
    const p = personagens[i];

    const card = document.createElement("div");
    card.className = "card " + ctgrPoder(p.poder);

    const img = document.createElement("img");
    if (p.foto !== "") {
      img.src = p.foto; // foto escolhida pelo usuário
    } else {
      img.src = imagemClasse(p.classe); // imagem padrão da classe
    }
    img.alt = "Imagem de " + p.nome;
    img.className = "avatar";

    const titulo = document.createElement("h3");
    titulo.textContent = p.nome;

    const info = document.createElement("p");
    let textoIdade = "não informada";
    if (p.idade !== null) {
      textoIdade = p.idade + " anos";
    }
    info.textContent =
      "Classe: " + p.classe + " | Poder: " + p.poder + " | Idade: " + textoIdade;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const btnD20 = document.createElement("button");
    btnD20.textContent = "Rolar d20";
    btnD20.className = "btnD20";
    btnD20.addEventListener("click", function () {
      rolarPersonagem(i);
    });

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.className = "btnRemover";
    btnRemover.addEventListener("click", function () {
      removerP(i);
    });

    acoes.appendChild(btnD20);
    acoes.appendChild(btnRemover);

    card.appendChild(img);
    card.appendChild(titulo);
    card.appendChild(info);

    // resultado do d20 aparece dentro do próprio card
    if (p.ultimaRolagem !== "") {
      const rolagem = document.createElement("p");
      rolagem.className = "rolagem";
      rolagem.textContent = p.ultimaRolagem;
      card.appendChild(rolagem);
    }

    card.appendChild(acoes);
    lista.appendChild(card);
  }
}

//LIMPA O FORMULÁRIO
function limparFormulario() {
  inputNome.value = "";
  selectClasse.value = "";
  inputPoder.value = "";
  inputIdade.value = "";
  inputFoto.value = "";
  inputNome.focus();
}

//ADICIONA PERSONAGEM (P)
function adicionarP() {
  const nome = inputNome.value.trim();
  const classe = selectClasse.value;
  const poder = Number(inputPoder.value);
  const idadeTexto = inputIdade.value;
  const idade = Number(idadeTexto);

  if (nome === "") {
    mostrarMsg("Digite o nome do personagem.", "erro");
  } else if (classe === "") {
    mostrarMsg("Escolha uma classe.", "erro");
  } else if (inputPoder.value === "" || poder < 1 || poder > 100) {
    mostrarMsg("O nível de poder deve ser de 1 a 100.", "erro");
  } else if (idadeTexto !== "" && (idade < 1 || idade > 999)) {
    mostrarMsg("A idade deve ser de 1 a 999 (ou deixe vazia).", "erro");
  } else {
    // idade opcional
    let idadeFinal = null;
    if (idadeTexto !== "") {
      idadeFinal = idade;
    }

    // foto opcional
    let fotoFinal = "";
    if (inputFoto.files.length > 0) {
      fotoFinal = URL.createObjectURL(inputFoto.files[0]);
    }

    const novo = new Personagem(nome, classe, poder, idadeFinal, fotoFinal); // nova instância
    personagens.push(novo);

    limparFormulario(); // limpa logo depois de guardar o personagem

    listaP();
    mostrarMsg(nome + " foi criado com sucesso!", "sucesso");
  }
}

//REMOVE PERSONAGEM(P)
function removerP(indice) {
  const nomeRemovido = personagens[indice].nome;
  personagens.splice(indice, 1);
  listaP();
  mostrarMsg(nomeRemovido + " foi removido.", "sucesso");
}

//ROLAGEM DE DADOS (D&D)
function sortearDado(lados) {
  return Math.floor(Math.random() * lados) + 1;
}

function mostrarResultadoDado(texto, tipo) {
  resultadoDado.textContent = texto;
  resultadoDado.className = tipo;
}

function rolarDados() {
  const lados = Number(selectDado.value);
  const qtd = Number(inputQtd.value);
  const mod = Number(inputMod.value); // vazio vira 0

  if (inputQtd.value === "" || qtd < 1 || qtd > 10) {
    mostrarResultadoDado("Escolha de 1 a 10 dados.", "erro");
    return;
  }

  let soma = 0;
  const rolagens = [];
  for (let i = 0; i < qtd; i++) {
    const valor = sortearDado(lados);
    rolagens.push(valor);
    soma += valor;
  }
  const total = soma + mod;

  let formula = qtd + "d" + lados;
  if (mod > 0) {
    formula += "+" + mod;
  } else if (mod < 0) {
    formula += mod;
  }

  let texto = formula + ": [" + rolagens.join(", ") + "] = " + total;

  // crítico só vale para 1 único d20
  if (lados === 20 && qtd === 1) {
    if (rolagens[0] === 20) {
      texto += " — CRÍTICO!";
    } else if (rolagens[0] === 1) {
      texto += " — FALHA CRÍTICA!";
    }
  }

  mostrarResultadoDado(texto, "sucesso");
}

function rolarPersonagem(indice) {
  const p = personagens[indice];
  const bonus = Math.floor(p.poder / 20);
  const valor = sortearDado(20);
  const total = valor + bonus;

  let texto = "d20: " + valor + " + " + bonus + " (bônus) = " + total;
  if (valor === 20) {
    texto += " — CRÍTICO!";
  } else if (valor === 1) {
    texto += " — FALHA CRÍTICA!";
  }

  p.ultimaRolagem = texto; // guarda no objeto para aparecer no card
  listaP();
  mostrarResultadoDado(p.nome + " rolou " + texto, "sucesso");
}

//AVALIAÇÃO DO SITE (ESTRELAS)
function desenharNota() {
  notaEstrelas.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const estrela = document.createElement("button");
    estrela.type = "button";
    estrela.className = "estrela";
    estrela.setAttribute("aria-label", i + " estrela(s)");

    if (i <= notaSelecionada) {
      estrela.textContent = "★";
      estrela.classList.add("ativa");
    } else {
      estrela.textContent = "☆";
    }

    estrela.addEventListener("click", function () {
      notaSelecionada = i;
      desenharNota();
    });

    notaEstrelas.appendChild(estrela);
  }
}

function descricaoNota(nota) {
  switch (nota) {
    case 1:
      return "Muito ruim";
    case 2:
      return "Ruim";
    case 3:
      return "Regular";
    case 4:
      return "Bom";
    case 5:
      return "Excelente";
    default:
      return "";
  }
}

function mostrarAlertaEstrelas(nota, motivo) {
  let desenho = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= nota) {
      desenho += "★";
    } else {
      desenho += "☆";
    }
  }

  estrelas.textContent = desenho + " (" + nota + " de 5 - " + descricaoNota(nota) + ")";
  motivoEstrelas.textContent = "Você deu " + nota + " estrela(s) porque: " + motivo;
  alertaEstrelas.className = "";
  alertaEstrelas.scrollIntoView({ behavior: "smooth", block: "center" });
}

function fecharAlerta() {
  alertaEstrelas.className = "oculto";
}

function enviarAvaliacao() {
  const motivo = motivoAvaliacao.value.trim();

  if (notaSelecionada === 0) {
    mostrarMsg("Escolha de 1 a 5 estrelas para avaliar o site.", "erro");
  } else if (motivo === "") {
    mostrarMsg("Explique por que você deu essa nota.", "erro");
  } else {
    mostrarAlertaEstrelas(notaSelecionada, motivo);
    mostrarMsg("Obrigado pela avaliação!", "sucesso");

    notaSelecionada = 0;
    motivoAvaliacao.value = "";
    desenharNota();
  }
}

//EVENTOS DE CLIQUE
btnAdicionar.addEventListener("click", adicionarP);
btnRolar.addEventListener("click", rolarDados);
btnAvaliar.addEventListener("click", enviarAvaliacao);
btnFecharAlerta.addEventListener("click", fecharAlerta);

desenharNota(); 