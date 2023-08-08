

export class Row{
    rowId ! : string;
    seats ! : SeatInfo[];
}

class SeatInfo{
    seatNo! : number;
    isBooked! : boolean;
    categoryId ! : string;

}



