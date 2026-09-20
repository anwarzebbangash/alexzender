import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/database';

export class Subscriber extends Model {
  declare id: number;
  declare email: string;
  declare status: string;
  declare subscribed_at: Date;
  declare unsubscribed_at: Date | null;
}

Subscriber.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'bounced'),
      defaultValue: 'active',
    },
    subscribed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    unsubscribed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'subscribers',
    timestamps: false,
  }
);

export default Subscriber;