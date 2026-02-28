Feature: Compra de produtos no General Store
  Como usuário do aplicativo General Store
  Quero buscar um produto e adicioná-lo ao carrinho
  Para garantir que o nome e o preço se mantêm consistentes em todas as telas

  Background:
    Given o aplicativo General Store está aberto

  Scenario Outline: Validar nome e preço do produto na lista e no carrinho
    Given preencho o formulário inicial com nome "<nome>", país "<pais>" e gênero "<genero>"
    And avanco para a lista de produtos
    When estou na lista de produtos
    Then o primeiro produto "<nomeProduto>" deve estar visivel na lista
    And o preço dele deve ser "<preco>" na lista
    When adiciono o produto "<nomeProduto>" ao carrinho
    Then o total do carrinho deve ser "<totalCarrinho>"
    When avanco na lista de produtos
    Then o segundo produto "<nomeProduto2>" deve estar visivel na lista
    And o preco dele deve ser "<preco2>" na lista tambem
    When adiciono o segundo produto "<nomeProduto2>" ao carrinho
    Then o total do carrinho deve ser atualizado para "<totalCarrinho2>"
    When avanço para o carrinho
    Then deve aparecer o produto "<nomeProduto>" com o preco "<preco>" no carrinho
    And deve aparecer o outro produto "<nomeProduto2>" com o preco "<preco2>" no carrinho
    And o valor total do carrinho deve ser "<totalCompra>"

    Examples:
    |nome      | pais   | genero   | nomeProduto       | preco  | nomeProduto2      | preco2   | totalCarrinho | totalCarrinho2   | totalCompra |
    |QA Tester | Brazil | female   | Converse All Star | $55.0  | Jordan Lift Off   | $115.0   |  1            | 2                | $ 170.0      |
