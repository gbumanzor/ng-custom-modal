import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ModalInsertionDirective } from '../../directives/modal-insertion.directive';
import { DialogRef } from '../../utils/dialog-ref';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  childComponentType: Type<unknown>;
  componentRef: ComponentRef<unknown>;
  width = '50%';
  height = '50%';
  private readonly onClose$ = new Subject<unknown>();
  public onClose = this.onClose$.asObservable();

  @ViewChild(ModalInsertionDirective) insertionPoint: ModalInsertionDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogRef: DialogRef
  ) {}

  setChildComponentType<T>(componentType: Type<T>): void {
    this.childComponentType = componentType;
  }

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.changeDetectorRef.detectChanges();
  }

  onOverlayClicked(event: MouseEvent): void {
    event.stopPropagation();
    this.dialogRef.close();
  }

  loadChildComponent(componentType: Type<unknown>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      componentType
    );

    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onModalClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
