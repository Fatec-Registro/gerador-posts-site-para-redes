# Gerador de Posts - Fatec Registro

Ferramenta web completa e responsiva para criar artes padronizadas para as redes sociais (Instagram Stories e Feed) da Fatec Registro. O projeto segue rigorosamente o **Manual de Identidade Visual do Centro Paula Souza (CPS)** e oferece recursos avançados de edição diretamente no navegador.

## 🚀 Funcionalidades

### 🎨 Formatos e Layouts
* **Formatos:**
    * 📱 **Stories (9:16):** Otimizado para tela cheia, com espaço dedicado para Stickers de link.
    * 🖼️ **Feed (4:5):** Formato vertical ideal para a timeline do Instagram/Facebook.
* **Estilos Visuais:**
    * **Padrão:** Foto no topo, título e informações em fundo branco.
    * **Imersivo:** Foto preenchendo todo o card com degradê e texto sobreposto (ideal para fotos de impacto).
    * **Minimalista:** Foco total na tipografia com uma faixa de imagem menor.

### 🛠️ Ferramentas de Edição Avançadas
* **Controle Total da Imagem:**
    * **Drag & Drop:** Clique e arraste a foto diretamente no preview para posicionar.
    * **Zoom & Ajuste Fino:** Sliders e inputs numéricos para controle preciso.
    * **Filtros de Imagem:** Ajuste de **Brilho** e **Contraste** para corrigir fotos escuras ou lavadas.
    * **Overlay:** Controle deslizante para escurecer a imagem e melhorar a leitura do texto.
* **Conteúdo Dinâmico:**
    * Edição de Título com contador de caracteres e aviso visual de limite.
    * **Seletor de Tags:** Categorias como Notícias, Vestibular, Eventos, Atlética, etc.
    * Inserção opcional de Data.
    * Controle numérico e deslizante para o tamanho da fonte.
* **Personalização:**
    * **Cor de Destaque:** Escolha entre as cores oficiais do manual ou use o seletor de cor livre.
    * **Etiqueta de Curso (Chip):** Adicione uma etiqueta visual para cursos específicos (DSM, GESTÃO).

### ⚙️ Recursos de Produtividade e UX
* **Histórico (Undo/Redo):** Botões para desfazer e refazer alterações, permitindo experimentar sem medo.
* **Reset:** Botão para voltar todas as configurações ao padrão inicial.
* **Responsividade:** Interface adaptável para celulares (Menu Drawer) e controles de zoom para visualização em telas pequenas.
* **Zona Segura (Safe Zone):** Overlay que mostra onde ficam os elementos da interface do Instagram para evitar cortes de texto.
* **Persistência de Dados:** O navegador salva automaticamente seu trabalho.
* **Exportação Flexível:**
    * Escolha o formato (**PNG** ou **JPG**).
    * Escolha a qualidade/escala (**1x**, **2x Retina**, **3x Ultra**).
    * Botões para **Baixar** ou **Copiar** para a área de transferência.

## 💻 Tecnologias Utilizadas

* **HTML5** (Semântico e Acessível)
* **CSS3** (Variáveis CSS, Flexbox, Grid, Media Queries)
* **JavaScript** (Vanilla ES6+, Modularizado)
* **[html2canvas](https://html2canvas.hertzen.com/):** Renderização do DOM como imagem.
* **Fonte:** [Montserrat](https://fonts.google.com/specimen/Montserrat) (Google Fonts).
* **Ícones:** Google Material Icons.

## 📂 Estrutura do Projeto

```text
/
├── index.html    # Estrutura da interface e painel de controle
├── style.css     # Estilos, regras de layout, responsividade e animações
├── app.js        # Lógica da aplicação (Estado, Histórico, Manipulação, Exportação)
└── img/          # Logos e assets institucionais
    ├── fatec_registro.png
    ├── logo_cps_versao_cor.png
    └── logo-gov-sp-pb-com-vermelho.png
    └── ...

## 🚀 Como Usar

1.  **Preparação:**
    * Baixe os arquivos do projeto.
    * Certifique-se de que a pasta `img/` contém os logotipos necessários (`fatec_registro.png`, `logo_cps_versao_cor.png`, etc).

2.  **Execução:**
    * Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge). Não é necessário servidor, funciona localmente.

3.  **Configuração do Post:**
    * No painel esquerdo, escolha o **Formato** (Stories ou Feed).
    * Escolha o **Estilo Visual** (Padrão, Imersivo ou Minimalista).
    * Selecione a **Cor de Destaque** desejada.

4.  **Conteúdo:**
    * Selecione a **Tag** (ex: Notícias, Vestibular).
    * (Opcional) Insira a **Data**.
    * Digite o **Título** da matéria. Ajuste o tamanho da fonte se necessário.
    * (Opcional) Ative a **Etiqueta de Curso** se a notícia for específica de DSM ou Gestão.

5.  **Imagem:**
    * Faça o upload da imagem de capa (Prints do site ou fotos em 16:9 funcionam melhor).
    * Use os controles de **Zoom** e **Posição (X/Y)** para enquadrar o rosto ou o ponto de interesse.

6.  **Finalização:**
    * Ative a **Zona Segura** momentaneamente para garantir que nenhum texto será cortado pela interface do Instagram.
    * Clique em **"Baixar PNG"** para salvar o arquivo ou **"Copiar Imagem"** para colar diretamente no WhatsApp/Telegram.

## ⚠️ Notas sobre a Identidade Visual

Este projeto foi desenvolvido com base no **Manual de Identidade Visual do CPS (Março/2024)**.
* **Cores Principais:** Vermelho (#B20000) e Cinza (#595959).
* **Tipografia:** A fonte Montserrat é utilizada como alternativa moderna e legível para meios digitais.
* **Logos:** A disposição dos logotipos no rodapé segue a régua de parceiros estipulada pelo Governo do Estado de SP.

---
Desenvolvido para a **Fatec Registro**.