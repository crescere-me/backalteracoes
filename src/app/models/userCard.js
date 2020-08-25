const mongoose = require('../../config/db');
/**
 * Modelo de ligação entre os clientes e seus cartões
 */
const userCardSchema = mongoose.Schema(
  {
    UserCardID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },    
    CardID: { // 
      type: mongoose.Schema.Types.ObjectId,
      required:true,
    },
    
  },
  {
    timestamps: true,
  }
);
const UserCard = mongoose.model('UserCard', userCardSchema);
module.exports = UserCard;
