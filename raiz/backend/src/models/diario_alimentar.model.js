module.exports = (sequelize, DataTypes) => {
    const DiarioAlimentar = sequelize.define('DiarioAlimentar', {
      id_registro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      data: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      total_calorias: DataTypes.INTEGER
    }, {
      tableName: 'diario_alimentar',
      hooks: {
        afterCreate: (diario) => {
          // Agenda exclusão após 7 dias
          setTimeout(async () => {
            await diario.destroy();
          }, 7 * 24 * 60 * 60 * 1000);
        }
      }
    });
  
    return DiarioAlimentar;
  };