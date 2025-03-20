module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pendiente",
      validate: { isIn: [["pendiente", "en progreso", "completada"]] }
    },
    dueDate: DataTypes.DATE
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Task;
};