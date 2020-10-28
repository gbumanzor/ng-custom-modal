import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ModalInsertionDirective } from './directives/modal-insertion.directive';
import { ExampleComponent } from './components/example/example.component';
import { ModalService } from './services/modal.service';

@NgModule({
  declarations: [ModalComponent, ModalInsertionDirective, ExampleComponent],
  imports: [CommonModule],
  entryComponents: [ModalComponent],
  providers: [ModalService],
})
export class ModalModule {}
