import { Component, OnInit } from '@angular/core';
import { getQuestions } from '../services/questions.js';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-answers',
  imports: [DatePipe, CommonModule],
  templateUrl: './answers.html',
  styleUrl: './answers.css',
})
export class Answers implements OnInit{
  questions: any[] = [];

  async ngOnInit() {
    try {
      this.questions = await getQuestions();
    } catch (err) {
      console.error('Error loading questions:', err);
    }
  }
}
