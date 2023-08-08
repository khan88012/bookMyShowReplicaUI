import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatWith } from 'rxjs';
import { Movie } from '../Models/movie';
import { Theatre } from '../Models/theatre';
import { AudiService } from '../Services/audi.service';
import { BookService } from '../Services/book.service';
import { TheatreService } from '../Services/theatre.service';
import { TestService } from '../test.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  Location! : string;

  movies: any[] = [{
    movieName: "Catwoman",
    genre: "Superhero"
  },
  {
    movieName: "Batman",
    genre: "Superhero"
  }, {
    movieName: "Superwoman",
    genre: "Superhero"
  }];

  movieList: Movie[] = [];

  constructor(private service: TestService,
              private router: Router,
               private bookService: BookService,
                private theatreService :TheatreService,
                private audiService : AudiService) {

  }
theatres : Theatre[]=[];

movieResponse : any[]=[];
  getMoviesByLocation(loc : string)
  {
    console.log(loc);
    this.Location = loc;
    if(loc.length>0)
    {
      this.theatreService.getTheatreByLocation(loc).subscribe((res : Theatre[])=>
      {
        this.theatres= res;
        console.log(this.theatres);
        
      });
  
      if(this.theatres.length>0)
      {
          this.theatres.forEach(element => {
            this.audiService.getMoviesByTheatre(element.theatreId).subscribe((res : any[])=>
            {
              console.log(element.theatreId);
              
              this.movieList= res;
              console.log('moiveResponse',this.movieResponse);
              console.log('res',res);
  
              
            }
            )
          
            
          });
         
      }
    }
    else{
      this.refresh();
    }

    

  }
  refresh() {
    this.getMovies();
  }
  getMovies() {
    this.bookService.getAllMovies().subscribe((res: Movie[]) => {
      this.movieList = res;
      // {

      // }
      console.log(res);
      console.log('movie list', this.movieList);

    });


    console.log(this.movieList);

  }

  bookMovie(movieId : string, movieName:string){
    console.log(movieId);
    if(this.Location != null || undefined)
    {
      this.router.navigate(['booking/id/name/location',{ id : movieId, name : movieName,  location: this.Location} ]);

    }
    else{
      alert('select a location please');
      console.log("select a location please");
      
    }
    // this.router.navigateByUrl(`'booking/1/123`);
    // this.router.navigate(['booking', {id: "1", num: "12"}]);

  }




  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getMovies();
    console.log(this.movieList);

  }






  private movie = "ADHIPURUSH";
  private name = "AVATAR 2";
  private vera = "Veera Simha Reddy";
  private dham = "Dhamaka";
  private pag = "18 Pages";
  private varisu = "Varisu";
  private driv = "Driver Jamuna";
  private antm = "ANT-MAN AND THE WASP";
  private jhon = "Jhon Wick 4";
  private tran = "Transformers";
  private topg = "Top Gear";
  private patan = "PATHAAN";

  all: Boolean = true;
  telugu: Boolean = false;
  hindi: Boolean = false;
  english: Boolean = false;
  twod: Boolean = false;
  threed: Boolean = false;


  telug() {
    this.all = false;
    this.telugu = true;
    this.english = false;
    this.hindi = false;
    this.twod = false;
    this.threed = false;
  }
  alll() {
    this.telugu = false;
    this.english = false;
    this.all = true;
    this.hindi = false;
    this.twod = false;
    this.threed = false;

  }
  eng() {
    this.all = false;
    this.telugu = false;
    this.english = true;
    this.twod = false;
    this.hindi = false;
    this.threed = false;
  }
  thre() {
    this.all = false;
    this.telugu = false;
    this.english = false;
    this.threed = true;
    this.twod = false;
    this.hindi = false;
  }
  hindii() {
    this.all = false;
    this.telugu = false;
    this.english = false;
    this.threed = false;
    this.hindi = true;
    this.twod = false;

  }
  twodd() {
    this.all = false;
    this.telugu = false;
    this.english = false;
    this.threed = false;
    this.hindi = false;
    this.twod = true;

  }
  adhi() {
    this.service.variable1 = this.movie;
    this.router.navigate(['booking']);

  }
  ava() {
    this.service.variable1 = this.name;
    this.router.navigate(['booking']);
  }
  veera() {
    this.service.variable1 = this.vera;
    this.router.navigate(['booking']);
  }
  damka() {
    this.service.variable1 = this.dham;
    this.router.navigate(['booking']);
  }
  page() {
    this.service.variable1 = this.pag;
    this.router.navigate(['booking']);
  }
  vari() {
    this.service.variable1 = this.varisu;
    this.router.navigate(['booking']);
  }
  dri() {
    this.service.variable1 = this.driv;
    this.router.navigate(['booking']);
  }
  ant() {
    this.service.variable1 = this.antm;
    this.router.navigate(['booking']);
  }
  jon() {
    this.service.variable1 = this.jhon;
    this.router.navigate(['booking']);
  }
  tra() {
    this.service.variable1 = this.tran;
    this.router.navigate(['booking']);
  }
  top() {
    this.service.variable1 = this.topg;
    this.router.navigate(['booking']);
  }
  pat() {
    this.service.variable1 = this.patan;
    this.router.navigate(['booking']);
  }

}

