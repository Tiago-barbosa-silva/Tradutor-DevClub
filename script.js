let inputText = document.querySelector('.input-texto');
let traducao = document.querySelector('.traducao');
let idiomas = document.querySelector('.idiomas'); 
let mic = document.querySelector('.mic');
let endereco = ""; // variável para armazenar a URL da API de tradução 
async function traduzir() { // função assíncrona q traduz o texto ao ser chamada
  

   if(inputText.value === "") {
        traducao.textContent = "Nenhum texto foi traduzido. Por favor, insira um texto válido.";
        return; // sai da função se o campo de entrada estiver vazio
   }


  await idiomaSelecionado(); // aguarda a conclusão da função idiomaSelecionado antes de prosseguir
    



function idiomaSelecionado() { // função para determinar o idioma selecionado e construir a URL da API de tradução

    let idioma = idiomas.value; // obtém o valor selecionado no menu suspenso de idiomas

   if(idioma === "espanhol") {
    endereco = "https://api.mymemory.translated.net/get?q=" // URL da API de tradução
    + inputText.value // texto a ser traduzido
    + "&langpair=pt-BR|es"; // par de idiomas: de português para espanhol

   }else if(idioma === "inglês") {

    endereco = "https://api.mymemory.translated.net/get?q=" // URL da API de tradução
    + inputText.value // texto a ser traduzido
    + "&langpair=pt-BR|en"; // par de idiomas: de português para inglês

   }else if(idioma === "francês") {

    endereco = "https://api.mymemory.translated.net/get?q=" // URL da API de tradução
    + inputText.value // texto a ser traduzido
    + "&langpair=pt-BR|fr"; // par de idiomas: de português para francês

   }else if(idioma === "italiano") {
    endereco = "https://api.mymemory.translated.net/get?q=" // URL da API de tradução
    + inputText.value // texto a ser traduzido
    + "&langpair=pt-BR|it"; // par de idiomas: de português para italiano

   }else if(idioma === "alemão") {
    endereco = "https://api.mymemory.translated.net/get?q=" // URL da API de tradução
    + inputText.value // texto a ser traduzido
    + "&langpair=pt-BR|de"; // par de idiomas: de português para alemão
   }
   else if(idioma === "português") {
    endereco = "https://api.mymemory.translated.net/get?q=" // URL da API de tradução
    + inputText.value // texto a ser traduzido
    + "&langpair=en|pt-BR"; // par de idiomas: de inglês para português
   }


}



   let resposta = await fetch(endereco); // aguarda a resposta da API antes de prosseguir
    let dados = await resposta.json(); // converte a resposta em JSON e aguarda a conclusão

 

   traducao.textContent = dados.responseData.translatedText; // exibe o texto traduzido na área designada da página

  

};

mic.addEventListener('click', () => {
    let reconhecimento = new webkitSpeechRecognition(); // cria uma nova instância do reconhecimento de voz; // webkitSpeechRecognition é uma API de reconhecimento de voz do navegador
    reconhecimento.lang = "pt-BR"; // define o idioma para português do Brasil // lang é uma propriedade do objeto reconhecimento que define o idioma do reconhecimento de voz
    reconhecimento.start(); // inicia o reconhecimento de voz

    reconhecimento.onresult = function(event) { // evento acionado quando o reconhecimento de voz retorna um resultado, capturando o texto reconhecido // oresult é um evento que ocorre quando o reconhecimento de voz retorna um resultado
        inputText.value = event.results[0][0].transcript; // atribui o texto reconhecido ao campo de entrada de texto // transcript é a propriedade que contém o texto reconhecido
        traduzir(); // chama a função traduzir para traduzir o texto reconhecido
    };

  
});



