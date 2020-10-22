import { Component, AfterViewInit, ViewContainerRef, ViewChild, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { EditorService } from './models/editor';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent<T> implements AfterViewInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();

  @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private editorService: EditorService<T>,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngAfterViewInit() {
    this.route.queryParams
      .pipe(
        switchMap((queryParams: Params) => this.apiService.getData(+queryParams.option)),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(items => {
        this.editorService.clear();
        this.editorService.initialize(items, this.container);
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
