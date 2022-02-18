import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { first, Observable } from 'rxjs';
import { TranslationError } from '../errors/logged/translation-error.service';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { KeyObject } from '../models/other.model';
import { FillTranslations } from '../stores/translation.action';
import { TranslationState } from '../stores/translation.state';
import { TimeHelper } from '../tools/time.helper';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  @Select(TranslationState.lastUpdated) lastUpdated$?: Observable<Date>;
  @Select(TranslationState.all) protected all$?: Observable<KeyValueInterface[]>;
  protected lastUpdated?: Date;
  private all: KeyValueInterface[] = [];
  private lang = 'fr';
  private promise: Promise<void> | undefined;

  constructor(private translateService: TranslateService, private store: Store, private logger: LoggerService) {
    this.lastUpdated$?.subscribe(async lastUpdated => {
      this.lastUpdated = lastUpdated;
      if (this.storeIsOutdated()) {
        await this.refresh();
      }
    });

    this.all$?.pipe(first()).subscribe(translations => {
      this.all = translations;
    });
  }

  storeIsOutdated() {
    if (this.lastUpdated === undefined) {
      return true;
    }
    const nbHours = TimeHelper.calcHoursAfter(this.lastUpdated);
    return nbHours > 24;
  }

  async instant(key: string): Promise<string> {
    if (this.all.length === 0) {
      await this.refresh();
    }
    return this.translate(key);
  }

  translate(key: string): string {
    const value = this.all.find(translation => translation.key === key)?.value || '';
    if (!value) {
      this.logger.error(new TranslationError(key));
      return key;
    }
    return value;
  }

  async translateLabels(keyObjects: KeyObject[]): Promise<KeyObject[]> {
    return Promise.all(keyObjects.map(async item => {
      return {...item, label: await this.instant(item.label)};
    }));
  }

  async refresh(): Promise<void> {
    if (this.promise) {
      return this.promise;
    }

    this.promise = new Promise<void>(resolve => {
      this.translateService.getTranslation(this.lang).pipe(first()).subscribe(translations => {
        const keys = Object.keys(translations);
        const values = Object.values(translations);
        this.all = keys.map((value, index) => {
          return {key: value, value: values[index]} as KeyValueInterface;
        });

        this.store.dispatch(new FillTranslations(this.all));
        this.promise = undefined;
        resolve();
      });
    });
    return this.promise;
  }
}
