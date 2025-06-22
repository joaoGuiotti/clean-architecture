import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table({
    tableName: 'customers',
    timestamps: false,
})
export default class CustomerModel extends Model {
    @PrimaryKey
    @Column({ type: DataType.STRING, allowNull: false })
    declare id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare name: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare street: string;

    @Column({ allowNull: false, type: DataType.NUMBER })
    declare number: number;

    @Column({ allowNull: false, type: DataType.STRING })
    declare zipcode: string;

    @Column({ allowNull: false, type: DataType.STRING })
    declare city: string;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    declare active: boolean;

    @Column({ allowNull: false, type: DataType.NUMBER })
    declare rewardPoints: number;
}