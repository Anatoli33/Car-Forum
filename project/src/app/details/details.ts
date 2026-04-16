import { Component, signal, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { getCarById } from '../services/cars';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';

import { db } from '../services/firestore.js';
import { AuthService } from '../services/auth.service.js';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [DatePipe, RouterModule, FormsModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class CarDetails implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  public authService = inject(AuthService);

  car = signal<any>(null);
  carId: string = '';
  commentText = '';
  comments = signal<any[]>([]);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carId = id;
      try {
        const data = await getCarById(id);
        this.car.set(data);
        this.loadComments(id);
        this.cdr.detectChanges();
      } catch (err) {
        console.error(err);
      }
    }
  }

  loadComments(carId: string) {
    const q = query(collection(db, `cars/${carId}/comments`), orderBy('createdAt', 'desc'));

    onSnapshot(q, (snapshot) => {
      const loadedComments = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt:
            data['createdAt'] instanceof Timestamp ? data['createdAt'].toDate() : new Date(),
        };
      });

      this.comments.set(loadedComments);
      this.cdr.detectChanges(); 
    });
  }

  async addComment() {
    if (!this.commentText.trim()) return;

    const user = this.authService.currentUser();
    if (!user) return;

    try {
      await addDoc(collection(db, `cars/${this.carId}/comments`), {
        text: this.commentText,
        userId: user.uid,
        username: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        createdAt: new Date(), 
      });

      this.commentText = '';
    } catch (error) {
      console.error('Грешка:', error);
    }
  }
}
