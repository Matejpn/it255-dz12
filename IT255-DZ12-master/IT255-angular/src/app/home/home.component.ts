import { Component, Directive } from '@angular/core';
import { Http,  Headers, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  //styleUrls: ['./home.component.css']
})
export class HomeComponent {
    router: Router;
    isAuth: String;
    currentUrl : String;

    private jela = 'http://localhost:8888/it255.php';
    data: Object[];
    name: String = "";
  
    ngOnInit() 
    {
        this.router.events.subscribe(event => {
            if(localStorage.getItem('token') !== null){
            this.isAuth = "yes";
            }else {
            this.isAuth = "no";
            }
        });
    }

    constructor (private http: Http, router: Router){
        this.router = router;
        this.currentUrl = '';
        this.http.get(this.jela).subscribe(
            data => {
                this.data =  JSON.parse(data["_body"]);
            },
            err => console.log(err.text()),
                () => {
                }
        );
    }

public ukloniJelo(event: Event, item: Number) {
     var headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
     headers.append('token', localStorage.getItem('token'));
     this.http.get('http://localhost/izbrisiJelo.php?id='+ item, { headers: headers }).subscribe( data => {
       event.srcElement.parentElement.parentElement.remove();
     });
   }
 /*
   public viewJela(id:number){
     this.router.navigateByUrl('jela/' + id);
   }
   */
   public izmeniJelo(id:number){
     this.router.navigateByUrl('izmenaJela/' + id);
   }

// Kad dodas komponente!
}

