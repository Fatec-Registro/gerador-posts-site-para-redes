# Gerador de Posts - Fatec Registro

Ferramenta web desenvolvida para padronizar e agilizar a criação de artes para redes sociais (Instagram Stories e Feed) da Fatec Registro. O projeto permite gerar imagens profissionais para divulgação de notícias, eventos e comunicados, seguindo rigorosamente o **Manual de Identidade Visual do Centro Paula Souza (CPS)**.

## 🚀 Funcionalidades

### 🎨 Formatos e Layouts
* **Formatos:**
    * 📱 **Stories (9:16):** Otimizado para tela cheia, com espaço dedicado para Stickers de link.
    * 🖼️ **Feed (4:5):** Formato vertical ideal para a timeline do Instagram/Facebook.
* **Estilos Visuais:**
    * **Padrão:** Foto no topo, título e informações em fundo branco.
    * **Imersivo:** Foto preenchendo todo o card com degradê e texto sobreposto (ideal para fotos de impacto).
    * **Minimalista:** Foco total na tipografia com uma faixa de imagem menor.

### 🛠️ Ferramentas de Edição
* **Controle Total da Imagem:**
    * Upload de imagem de capa (suporta formato 16:9 sem distorção).
    * **Pan & Zoom:** Ajuste a posição (X/Y) e o Zoom da foto para o enquadramento perfeito.
    * **Overlay:** Controle deslizante para escurecer a imagem e melhorar a leitura do texto.
* **Conteúdo Dinâmico:**
    * Edição de Título com contador de caracteres.
    * Seletor de Tags (Notícias, Vestibular, Eventos, Atlética, etc.).
    * Inserção opcional de Data.
    * Controle numérico e deslizante para tamanho da fonte.
* **Etiqueta de Curso (Chip):**
    * Adicione uma etiqueta visual (Chip) para indicar o curso relacionado (ex: DSM, GESTÃO).
    * Posicionamento inteligente (ajusta-se automaticamente no modo Imersivo).

### ⚙️ Recursos Extras
* **Zona Segura (Safe Zone):** Overlay opcional que mostra onde ficam os elementos da interface do Instagram (perfil, reações) para evitar cortes de texto.
* **Persistência de Dados:** O navegador salva automaticamente suas configurações (cores, textos, posições) para você não perder nada se fechar a aba.
* **Cores Oficiais:** Seletor de cores baseado na paleta oficial do CPS.
* **Exportação:**
    * 💾 Baixar como PNG em alta resolução (escala 2x para telas Retina).
    * 📋 Botão "Copiar Imagem" para colar direto no WhatsApp ou Web.

## 💻 Tecnologias Utilizadas

* **HTML5** (Semântico)
* **CSS3** (Variáveis CSS, Flexbox, Responsividade)
* **JavaScript** (Vanilla ES6+)
* **[html2canvas](https://html2canvas.hertzen.com/):** Biblioteca para renderizar o DOM como imagem.
* **Fonte:** [Montserrat](https://fonts.google.com/specimen/Montserrat) (Google Fonts).

## 📂 Estrutura do Projeto

```text
/
├── index.html    # Estrutura da interface e painel de controle
├── style.css     # Estilos, regras de layout e identidade visual
├── app.js        # Lógica de manipulação, canvas e persistência
└── img/          # Logos e assets
    ├── fatec_registro.png
    ├── logo_cps_versao_cor.png
    └── logo-gov-sp-pb-com-vermelho.png
```

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