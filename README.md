# ignite-finapi

## Criação de uma API financeira onde é possivel criar conta e realizar movimentação dentro da mesma.

- Requisitos
    - [x]  Deve ser possivel criar uma conta
    - [x]  Deve ser possivel buscar o extrato bancario do cliente
    - [x]  Deve ser possivel realizar deposito
    - [x]  Deve ser possivel realizar saque
    - [x]  Deve ser possivel buscar extrato bancario do cliente por data
    - [x]  Deve ser possivel atualizar dados da conta do cliente
    - [x]  Deve ser possivel obter dados da conta do cliente
    - [x]  Deve ser possivel deletar uma conta
    - [x]  Deve ser possivel buscar o saldo da conta
- Regras de negocio
    - [x]  Não deve ser possivel cadastrar uma conta com CPF ja existente
    - [x]  Não deve ser possivel fazer deposito em uma conta não existente
    - [x]  Não deve ser possivel buscar extrato em uma conta não existente
    - [x]  Não deve ser possivel fazer saque em uma conta não existente
    - [x]  Não deve ser possivel fazer saque quando o saldo for insuficiente
    - [x]  Não deve ser possivel excluir uma conta não existente
    - [x]  Não deve ser possivel deletar uma conta com saldo positivo
