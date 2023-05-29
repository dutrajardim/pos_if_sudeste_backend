# Primeira atividade

Instruções:
 
1. Assista ao vídeo-tutorial fornecido para obter uma compreensão geral das tecnologias e conceitos apresentados.
2. Crie um repositório no GitHub para armazenar o código-fonte do seu projeto.
3. Desenvolva uma aplicação básica de Back-End utilizando as tecnologias apresentadas no vídeo-tutorial.
4. Grave um áudio de 3 a 5 minutos ou um vídeo de 5 a 10 minutos explicando o seu projeto. Nesse áudio/vídeo, explique em detalhes o código-fonte criado, as dificuldades encontradas, eventuais alterações feitas em relação ao conteúdo do vídeo e a importância do Back-End no contexto Web.

## Resolução

Foi criado uma aplicação que atende requisições GET para os caminhos '/', '/json' e '/html'. A aplicação implementa os modulos *http* e *url* para criar um servidor, e mapear as requisições para a função de definição das respostas.

Basicamente, é retornado uma lista de endereços eletrônicos de aplicação relacionadas com o JavaScript. Para o caminho '/json' a lista é retornada no formato de JavaScript Object Notation. Para o caminho '/html' é retornado um arquivo html estruturando a lista em uma tabela. E para os demais caminhos requisitados é retornada a lista em texto plano. 

