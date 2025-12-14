const { Usuario } = require('../model/modelosRelacionais');
const { Produto } = require('../model/modelosNaoRelacionais');

exports.index = async (req, res) => {
  try {
    const produtos = await Produto.find({ estoque: { $gt: 0 } })
      .select('nome preco estoque')
      .limit(8);

    res.render('index', { produtos });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.render('index', { produtos: [] });
  }
};

exports.povoarBanco = async (req, res) => {
  try {
    await Produto.deleteMany({});
    console.log('Produtos removidos do MongoDB');

    const usuarios = [
      { nome: 'João Silva', email: 'joao@email.com', senha: 'senha123' },
      { nome: 'Maria Santos', email: 'maria@email.com', senha: 'senha456' },
      { nome: 'Pedro Oliveira', email: 'pedro@email.com', senha: 'senha789' }
    ];

    for (const usuarioData of usuarios) {
      await Usuario.findOrCreate({
        where: { email: usuarioData.email },
        defaults: usuarioData
      });
    }
    console.log('Usuários criados/verificados');

    const produtos = [
      {
        nome: 'Notebook Dell Inspiron',
        preco: 3500.00,
        estoque: 15,
        detalhes: {
          processador: 'Intel Core i5',
          memoria: '8GB RAM',
          armazenamento: '256GB SSD',
          tela: '15.6 polegadas'
        }
      },
      {
        nome: 'PC Gamer AMD',
        preco: 4500.00,
        estoque: 8,
        detalhes: {
          processador: 'AMD Ryzen 5',
          memoria: '16GB RAM',
          armazenamento: '512GB SSD',
          placaVideo: 'GTX 1660'
        }
      },
      {
        nome: 'iPhone 13',
        preco: 5500.00,
        estoque: 20,
        detalhes: {
          bateria: '3240mAh',
          tela: '6.1 polegadas',
          resolucao: 'Super Retina XDR',
          cor: 'Azul'
        }
      },
      {
        nome: 'Samsung Galaxy S21',
        preco: 3200.00,
        estoque: 12,
        detalhes: {
          bateria: '4000mAh',
          tela: '6.2 polegadas',
          resolucao: 'Full HD+',
          cor: 'Preto'
        }
      },
      {
        nome: 'iPad Air',
        preco: 4800.00,
        estoque: 10,
        detalhes: {
          tela: '10.9 polegadas',
          armazenamento: '64GB',
          chip: 'Apple M1',
          cor: 'Rosa'
        }
      },
      {
        nome: 'Tablet Samsung Galaxy Tab S7',
        preco: 2800.00,
        estoque: 7,
        detalhes: {
          tela: '11 polegadas',
          armazenamento: '128GB',
          memoria: '6GB RAM',
          caneta: 'S Pen inclusa'
        }
      },
      {
        nome: 'Computador Desktop HP',
        preco: 2500.00,
        estoque: 5,
        detalhes: {
          processador: 'Intel Core i3',
          memoria: '8GB RAM',
          armazenamento: '1TB HDD',
          sistemaOperacional: 'Windows 11'
        }
      },
      {
        nome: 'Smartphone Xiaomi Redmi Note 11',
        preco: 1500.00,
        estoque: 25,
        detalhes: {
          bateria: '5000mAh',
          tela: '6.43 polegadas',
          camera: '50MP',
          cor: 'Cinza'
        }
      },
      {
        nome: 'Notebook Acer Aspire',
        preco: 2800.00,
        estoque: 6,
        detalhes: {
          processador: 'Intel Core i3',
          memoria: '4GB RAM',
          armazenamento: '1TB HDD',
          tela: '15.6 polegadas'
        }
      },
      {
        nome: 'Celular Motorola Moto G',
        preco: 1200.00,
        estoque: 18,
        detalhes: {
          bateria: '5000mAh',
          tela: '6.5 polegadas',
          memoria: '4GB RAM',
          armazenamento: '128GB'
        }
      }
    ];

    await Produto.insertMany(produtos);
    console.log('10 produtos criados no MongoDB');

    res.redirect('/');
  } catch (error) {
    console.error('Erro ao povoar banco de dados:', error);
    res.status(500).send('Erro ao povoar banco de dados');
  }
};
