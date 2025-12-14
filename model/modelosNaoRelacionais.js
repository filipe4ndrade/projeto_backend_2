const mongoose = require('./conexaoNaoRelacional');
const { Schema } = mongoose;

const produtoSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  estoque: {
    type: Number,
    required: true,
    min: 0
  },
  detalhes: {
    type: Schema.Types.Mixed
  }
}, {
  timestamps: {
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao'
  }
});

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = { Produto };
