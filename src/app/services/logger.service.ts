import { Injectable } from '@angular/core';
import { default as StackdriverErrorReporter } from 'stackdriver-errors-js';
import { environment } from '../../environments/environment';
import { LoggedError } from '../errors';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  errorHandler: StackdriverErrorReporter;

  constructor() {
    this.errorHandler = new StackdriverErrorReporter();
    this.init();
  }

  init() {
    this.errorHandler.start({
      key: environment.GOOGLE_CLOUD_OPERATIONS_API_KEY,
      projectId: environment.FIREBASE_PROJECT_ID
    });
  }

  error<T>(error: LoggedError<T>) {
    if (environment.production) {
      this.errorHandler.report(error);
    } else {
      console.error(`-- Error [${ error.type }]`, error.message, error.context);
    }
  }
}
