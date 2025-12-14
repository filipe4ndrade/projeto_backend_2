const { Pedido, ItemPedido, Usuario } = require('../model/modelosRelacionais');

exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      where: {
        status: ['CONCLUIDO', 'CANCELADO', 'SUSPENSO']
      },
      include: [
        {
          model: Usuario,
          attributes: ['nome']
        },
        {
          model: ItemPedido,
          attributes: ['id']
        }
      ],
      order: [['data_criacao', 'DESC']]
    });

    const pedidosFormatados = pedidos.map(pedido => {
      return {
        id: pedido.id,
        data_criacao: new Date(pedido.data_criacao).toLocaleDateString('pt-BR'),
        data_atualizacao: new Date(pedido.data_atualizacao).toLocaleDateString('pt-BR'),
        usuario_nome: pedido.Usuario.nome,
        valor_total: parseFloat(pedido.valor_total).toFixed(2),
        quantidade_produtos: pedido.ItemPedidos.length,
        status: pedido.status
      };
    });

    res.render('gerenciamentoPedidos', { pedidos: pedidosFormatados });
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    res.status(500).send('Erro ao listar pedidos');
  }
};

exports.alterarStatus = async (req, res) => {
  try {
    const pedidoId = req.params.id;
    const novoStatus = req.params.status;

    const statusValidos = ['CONCLUIDO', 'CANCELADO', 'SUSPENSO'];
    if (!statusValidos.includes(novoStatus)) {
      return res.status(400).send('Status inválido');
    }

    await Pedido.update(
      { status: novoStatus },
      { where: { id: pedidoId } }
    );

    res.redirect('/pedido/gerenciar');
  } catch (error) {
    console.error('Erro ao alterar status:', error);
    res.status(500).send('Erro ao alterar status');
  }
};
