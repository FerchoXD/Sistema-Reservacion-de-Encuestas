import { Award } from "../Entitys/Award";

export interface AwardInterface {
    save(award:Award[]):Promise<Award|any>;
}