const { Produto } = require('../model/modelosNaoRelacionais');
const { Usuario, Pedido, ItemPedido } = require('../model/modelosRelacionais');

exports.detalhes = async (req, res) => {
  try {
    const produtoId = req.params.id;
    const produto = await Produto.findById(produtoId);

    if (!produto) {
      return res.status(404).send('Produto não encontrado');
    }

    res.render('detalhesProduto', { produto });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).send('Erro ao buscar produto');
  }
};

exports.formularioCompra = async (req, res) => {
  try {
    const produtoId = req.params.id;
    const produto = await Produto.findById(produtoId).select('nome preco estoque');

    if (!produto) {
      return res.status(404).send('Produto não encontrado');
    }

    res.render('compraProduto', { produto });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).send('Erro ao buscar produto');
  }
};

exports.processarCompra = async (req, res) => {
  try {
    const produtoId = req.params.id;
    const quantidade = parseInt(req.body.quantidade);

    const produto = await Produto.findById(produtoId);
    
    if (!produto) {
      return res.status(404).send('Produto não encontrado');
    }

    if (quantidade > produto.estoque) {
      return res.status(400).send('Quantidade solicitada não disponível em estoque');
    }

    const usuario = await Usuario.findOne();
    
    if (!usuario) {
      return res.status(400).send('Nenhum usuário cadastrado. Execute o povoamento do banco de dados.');
    }

    const valorTotal = produto.preco * quantidade;

    const pedido = await Pedido.create({
      status: 'CONCLUIDO',
      valor_total: valorTotal,
      usuario_id: usuario.id
    });

    await ItemPedido.create({
      quantidade: quantidade,
      preco_unitario: produto.preco,
      produto_mongodb_id: produto._id.toString(),
      pedido_id: pedido.id
    });

    produto.estoque -= quantidade;
    await produto.save();

    res.render('confirmacaoCompra', { 
      usuario: usuario.nome,
      produto: produto.nome,
      quantidade: quantidade,
      valorTotal: valorTotal.toFixed(2)
    });
  } catch (error) {
    console.error('Erro ao processar compra:', error);
    res.status(500).send('Erro ao processar compra');
  }
};

exports.dashboard = async (req, res) => {
  try {
    const totalProdutos = await Produto.countDocuments({ estoque: { $gt: 0 } });

    const produtosBaixoEstoque = await Produto.countDocuments({ 
      estoque: { $gt: 0, $lt: 10 } 
    });

    const computadores = await Produto.countDocuments({
      nome: { $regex: /(computador|pc|notebook)/i },
      estoque: { $gt: 0 }
    });

    const dispositivosMoveis = await Produto.countDocuments({
      nome: { $regex: /(celular|iphone|tablet|smartphone)/i },
      estoque: { $gt: 0 }
    });

    const produtos0a100 = await Produto.countDocuments({ 
      preco: { $gte: 0, $lte: 100 },
      estoque: { $gt: 0 }
    });
    const produtos101a1000 = await Produto.countDocuments({ 
      preco: { $gte: 101, $lte: 1000 },
      estoque: { $gt: 0 }
    });
    const produtos1001a5000 = await Produto.countDocuments({ 
      preco: { $gte: 1001, $lte: 5000 },
      estoque: { $gt: 0 }
    });
    const produtosAcima5000 = await Produto.countDocuments({ 
      preco: { $gt: 5000 },
      estoque: { $gt: 0 }
    });

    res.render('dashboardProdutos', {
      totalProdutos,
      produtosBaixoEstoque,
      computadores,
      dispositivosMoveis,
      produtos0a100,
      produtos101a1000,
      produtos1001a5000,
      produtosAcima5000
    });
  } catch (error) {
    console.error('Erro ao gerar dashboard:', error);
    res.status(500).send('Erro ao gerar dashboard');
  }
};
