# Desafio Node com Nginx

Criei uma rotina para a criação da tabela no banco de dados, caso ela não exista

Utilizei o faker-br para criar nomes aleatórios

Fiz a gravação no banco em cada chamada da rota raiz para não precisar resetar os containeres

## Correção

Build do app faz o npm install

Compartilhada a pasta src do node em um volume para o container não sobrescrever o node_modules