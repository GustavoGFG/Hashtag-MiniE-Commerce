import { catalogo } from './src/utilidades';
import { renderizarCatalogo } from './src/cartaoProduto';
import {
  inicializarCarrinho,
  adicionarAoCarrinho,
  renderizarProdutosCarrinho,
  atualizarPrecoCarrinho,
} from './src/menuCarrinho';
import { inicializarFiltros } from './src/filtroCatalogo';

renderizarCatalogo(catalogo);
inicializarCarrinho();
renderizarProdutosCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();
