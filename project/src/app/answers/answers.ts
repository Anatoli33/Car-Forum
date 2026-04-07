import { Component, OnInit, signal } from '@angular/core';
import { getQuestions } from '../services/questions.js';
import { CommonModule, DatePipe } from '@angular/common';
import { Question } from '../interfaces/questions.interface.js';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-answers',
  imports: [DatePipe, CommonModule, RouterModule],
  templateUrl: './answers.html',
  styleUrl: './answers.css',
})
export class Answers implements OnInit {
  questions = signal<Question[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  async loadQuestions() {
    try {
      const data = await getQuestions();
      this.questions.set(data);
    } catch (err) {
      console.error(err);
      this.error.set('Failed to load questions');
    } finally {
      this.isLoading.set(false);
    }
  }

  ngOnInit() {
    this.loadQuestions();
  }
}