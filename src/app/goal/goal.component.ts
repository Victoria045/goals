import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../alert-service/alert.service';
import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
import { Quote } from '../quote-class/quote';
import { QuoteRequestService } from '../quote-http/quote-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  // goals: any;
  // alertService: any;
  // quote?:Quote;

  goals:Goal[] = [];
  alertService:AlertService;
  quote?:Quote;


  // goals:Goal[] = [
    
    // {id:1, name:'Watch finding Nemo',description:'Find an online version and watch merlin find his son'},
    // {id:2,name:'Buy Cookies',description:'I have to buy cookies for the parrot'},
    // {id:3,name:'Get new Phone Case', description:'Diana has her birthday coming up soon'},
    // {id:4,name:'Get Dog Food' ,description:'Pupper likes expensive sancks'},
    // {id:5,name:'Solve math homework', description:'Damn Math'},
    // {id:6,name:'Plot my world domination plan',description:'Cause I am an evil overlord'},

  //   new Goal(1,'Watch finding Nemo','Find an online version and watch merlin find his son', new Date(2020,3,14)),
  //   new Goal(2,'Buy Cookies','I have to buy cookies for the parrot',new Date(2019,6,9)),
  //   new Goal(3,'Get new Phone Case','Diana has her birthday coming up soon',new Date(2022,1,12)),
  //   new Goal(4,'Get Dog Food' ,'Pupper likes expensive sancks',new Date(2019,0,18)),
  //   new Goal(5,'Solve math homework','Damn Math',new Date(2019,2,14)),
  //   new Goal(6,'Plot my world domination plan','Cause I am an evil overlord',new Date(2030,3,14)),
  // ];

  goToUrl(id:any){
    this.router.navigate(['/goals',id])
  }

  deleteGoal(index:any){
    let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}`)

    if (toDelete){
      this.goals.splice(index,1)
      this.alertService.alertMe("Goal has been deleted")
    }
  }

  addNewGoal(goal:Goal){
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.completeDate = new Date(goal.completeDate)
    this.goals.push(goal)
  }

  // toggleDetails(index:number){
  //   this.goals[index].showDescription = !this.goals[index].showDescription;
  // }


  // deleteGoal(isComplete:boolean, index:number){
  //   if (isComplete) {
  //     let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)

  //     if (toDelete) {
  //       this.goals.splice(index,1);
  //     }
      
  //   }
  // }

  constructor(goalService:GoalService, alertService:AlertService, private quoteService:QuoteRequestService, private router:Router) {
    this.goals = goalService.getGoals()
    this.alertService = alertService;
    
   }

  ngOnInit(): void {

    this.quoteService.quoteRequest()
    this.quote = this.quoteService.quote

    interface ApiResponse{
      author:string;
      quote:string;
    }
  }
}

  //   this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json").subscribe(data=>{
  //     // Succesful API request
  //     this.quote = new Quote(data.author, data.quote)
  //   },err=>{
  //     this.quote = new Quote("Winston Churchill","Never never give up!")
  //     console.log("An error occurred")
  //   })
  // }