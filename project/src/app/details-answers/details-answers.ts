import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { getQuestionById } from '../services/questions';
import { signal } from '@angular/core';

@Component({
  selector: 'app-question-details',
  imports:[ RouterModule],
  styleUrl: './details-answers.css',
  templateUrl: './details-answers.html',
})
export class DetailsAnswersComponent {
  private route = inject(ActivatedRoute);

  question = signal<any>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      getQuestionById(id).then((data) => {
        this.question.set(data);
      });
    }
  }
}