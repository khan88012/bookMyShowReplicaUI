// public class BookingRequest
// {
//     public Guid BookingId { get; set; }
//     public string MovieId { get; set; }

//     public string TheatreId { get; set; }

//     public string AudiId { get; set; }

//     public DateTime date { get; set; }

//     public string timeSlot { get; set; }

//     public int UserId { get; set; }

//     public List<AudiRow> SelectedSeats { get; set; }



// }

// public class AudiRow
// {
//    public string Row { get; set; }

//    public  List<int> SeatNOs { get; set; }
// }

export class BookingRequest{
    movieId! : string;
    theatreId!:string;
    audiId!:string;
    date! : Date;
    timeSlot!: string;
    userId!:number;
    selectedSeats !: AudiRow[];

}

export class AudiRow{
    row! :string;
    seatNos!: number[];
}