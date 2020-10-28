import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { DialogConfig } from '../utils/dialog-config';
import { DialogRef } from '../utils/dialog-ref';
import { DialogInjector } from '../utils/dialog-injector';

@Injectable()
export class ModalService {
  dialogComponentRef: ComponentRef<ModalComponent>;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open<T, D = unknown>(componentType: Type<T>, config: DialogConfig<D>): DialogRef {
    const dialogRef = this.appendDialogComponentToBody<D>(config);
    this.dialogComponentRef.instance.setChildComponentType<T>(componentType);

    if (config.width) {
      this.dialogComponentRef.instance.width = config.width;
    }

    if (config.height) {
      this.dialogComponentRef.instance.height = config.height;
    }

    return dialogRef;
  }

  close(): void {
    this.removeDialogComponentFromBody();
  }

  private appendDialogComponentToBody<T>(config: DialogConfig<T>): DialogRef {
    const map = new WeakMap();
    map.set(DialogConfig, config);

    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);

    const sub = dialogRef.afterClosed.subscribe(() => {
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ModalComponent
    );
    const componentRef = componentFactory.create(
      new DialogInjector(this.injector, map)
    );
    this.appRef.attachView(componentRef.hostView);

    const domElement = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElement);
    this.dialogComponentRef = componentRef;
    this.dialogComponentRef.instance.onClose.subscribe(() =>
      this.removeDialogComponentFromBody()
    );
    return dialogRef;
  }

  private removeDialogComponentFromBody(): void {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
}
