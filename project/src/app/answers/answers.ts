import { Component, OnInit, signal, inject } from '@angular/core';
import { deleteQuestion, getQuestions } from '../services/questions.js';
import { CommonModule } from '@angular/common';
import { Question } from '../interfaces/questions.interface.js';
import { RouterModule } from '@angular/router';
import { likeQuestion } from '../services/questions.js';
import { AuthService } from '../services/auth.service.js';

@Component({
  selector: 'app-answers',
  imports: [CommonModule, RouterModule],
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

      const sanitizedData = data.map((q: Question) => ({
        ...q,
        likes: Array.isArray(q.likes) ? q.likes : [],
      }));

      this.questions.set(sanitizedData);
    } catch (err) {
      console.error(err);
      this.error.set('Грешка при зареждане на въпросите');
    } finally {
      this.isLoading.set(false);
    }
  }

  async onDelete(id: string | undefined) {
    if (!id) return;

    const questionToDelete = this.questions().find((q) => q.id === id);
    const currentUser = this.authService.currentUser();

    if (questionToDelete?.ownerId !== currentUser?.uid) {
      alert("Нямате разрешение да изтриете този въпрос!");
      return;
    }

    const confirmDelete = confirm('Сигурни ли сте, че искате да изтриете този въпрос?');
    if (!confirmDelete) return;

    try {
      await deleteQuestion(id);
      this.questions.update((questions) => questions.filter((q) => q.id !== id));
    } catch (err) {
      console.error('Error deleting:', err);
      alert('Възникна грешка при опит за изтриване на въпроса.');
    }
  }

  async onLike(questionId: string | undefined) {
    const currentUser = this.authService.currentUser();
    if (!questionId || !currentUser) {
      alert('Моля, влезте в профила си, за да харесвате!');
      return;
    }

    const userId = currentUser.uid;

  
    this.questions.update((questions) =>
      questions.map((q) => {
        if (q.id === questionId) {
          const hasLiked = q.likes?.includes(userId);
          const newLikes = hasLiked
            ? q.likes.filter((id) => id !== userId)
            : [...(q.likes || []), userId];

          return { ...q, likes: newLikes };
        }
        return q;
      }),
    );

    try {
      await likeQuestion(questionId, userId);
    } catch (err) {
      console.error('Грешка при лайкване:', err);
      alert('Възникна грешка при отразяване на харесването.');
      this.loadQuestions(); 
    }
  }
}