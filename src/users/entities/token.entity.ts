import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";


@Entity('token')
export class TokenEntity {
    @PrimaryGeneratedColumn()
    id: number
    // @OneToOne(() => UserEntity)
    // @JoinColumn()
    // user: UserEntity
    @Column({name: "userId", type: "varchar", default: false, nullable: true})
    userId: string


    @Column({name: "refreshToken", type: "varchar", nullable: true})
    refreshToken: string
}