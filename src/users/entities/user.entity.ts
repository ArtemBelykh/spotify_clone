import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name: "uid", type: "varchar", nullable: true})
    uid: string

    @Column({name: "email", type: "varchar", nullable: true})
    email: string

    @Column({name: "firstname", type: "varchar", nullable: true})
    firstname: string

    @Column({name: "lastname", type: "varchar", nullable: true})
    lastname: string

    @Column({name: "avatar", type: "varchar", nullable: true})
    avatar: string

    @Column({name: "password", type: "varchar", nullable: true})
    password: string

    @Column({name: "isActivated", type: "boolean", nullable: true, default: false})
    isActivated: boolean

    @Column({name: "activationLink", type: "varchar", nullable: true})
    activationLink: string
}