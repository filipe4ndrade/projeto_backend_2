const { DataTypes } = require('sequelize');
const sequelize = require('./conexaoRelacional');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  createdAt: 'data_criacao',
  updatedAt: 'data_atualizacao'
});

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'PENDENTE'
  },
  valor_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0
  }
}, {
  freezeTableName: true,
  createdAt: 'data_criacao',
  updatedAt: 'data_atualizacao'
});

const ItemPedido = sequelize.define('ItemPedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  preco_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  produto_mongodb_id: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  createdAt: 'data_criacao',
  updatedAt: 'data_atualizacao'
});

Usuario.hasMany(Pedido, {
  foreignKey: {
    name: 'usuario_id',
    allowNull: false
  }
});
Pedido.belongsTo(Usuario, {
  foreignKey: {
    name: 'usuario_id',
    allowNull: false
  }
});

Pedido.hasMany(ItemPedido, {
  foreignKey: {
    name: 'pedido_id',
    allowNull: false
  }
});
ItemPedido.belongsTo(Pedido, {
  foreignKey: {
    name: 'pedido_id',
    allowNull: false
  }
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Modelos relacionais sincronizados com sucesso.');
  })
  .catch(err => {
    console.error('Erro ao sincronizar modelos relacionais:', err);
  });

module.exports = { Usuario, Pedido, ItemPedido };
