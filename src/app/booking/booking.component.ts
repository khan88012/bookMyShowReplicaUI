import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { AudiRow, BookingRequest } from '../Models/bookingRequest';
import { MovieTheatre } from '../Models/movieTheatre';
import { Row } from '../Models/row';
import { Audi, ShowDateTime } from '../Models/showDateTime';
import { AudiService } from '../Services/audi.service';
import { BookService } from '../Services/book.service';
import { TestService } from '../test.service';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  showDatesAndTimings: ShowDateTime[] = [];
  movieTheatres: MovieTheatre[] = [];
  sev: any;
  movieName: string | null = '';
  locationName: any;
  theatreId: any;
  audiId: any;
  movieId: string ='';
  showTime!: string;

  constructor(private router: Router, private service: TestService, private route: ActivatedRoute, private audiService: AudiService, private bookingService : BookService) {

  }


  @ViewChild('content', { static: false }) el!: ElementRef

  pa: Boolean = true;
  ticket: Boolean = true;
  down: Boolean = false;
  // moviename:any;


  mindate = new Date();

  ngOnInit(): void {

    console.log(this.service.variable1);
    // this.moviename=this.service.variable1;
    // this.movieName='helllo';
    // console.log(this.movieName);


    this.getMovieTheatres();




  }

  getMovieTheatres() {
    var id = this.route.snapshot.paramMap.get('id');
    this.locationName = this.route.snapshot.paramMap.get('location');
    this.movieName = this.route.snapshot.paramMap.get('name');
    console.log('movieid=', id, 'name=', this.movieName, 'location=', this.locationName);

    this.audiService.getTheatresByMovies(id).subscribe((res) => {
      this.movieTheatres = res;
      if (this.movieTheatres.length > 0) {
        this.movieTheatres = this.movieTheatres.filter(x => x.locationId == this.locationName?.toLowerCase());
      }
      console.log(this.movieTheatres);






    });



    console.log(this.movieTheatres);




  }

  getShowDatesAndTimings(movieId: any, theatreId: any) {
    this.theatreId = theatreId;
    this.movieId = movieId;
    console.log(this.movieId);
    

    if (!this.hideDates && !this.hideTimings && !this.hideSeats) {
      this.hideDates = this.hideTimings = this.hideSeats = true;
    }

    this.audiService.getShowDatesAndTimings(movieId, theatreId).subscribe((res) => {
      this.showDatesAndTimings = res;
      console.log(this.showDatesAndTimings);

      if (this.showDatesAndTimings.length > 0) {
        this.getDates(this.showDatesAndTimings);
      }

    });
  }


  bookingDate = new Date;;
  showDates: Date[] = [];
  shows: Audi[] = [];
  getDates(showDatesAndTimings: ShowDateTime[]) {


    showDatesAndTimings.forEach((element: ShowDateTime) => {
      if (!this.showDates.includes(element.showDate))
        this.showDates.push(element.showDate);
    });

    this.hideDates = false;

    console.log(this.showDates);


  }

  getTimings(showDate: Date) {
    this.bookingDate = showDate;

    this.shows = [];
    var showDatesAndTimingsTemp = this.showDatesAndTimings.filter(x => x.showDate == showDate);
    showDatesAndTimingsTemp.forEach((element: ShowDateTime) => {

      this.shows.push({ showTime: element.showTime, audiId: element.audiId });
    });

    this.hideTimings = false;

    console.log(this.shows);
  }

  rows: Row[] = [];

  getSeatLayout(audiId: any, showTime : string) {
    this.showTime = showTime;
    this.audiId = audiId;
    console.log(audiId);
    this.rows = [];

    this.audiService.getSeats(audiId).subscribe((res) => {

      this.rows = res;
      this.hideSeats = false;
      console.log(this.rows);


    });



  }
  bookingInfo : string ='';
  seatNos: number[] = [];
  audiRows: AudiRow[] = [];

  
  seatSelected(seatNo: number, rowId: string) {
  
    
    console.log('Row: ', rowId, 'Seat No:', seatNo);

    if(this.audiRows.length>0){
      var index = this.audiRows.findIndex(x => x.row == rowId);
      if(index!==-1 )
      {
        if(!this.audiRows[index].seatNos.includes(seatNo))
        {
          this.audiRows[index].seatNos.push(seatNo);
          this.bookingInfo+= rowId+seatNo+',';
        }


      }
      else
      {
          this.seatNos = [];
          this.seatNos.push(seatNo);
          this.audiRows.push({ row: rowId, seatNos: this.seatNos });
          this.bookingInfo+= rowId+seatNo+',';
      }
      
   
    }
    else {

      this.seatNos = [];
      this.seatNos.push(seatNo);
      this.audiRows.push({ row: rowId, seatNos: this.seatNos });
      this.bookingInfo+= rowId+seatNo+',';

    }

    console.log(this.audiRows);





  }
  bookingRequest : BookingRequest = new BookingRequest();

  payment()
  {



    this.bookingRequest.movieId = this.movieId;
    this.bookingRequest.theatreId = this.theatreId;
    this.bookingRequest.audiId = this.audiId;
    this.bookingRequest.date = this.bookingDate;
    this.bookingRequest.timeSlot = this.showTime;
    this.bookingRequest.userId=1;
    this.bookingRequest.selectedSeats= this.audiRows;

    console.log(this.bookingRequest);
    if(this.bookingRequest.selectedSeats.length>0)
    {
      this.bookingService.bookMovie(this.bookingRequest).subscribe(res =>{
        console.log('res', res);
        console.log(res);
  
        
      });
      
    this.pa = false;
    confirm("confirm Payment");
    this.down = true;
    }
    else{
      alert('please select seats');
    }

    





  }

  // isDisabled : boolean = false;
  hideSeats: Boolean = true;
  hideDates: Boolean = true;
  hideTimings: Boolean = true;
  show: Boolean = false;
  showw: Boolean = false;

  theater1() {
    if (this.show == false) {
      this.show = true;
    } else {
      this.show = false;
    }

  }
  back() {
    this.router.navigate(['home']);
  }
  theater2() {
    if (this.showw == false) {
      this.showw = true;
    } else {
      this.showw = false;
    }

  }
  pay() {

    this.ticket = false;
    this.pa = true;
    this.show = false;
    this.showw = false;

  }

  makepdf() {
    let pdf = new jsPDF()
    pdf.html(this.el.nativeElement, {
      callback: (pdf: { save: (arg0: string) => void; }) => {
        pdf.save("Tickets.pdf")
      }
    })
 
   
     
  }
  payy() {
    this.pa = false;
    confirm("confirm Payment");
    this.down = true;
  }


}
