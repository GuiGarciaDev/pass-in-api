<a name="readme-top"></a>

# Pass-in API
</br>

![image](https://github.com/GuiGarciaDev/pass-in-api/assets/121461039/ee4a44b0-8fd7-4536-ae8d-436406563c81)

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#tecnologias">Tecnologias</a></li>
      </ul>
    </li>
    <li><a href="#rodando-o-projeto">Rodando o projeto</a></li>
    <li><a href="#uso">Uso</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Sobre o projeto

Pass in é um sistema de gerenciamento de check in para eventos.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Tecnologias

As tecnologias utilizadas para desenvolver esse projeto são:

#### Backend
* Fastify
* SQLite
* Zod

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Rodando o projeto

Caso você opte por rodar o projeto localmente na sua máquina, siga estas instruções.

Obs: Os websockets estarão disponíveis apenas nesta versão local. Para isso use somente a branch websocketlocal para rodar código.

### Pré-requisitos

Para rodar localmente você vai precisar do Docker para subir os bancos de dados utilizados (Redis e PostgreSQL).
  

### Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/GuiGarciaDev/NLW-Expert-polls.git
   ```
   
2. Selecione a branch websocket e adicione um arquivo .env na root do projeto com as seguintes variáveis
   ```sh
   POSTGRES_PRISMA_URL="postgresql://docker:docker@localhost:5200/polls?schema=public"
   NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000/"
   NEXT_PUBLIC_API_URL="http://localhost:3333/"
   ```

3. Instale as dependencias
   ```sh
   npm install
   ```
   
4. Rode os containers do docker
   ```sh
   docker compose up
   ```

5. Suba as migrations para o banco de dados
    ```sh
   npx prisma migrate dev
   ```

6. E finalmente, rode o projeto com
   ```sh
   npm run dev
   ```

   

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## API

Vamos entender um pouco sobre essa simples API.

### Criar enquete

#### Requisição

<mark>POST /polls</mark>

#### Resposta

```
{
  title: "título da enquete",
  options ["Array com as opções"]
}
```

Onde

* title é uma string e representa o título da enquete.
* options é um array de strings e cada elemento é uma opção de voto. (máx 5 opções)

### Enquete

#### Requisição

<mark>GET /polls/:pollId</mark>

#### Resposta

```
{
  poll: {
    id: "uuid",
    title: "título",
    options: ["opção1", "opção2", "opção3",]
  }
}
```
Onde

* id e [:pollId] são o id de identificação único de cada enquete no formato de um uuid.

### Votar em uma enquete

#### Requisição

<mark>POST /polls/:pollId/votes</mark>

```
{
    "pollOptionId": "eef760bc-6491-48a9-9677-f077d9a5f862"
}
```

Onde 

* pollOptionId é a id única da opção que você votou.

#### Resposta

Vai responder uma mensagem de erro ou ok.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Uso

### Crie enquetes

![image](https://github.com/GuiGarciaDev/NLW-Expert-polls/assets/121461039/799def54-b0d6-461b-85bc-7ac70799af63)

### Compartilhe com quem quiser

![image](https://github.com/GuiGarciaDev/NLW-Expert-polls/assets/121461039/2fca5880-e5b3-475a-891b-f56a7f22117d)

### Vote na melhor opção

![image](https://github.com/GuiGarciaDev/NLW-Expert-polls/assets/121461039/a97aa40e-bb80-4519-89c2-38972a5aae5b)


### Acompanhe o resultado

![image](https://github.com/GuiGarciaDev/NLW-Expert-polls/assets/121461039/66e366fc-b4ca-4ca3-a9df-21681331bf83)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contato

Guilherme - [@GuiGarciaDev](https://twitter.com/GuiGarciaDev) - [GuiGarciaDev](https://linkedin.com/in/GuiGarciaDev) - guilherme.garcia1136@gmail.com

Project Link: [https://github.com/GuiGarciaDev/NLW-Expert-polls](https://github.com/GuiGarciaDev/NLW-Expert-polls)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
