import { Component, OnInit, signal, inject } from '@angular/core';
import { deleteQuestion, getQuestions } from '../services/questions.js';
import { CommonModule, DatePipe } from '@angular/common';
import { Question } from '../interfaces/questions.interface.js';
import { RouterModule } from '@angular/router';
import { likeQuestion } from '../services/questions.js';
import { AuthService } from '../services/auth.service.js'; 

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [DatePipe, CommonModule, RouterModule],
  templateUrl: './answers.html',
  styleUrl: './answers.css',
})
export class Answers implements OnInit {

  public authService = inject(AuthService); 
  
  questions = signal<Question[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  async ngOnInit() {
    await this.loadQuestions();
  }

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

  async onDelete(id: string | undefined) {
    if (!id) return;

    const questionToDelete = this.questions().find(q => q.id === id);
    const currentUser = this.authService.currentUser();

    if (questionToDelete?.ownerId !== currentUser?.uid) {
      alert("You don't have permission to delete this!");
      return;
    }

    const confirmDelete = confirm('Are you sure you want to delete this question?');
    if (!confirmDelete) return;

    try {
      await deleteQuestion(id);

      this.questions.update(questions => questions.filter(q => q.id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Failed to delete question.");
    }
  }

  async onLike(questionId: string | undefined) {
    if (!questionId) return;

    this.questions.update(questions =>
      questions.map(question =>
        question.id === questionId
          ? { ...question, likes: (question.likes || 0) + 1 }
          : question
      )
    );

    try {
      await likeQuestion(questionId);
    } catch (err) {
      console.error("Error liking:", err);
    }
  }
}