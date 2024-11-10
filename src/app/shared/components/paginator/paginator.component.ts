import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

// Models
import { Paginate } from '@features/blog/models';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  totalCount = input.required<number>();
  limit = input.required<number>();
  currentPage = input.required<number>();
  visiblePages = 5;

  onPageSelect = output<Paginate>();

  get totalPages(): number[] {
    const totalPages = Math.ceil(this.totalCount() / this.limit());
    return Array(totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  get visiblePageNumbers(): number[] {
    const totalPagesCount = Math.ceil(this.totalCount() / this.limit());
    const visiblePagesCount = Math.min(this.visiblePages, totalPagesCount);

    let startPage = Math.max(
      this.currentPage() - Math.floor(visiblePagesCount / 2),
      1,
    );

    const endPage = Math.min(
      startPage + visiblePagesCount - 1,
      totalPagesCount,
    );

    if (endPage - startPage + 1 < visiblePagesCount) {
      startPage = Math.max(endPage - visiblePagesCount + 1, 1);
    }

    return Array(endPage - startPage + 1)
      .fill(0)
      .map((_, i) => startPage + i);
  }

  selectPage(page: number) {
    this.onPageSelect.emit({ limit: this.limit(), page });
  }

  get firstPage(): number {
    return 1;
  }

  get lastPage(): number {
    return Math.ceil(this.totalCount() / this.limit());
  }

  goToFirstPage() {
    this.selectPage(this.firstPage);
  }

  goToLastPage() {
    this.selectPage(this.lastPage);
  }
}
