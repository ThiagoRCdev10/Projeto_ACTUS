import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        alterar_Login: resolve(__dirname, 'alterar_Login.html'),
        editar_Perfil: resolve(__dirname, 'editar_Perfil.html'),
        esqueceu_Senha: resolve(__dirname, 'esqueceu_Senha.html'),
        insira_Codigo: resolve(__dirname, 'insira_Codigo.html'),
        senha_Nova: resolve(__dirname, 'senha_Nova.html'),
        tela_cadastro: resolve(__dirname, 'tela_cadastro.html'),
        tela_de_Projetos: resolve(__dirname, 'tela_de_Projetos.html'),
        tela_projeto_criacao: resolve(__dirname, 'tela_projeto_criacao.html'),
        tela_projeto_Individual: resolve(__dirname, 'tela_projeto_Individual.html'),
        teste: resolve(__dirname, 'teste.html'),
      }
    }
  }
});

console.log('botao do Caio');