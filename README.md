# 10-middlewares-e-cabecalhos-http

**Project overview:**

* O objetivo do projeto era criar uma API que retorna o CEP utilizando Express, Node.js e TypeScript;
* Você pode pesquisar diretamente usando o código do cep ou colocar estado/cidade/logradouro;
* Você pode ver qualquer uma das rotas com 3 tipos possíveis, JSON, XML ou CSV;
* Foi utilizado 2 bibliotecas npm diferentes, uma para conversão de JSON para XML e outra para conversão de JSON para CSV;
* Foi utilizado try e catch para tratativas de possíveis erros;
* Foi feito o uso de middlewares;
* Utilizei 2 headers, content disposition e access-control-allow-origin;
* Quando acessado pelo browser, os itens XML e CSV são baixáveis;
* O retorno da API está totalmente tipado com TypeScript;
* O express foi utilizado para a criação da API;
* O projeto foi separado em 2 arquivos, server.js e routes.js, para fins de organização no código;
* Foi utilizado do axios para requisição da API;
* Foi utilizado o nodemon para facilitar a inicialização do server em node.js;
