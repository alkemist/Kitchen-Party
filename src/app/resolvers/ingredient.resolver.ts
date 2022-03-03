import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IngredientModel } from '../models';
import { IngredientService } from '../services';

@Injectable({providedIn: 'root'})
export class IngredientResolver implements Resolve<IngredientModel> {
  constructor(private service: IngredientService) {
  }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<IngredientModel> {
    const ingredient = await this.service.get(route.paramMap.get('slug') ?? '');
    if (ingredient) {
      return ingredient;
    }
    return new IngredientModel({});
  }
}
