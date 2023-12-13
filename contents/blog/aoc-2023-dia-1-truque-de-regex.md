---
title: "[AoC 2023] Dia 1: Vencendo com Lookaround \U0001F440"
date: '2023-12-02T05:10:14.272Z'
published: true
description: "Ontem se iniciou mais um Advent of Code e dessa vez farei meu melhor para durar mais do que dois dias \U0001F64F.\n\nO enunciado do primeiro desafio pode ser lido aqui: https://adventofcode.com/2023/day/1\n"
tags:
  - "\U0001F1E7\U0001F1F7"
  - Python
  - Advent of Code
---

# \[AoC 2023] Dia 1: Vencendo com Lookaround 👀

Ontem se iniciou mais um [Advent of Code](https://adventofcode.com/ "Advent of Code") e dessa vez farei meu melhor para durar mais do que dois dias 🙏

O enunciado do primeiro desafio pode ser lido aqui: [https://adventofcode.com/2023/day/1](https://adventofcode.com/2023/day/1 "")

## Primeiro desafio

Tranquilinho.

```python
import sys

calibration_values = []
for line in sys.stdin:
    digits = [c for c in line if c.isdigit()]
    # Se for apenas um dígito, digits[-1] equivale à digits[0]
    value = 10 * int(digits[0]) + int(digits[-1])
    calibration_values.append(value)

print(sum(calibration_values))
```

## Segundo desafio

Para contemplar dígitos por extenso além de dígitos numéricos, pensei em usar uma expressão regular.

`/(\d|one|two|three|four|five|six|seven|eight|nine)/g`

Parece simples, mas falha para o seguinte caso de teste.

`oneight`

A resposta é `18` (one, eight), mas a expressão só encontra `one` , pois quando um padrão é encontrado a busca continua na posição onde parou (nesse caso seria na letra `i`).

Para encontrar grupos sem "avançar" a posição podemos usar o *lookaround*, que verifica (literalmente *look* *around* – olha ao redor) um determinado padrão antes de realizar um casamento. Nesse cenário em específico, podemos usar um *positive lookahead* que se encarrega de verificar os próximos caracteres à frente. A sintaxe é `/(?=(padrão que vai ser olhado))/g`

Logo, para consertar a expressão regular do desafio basta adicionar o *positive lookahead* e voilà.

`/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g`

Se não estiver muito claro, sugiro brincar um pouco no [regex101](https://regex101.com/ "") e verificar os tutoriais na seção de referências, lá em baixo.

Solução completa:

```python
import sys
import re

word_to_digit = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5, 
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
}

def to_numeric_digit(s):
    if s.isdigit():
        return int(s)
    else:
        return word_to_digit[s]

valid_digits = [str(i) for i in range(10)] + list(word_to_digit.keys())

calibration_values = []
for line in sys.stdin:
    pattern = r"(?=(\d|one|two|three|four|five|six|seven|eight|nine))"
    groups = re.findall(pattern, line)
    if groups:
        first_digit = to_numeric_digit(groups[0])
        last_digit = to_numeric_digit(groups[-1])
        value = 10 * first_digit + last_digit
        print(groups)
        print(value)
        calibration_values.append(value)

print(sum(calibration_values))
```

## Pós-resolução

Um querido do Twitter resolveu da seguinte forma.

![Usuário Arnav Gupta (@championswimmer) demonstra sua solução no Twitter. A descrição do Tweet diz "Shittiest of hacks 😂😂😂" e tem uma imagem de uma parte de seu código. Todas as linhas consistem da utilização de uma função de "replace" trocando "one" por "o1ne", "two" por "t2wo" e assim por diante.](/7eda46096039ba5c4498c3ec1fa7f0528e4d67ba719e9dd0c44da3b64078f140.png "Engenheiro sênior mais fraco.")

Achei criativo e vi que outras pessoas fizeram da mesma forma. Justo, você pode usar um replace mas não pode simplesmente transformar "one" em 1, já que quebraria o mesmo caso de exemplo que citei antes. "oneight" viraria "1ight" ao invés de "18".

O que me surpreendeu é que o pessoal teve o trabalho de pensar em qual parte da string eles poderiam inserir o dígito de forma que o código funcionasse ao invés de simplesmente duplicar a string. "one" vira "one1one", "two" vira "two2two", etc...

## Referências

* Explicação leve sobre *lookaround*: [How to do overlapping matches with regular expressions](https://mtsknn.fi/blog/how-to-do-overlapping-matches-with-regular-expressions/#:~:text=Turns%20out%20that%20when%20the,capture%20overlapping%20pairs%20of%20letters. "")
* Explicação pesada sobre *lookaround*: [Mastering Lookahead and Lookbehind](https://www.rexegg.com/regex-lookarounds.html "")
* Tweet do malandro: [https://twitter.com/championswimmer/status/1730667285415948767](https://twitter.com/championswimmer/status/1730667285415948767 "")
