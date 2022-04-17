export interface RoomFilter {
    maxprice?: number;
    minprice?: number;
    sortbyprice?:boolean;
    type?: string;
    available?: boolean;
    fromdate?: Date;
    untildate?: Date;
}