import { TestBed } from '@angular/core/testing';

import { RecipeService } from './recipe.service';
import { NgxsModule, Store } from '@ngxs/store';
import { MockProvider } from 'ng-mocks';
import { LoggerService } from './logger.service';
import { RecipeState } from '../stores/recipe.state';

describe('RecipeService', () => {
  let service: RecipeService;
  let store: Store;
  let loggerService: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([ RecipeState ], {
          developmentMode: true
        })
      ],
      providers: [
        MockProvider(LoggerService),
      ]
    });
    service = TestBed.inject(RecipeService);
    store = TestBed.inject(Store);
    loggerService = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
