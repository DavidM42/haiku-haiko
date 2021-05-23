import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";
import type { Geometry, Point } from 'geojson';

// location example
// const origin = {
//     type: "Point",
//     coordinates: [0, 0]
// };

@Entity({ name: 'haiko_haiku'})
export class Haiku {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('timestamp')
    createdOn: Date;

    @Column('varchar')
    lineOne: string;
    @Column('varchar')
    lineTwo: string;
    @Column('varchar')
    lineThree: string;

    @Index({ spatial: true })
    @Column({
        type: 'geography',
        spatialFeatureType: 'Point', 
        nullable: true,
    })
    location: Point

    @Column({
        type: 'int4',
        default: 0
    })
    reportCount: number;
}