let inputText = document.querySelector('.input-texto');
let traducao = document.querySelector('.traducao');
let idiomas = document.querySelector('.idiomas'); 
let mic = document.querySelector('.mic');
 
async function traduzir() { // função assíncrona q traduz o texto ao ser chamada
  

   if(inputText.value === "") {
        traducao.textContent = "Nenhum texto foi traduzido. Por favor, insira um texto válido.";
        return; // sai da função se o campo de entrada estiver vazio
   }


   try {
    let endereco = "https://api.mymemory.translated.net/get?q=" // URL da API de tradução
    + inputText.value // texto a ser traduzido
    + "&langpair=pt-BR|"
    + idiomas.value; // idioma selecionado pelo usuário para tradução

    let resposta = await fetch(endereco); // aguarda a resposta da API antes de prosseguir
    let dados = await resposta.json(); // converte a resposta em JSON e aguarda a conclusão

    traducao.textContent = dados.responseData.translatedText; // exibe o texto traduzido na área designada da página
  } catch (error) {
    console.error(error);
    traducao.textContent = "Ocorreu um erro ao traduzir o texto. Por favor, tente novamente mais tarde.";
  }
}

   



  



mic.addEventListener('click', () => {
    let reconhecimento = new webkitSpeechRecognition(); // cria uma nova instância do reconhecimento de voz; // webkitSpeechRecognition é uma API de reconhecimento de voz do navegador
    reconhecimento.lang = "pt-BR"; // define o idioma para português do Brasil // lang é uma propriedade do objeto reconhecimento que define o idioma do reconhecimento de voz
    reconhecimento.start(); // inicia o reconhecimento de voz

    reconhecimento.onresult = function(event) { // evento acionado quando o reconhecimento de voz retorna um resultado, capturando o texto reconhecido // oresult é um evento que ocorre quando o reconhecimento de voz retorna um resultado
        inputText.value = event.results[0][0].transcript; // atribui o texto reconhecido ao campo de entrada de texto // transcript é a propriedade que contém o texto reconhecido
        traduzir(); // chama a função traduzir para traduzir o texto reconhecido
    };

  
});



