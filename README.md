# Dubai em Essence — Loja Virtual de Perfumes Árabes

Projeto desenvolvido em Next.js, React, TypeScript, Tailwind CSS, Prisma ORM e estrutura preparada para PostgreSQL.

## Funcionalidades entregues

- Home premium luxuosa clássica em bege claro e dourado.
- Catálogo de perfumes árabes.
- Página individual de produto com galeria de 3 imagens editoriais ilustrativas, zoom, preço, Pix, parcelamento, estoque, frete, descrição, pirâmide olfativa, família, fixação, projeção, ocasiões, relacionados, semelhantes e avaliações.
- Compra pelo WhatsApp com mensagem automática:
  `Olá! Vim pelo site da Dubai em Essence e tenho interesse no perfume: [NOME DO PERFUME]`
- Carrinho com finalização por WhatsApp.
- Páginas: Home, Loja, Produto, Marcas, Carrinho, Checkout, Login, Cadastro, Minha Conta, Pedidos, Favoritos, Contato, Sobre, FAQ, Política de Privacidade, Política de Troca, Termos de Uso e 404 personalizada.
- Logo e favicon configurados com a imagem fornecida.
- Schema Prisma preparado para PostgreSQL.

## Observação sobre imagens

As imagens dos cards são editoriais/ilustrativas geradas em CSS para evitar cópia indevida de fotos proprietárias de lojas concorrentes. Elas podem ser substituídas depois por fotos reais aprovadas pela Dubai em Essence, imagens próprias, fotos de fornecedores ou arquivos enviados por você.

## Como rodar

```bash
npm install
npm run dev
```

A aplicação roda em `http://localhost:3000`.

## Banco de dados

Configure a variável de ambiente:

```env
DATABASE_URL="postgresql://usuario:senha@host:5432/dubai_essence"
```

Depois rode:

```bash
npx prisma generate
npx prisma db push
```
