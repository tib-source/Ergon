export interface Equipment {
    id: number;
    name: string;
    location: string;
    booking: object;
    status: string;
    comment: string;
    type: string;
    quantity: number;

    get(row: string): (number | string | object);
}
