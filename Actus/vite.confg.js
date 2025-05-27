import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(dirname, 'index.html'),
        alterar_Login: resolve(dirname, 'alterar_Login.html'),
        editar_Perfil: resolve(dirname, 'editar_Perfil.html'),
        esqueceu_Senha: resolve(dirname, 'esqueceu_Senha.html'),
        insira_Codigo: resolve(dirname, 'insira_Codigo.html'),
        senha_Nova: resolve(dirname, 'senha_Nova.html'),
        tela_cadastro: resolve(dirname, 'tela_cadastro.html'),
        tela_de_Projetos: resolve(dirname, 'tela_de_Projetos.html'),
        tela_projeto_criacao: resolve(dirname, 'tela_projeto_criacao.html'),
        tela_projeto_Individual: resolve(dirname, 'tela_projeto_Individual.html'),
        teste: resolve(__dirname, 'teste.html'),
      }
    }
  }
});