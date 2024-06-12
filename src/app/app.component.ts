import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgClass} from "@angular/common";
import {DialogComponent} from "./dialog/dialog.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, DialogComponent,  MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  private pictures = [new Card(1,'assets/1.jpeg'),
    new Card(2,'assets/2.jpeg'),
    new Card(3,'assets/3.jpeg'),
    new Card(4,'assets/4.jpeg'),
    new Card(5,'assets/5.jpeg'),
    new Card(6,'assets/6.jpeg'),
    new Card(7,'assets/7.jpeg'),
    new Card(8,'assets/8.jpeg'),
    new Card(9,'assets/9.jpeg'),
    new Card(10,'assets/10.jpeg')];
  public cards:Card[] = [];
  timer: number =30;
  private flippedCards:number[] = [];
  public corrected:{first:number,second:number}[] = [];

  constructor(public dialog: MatDialog) {
    this.initializeCards();
    this.shuffleCards();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
      disableClose:true
    }).afterClosed().subscribe(()=>{
   this.resetCards()
    });
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.hideCards();
    }, 30000);
    this.startTimer();
  }

  startTimer() {
    const timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(timerInterval);

      }
    }, 1000);
  }

  hideCards() {
    this.cards = this.cards.map(card => ({...card, flipped: false}));
  }










  initializeCards() {
    this.cards = this.pictures.concat(this.pictures).map(picture => (picture));
  }
  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }

  }


  flipCard(index: number) {
    if (this.flippedCards.length < 2 && !this.cards[index].flipped) {
      this.cards[index].flipped = true;
      this.flippedCards.push(index);
      if (this.flippedCards.length === 2) {
        return this.checkMatch();
      }
    }
    return null;
  }

  checkWin(){
    if(this.corrected.length==3){
      this.openDialog();
    }
  }

  checkMatch() {

    const [first, second] = this.flippedCards;
    if (this.cards[first].id === this.cards[second].id) {
      this.corrected.push({first:this.cards[first].id,second:this.cards[second].id});
      this.checkWin()
      this.flippedCards = [];
      return true;
    } else {
      setTimeout(() => {
        this.cards[first].flipped = false;
        this.cards[second].flipped = false;
        this.flippedCards = [];
      }, 1000);
      return false;
    }
  }

  resetCards(){
    this.initializeCards();
    this.shuffleCards();
    this.flippedCards=[];
    this.corrected=[];
    this.timer=30;
    this.startTimer();
  }
}

export class Card {
  constructor(public id:number,public image: string, public flipped = true) {
  }
}
