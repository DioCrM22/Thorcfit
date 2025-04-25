module.exports = (sequelize, DataTypes) => {
    const VinculoProfissional = sequelize.define('VinculoProfissional', {
      id_vinculo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      data_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      data_fim: DataTypes.DATEONLY,
      status: {
        type: DataTypes.ENUM('ativo', 'inativo'),
        defaultValue: 'ativo'
      }
    }, {
      tableName: 'usuario_profissional',
      timestamps: false
    });
  
    VinculoProfissional.associate = (models) => {
      VinculoProfissional.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuario'
      });
      
      VinculoProfissional.belongsTo(models.Profissional, {
        foreignKey: 'id_profissional',
        as: 'profissional'
      });
    };
  
    return VinculoProfissional;
  };