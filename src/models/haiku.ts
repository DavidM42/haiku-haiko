import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";
import type { Geometry, Point } from 'geojson';

// location example
// const origin = {
//     type: "Point",
//     coordinates: [0, 0]
// };

@Entity({ name: 'haiku_haiko'})
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

    // TODO mysql used by planetscale does not support this only postgres with postgis
    // was not implemented yet anyways but later would be cool
    // @Index({ spatial: true })
    // @Column({
    //     type: 'geography',
    //     spatialFeatureType: 'Point', 
    //     nullable: true,
    // })
    // location: Point

    @Column({
        type: 'integer',
        default: 0
    })
    reportCount: number;
}