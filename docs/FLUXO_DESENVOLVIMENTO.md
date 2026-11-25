# Fluxo de desenvolvimento

Este documento define como qualquer alteração chega a produção, seja feita por uma pessoa ou pelo Claude Code.

## Branches

| Branch | Função |
|---|---|
| `main` | Produção. Só recebe pull requests vindos de `develop`. Cada merge publica o site. |
| `develop` | Integração. Todas as features e correções entram aqui por pull request. |
| `feature/<nº-issue>-<descricao>` | Uma funcionalidade nova, criada a partir de `develop`. |
| `bugfix/<nº-issue>-<descricao>` | A correção de um bug, criada a partir de `develop`. |

A descrição vai em minúsculas e com hífens. Exemplos: `feature/12-reservas-online`, `bugfix/15-menu-mobile`.

## Passos

```
Tarefa → Plano → Revisão do plano → Issue → Branch → Desenvolvimento
→ Revisão do código → Testes → Commit e push → Validação local → PR para develop
```

### 1. Tarefa dada pelo utilizador
O utilizador descreve o que quer. Se houver ambiguidades, esclarecem-se antes de avançar.

### 2. Plano
Escreve-se um plano com:
- os ficheiros a alterar;
- a abordagem;
- os riscos;
- a forma de testar.

### 3. Revisão do plano
O utilizador revê o plano e aprova-o, ou pede alterações. **Nada é implementado sem o plano estar aprovado.**

### 4. Criação da issue (work item ou bug)
Cria-se uma issue no GitHub com o resumo do plano aprovado:

```bash
gh issue create --title "<título>" --body "<descrição e plano>" --label enhancement   # feature
gh issue create --title "<título>" --body "<descrição e passos para reproduzir>" --label bug   # bug
```

Toma-se nota do número da issue (`#N`).

### 5. Branch filha de develop
A branch tem o nome da feature e o número da issue:

```bash
git checkout develop
git pull
git checkout -b feature/<N>-<descricao>   # ou bugfix/<N>-<descricao>
```

### 6. Desenvolvimento da feature
Implementa-se o que foi aprovado no plano, sem alterações fora desse âmbito. Se aparecer trabalho extra, cria-se outra issue para ele.

### 7. Revisão do código
Revê-se o diff completo (`git diff develop...`) à procura de:
- bugs;
- código morto;
- traduções em falta nos 5 idiomas;
- regressões.

### 8. Testes ao código
O projeto não tem testes automáticos. Antes de avançar, tudo isto tem de passar:

```bash
npm run lint
npm run build
```

Depois testa-se manualmente, no browser, o que foi alterado, incluindo:
- a mudança de idioma;
- a vista mobile;
- as rotas `/` e `/ementa`.

### 9. Commit e push para a branch
As mensagens de commit são claras e referem a issue:

```bash
git add <ficheiros>
git commit -m "Adiciona formulário de reservas (#N)"
git push -u origin feature/<N>-<descricao>
```

O push corre a CI (lint + build) na branch.

Os commits ficam sempre em nome do autor do repositório (José Pedro Pina). Não se adicionam linhas `Co-Authored-By` nem outra atribuição ao Claude, nem nos commits nem nos PRs.

### 10. Correr localmente para validação do utilizador
Arranca-se o servidor na branch para o utilizador validar as alterações:

```bash
npm run dev
```

O site fica em http://localhost:5173. **Espera-se pela aprovação explícita do utilizador antes de abrir o PR.**

### 11. Pull request para develop

```bash
gh pr create --base develop --title "<título>" --body "Closes #N

<resumo das alterações e como testar>"
```

O PR só é merged com a CI verde. O `Closes #N` fecha a issue no merge.

## Release para produção

Quando `develop` tem alterações prontas para publicar:

```bash
gh pr create --base main --head develop --title "Release: <resumo>"
```

Quando esse PR é merged, o workflow [`deploy.yml`](../.github/workflows/deploy.yml) faz o build e publica em https://josepedropina1803.github.io/restaurante_website/.

## Comparar main e develop com Docker

Para ver lado a lado o que está em produção e o que está em desenvolvimento, há dois containers locais. Precisam do Docker Desktop a correr.

```bash
docker compose up -d --build   # constrói e arranca os dois
docker compose down            # pára e remove
```

| Container | Branch | Endereço |
|---|---|---|
| `prod` | `main` | http://localhost:8090 |
| `develop` | `develop` | http://localhost:8091 |

Cada imagem vai buscar o código da sua branch ao GitHub ([`docker/Dockerfile`](../docker/Dockerfile)). Por isso mostra o que já tem push, não as alterações locais. Para atualizar depois de um merge, corre outra vez `docker compose up -d --build`.

Isto não é um deploy, só corre no teu computador. Para validar uma feature (passo 10), continua a usar `npm run dev`.

## CI/CD

O projeto é só frontend e o único deploy é o GitHub Pages.

| Workflow | Quando corre | O que faz |
|---|---|---|
| [`ci.yml`](../.github/workflows/ci.yml) | Push para `develop`, `feature/**` ou `bugfix/**`; PR para `develop` ou `main` | `npm ci`, lint e build |
| [`deploy.yml`](../.github/workflows/deploy.yml) | Push para `main` vindo do merge de um PR de `develop` (verificado pelo job `check`), ou execução manual | Build com `BASE_PATH=/restaurante_website/` e publicação no GitHub Pages |
