import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesService } from './recipes.service';
import { RecipeComponent } from './recipe/recipe.component';

@Component({
    selector: 'step-recipes',
    standalone: true,
    imports: [CommonModule, RecipeComponent],
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.scss',
})
export class RecipesComponent {
    recipes = this.recipeService.getRecipes();

    constructor(private readonly recipeService: RecipesService) {}
}
