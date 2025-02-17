import { inject, Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toast = inject(NgToastService)

  showSuccess(message: string, title: string, duration: number = 4000) {
    this.toast.success(message, title, duration);
  }

  showError(message: string, title: string, duration: number = 4000) {
    this.toast.danger(message, title, duration);
  }

  showInfo(message: string, title: string, duration: number = 4000) {
    this.toast.info(message, title, duration);
  }

  showWarning(message: string, title: string, duration: number = 4000) {
    this.toast.warning(message, title, duration);
  }

}