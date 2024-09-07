import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bundle } from '@3-steps/interfaces';

@Component({
    selector: 'step-recipe',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.scss',
})
export class RecipeComponent {
    @Input({ required: true }) recipe!: Bundle;
}
