import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    class="flex flex-col min-h-[160px] bg-white p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-pulse"
  >
    <div class="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div class="space-y-3">
      <div class="h-4 bg-gray-200 rounded"></div>
      <div class="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
    <div class="h-4 bg-gray-200 rounded w-24 mt-4 ml-auto"></div>
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonLoaderComponent {}
