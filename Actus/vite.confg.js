import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        alterar_Login: 'alterar_Login.html',
        editar_Perfil: 'editar_Perfil.html',
        esqueceu_Senha: 'esqueceu_Senha.html',
        insira_Codigo: 'insira_Codigo.html',
        senha_Nova: 'senha_Nova.html',
        tela_cadastro: 'tela_cadastro.html',
        tela_de_Projetos: 'tela_de_Projetos.html',
        tela_projeto_criacao: 'tela_projeto_criacao.html',
        tela_projeto_Individual: 'tela_projeto_Individual.html',
        teste: 'teste.html'
      }
    }
  }
})