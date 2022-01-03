## Cadastro do carro
**RF**

- Deve ser possivel cadastrar um carro
- Deve ser possivel listar todas as categorias


**RN**

- não deve ser possivel cadastrar um carro com uma placa já existente
- não deve ser possivel alterar  a placa de um carro já cadastrado 
- cadastro com disponibilidade true
- Só adimims podem cadastrar um carro
****



## Listagem de Carros
**RF**

- Deve ser possivel listar os carros disponiveis
- Deve ser possivel listar os carros disponiveis pela categoria
- Deve ser possivel listar os carros disponiveis pela marca
- Deve ser possivel listar os carros disponiveis pelo nome do carro


**RN**

- O usuario não precisa estar logado para poder listar os carros disponiveis
****

## Cadastro de especificação do carro
**RF**

- Deve ser possivel cadastrar uma especificação 
- Deve ser possivel listar todas as especificações
- Deve ser possivel listar todos os carros

**RN**

- Não deve ser possivel criar uma especificação para um carro não existente
- Não deve ser possivel cadastrar uma especificação igual para o mesmo carro
- Só admins criam especificações

****

## Cadastro de Imagem do Carro

**RF**

- Deve ser possivel cadastrar a imagem do carro
- Deve ser possivel listar todos os carros
 
**RN**

- Deve ser possivel o usuario cadastrar mais de uma foto para o mesmo carro
- O usuario deve ser um admim para poder fazer o cadastro da imagem

****
## Aluguel de Carro

**RF**

- Deve ser possivel cadastrar um aluguel

**RN**

- Aluguel com duaração minima de 24hr
- Não deve ser possivel abrir mais de um aluguel para o mesmo usuario
- 