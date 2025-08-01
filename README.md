# Projeto ArbitroCN

## Endpoints da API REST

### Jogos
- **GET** `/jogos` — Lista todos os jogos
- **GET** `/jogos/:id` — Busca um jogo específico
- **POST** `/jogos` — Cria um novo jogo
- **PUT** `/jogos/:id` — Atualiza um jogo existente
- **DELETE** `/jogos/:id` — Remove um jogo

#### Gerenciar Árbitros em Jogos //testado
- **PUT** `/jogos/:id/arbitros` — Atualiza a lista de árbitros de um jogo (envie um array de IDs de árbitros no corpo da requisição)
- **DELETE** `/jogos/:id/arbitros/:arbitroId` — Remove um árbitro específico do jogo

---

### Competições
- **GET** `/competicoes` — Lista todas as competições
- **GET** `/competicoes/:id` — Busca uma competição específica
- **POST** `/competicoes` — Cria uma nova competição
- **PUT** `/competicoes/:id` — Atualiza uma competição existente
- **DELETE** `/competicoes/:id` — Remove uma competição

#### Gerenciar Árbitros em Competições
- **PUT** `/competicoes/:id/arbitros` — Atualiza a lista de árbitros de uma competição
- **DELETE** `/competicoes/:id/arbitros/:arbitroId` — Remove um árbitro específico da competição

#### Gerenciar Equipes em Competições
- **PUT** `/competicoes/:id/equipes` — Atualiza a lista de equipes de uma competição (envie um array de IDs de equipes no corpo da requisição)
- **POST** `/competicoes/:id/equipes` — Adiciona equipes a uma competição (envie um array de IDs de equipes no corpo da requisição)
- **DELETE** `/competicoes/:id/equipes/:equipeId` — Remove uma equipe específica da competição

---

### Árbitros
- **GET** `/arbitros` — Lista todos os árbitros
- **GET** `/arbitros/:id` — Busca um árbitro específico
- **POST** `/arbitros` — Cria um novo árbitro
- **PUT** `/arbitros/:id` — Atualiza um árbitro existente
- **DELETE** `/arbitros/:id` — Remove um árbitro

---

### Equipes
- **GET** `/equipes` — Lista todas as equipes
- **GET** `/equipes/:id` — Busca uma equipe específica
- **POST** `/equipes` — Cria uma nova equipe
- **PUT** `/equipes/:id` — Atualiza uma equipe existente
- **DELETE** `/equipes/:id` — Remove uma equipe

#### Gerenciar Atletas em Equipes
- **PUT** `/equipes/:id/atletas` — Atualiza a lista de atletas de uma equipe (envie um array de IDs de atletas no corpo da requisição)
- **DELETE** `/equipes/:id/atletas/:atletaId` — Remove um atleta específico da equipe

---

### Atletas
- **GET** `/atletas` — Lista todos os atletas
- **GET** `/atletas/:id` — Busca um atleta específico
- **POST** `/atletas` — Cria um novo atleta
- **PUT** `/atletas/:id` — Atualiza um atleta existente
- **DELETE** `/atletas/:id` — Remove