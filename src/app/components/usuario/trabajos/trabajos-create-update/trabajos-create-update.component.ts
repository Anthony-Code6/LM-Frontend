import { Component, inject, input, output, signal } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { TareasArray, TrabajoCreate } from '../../../../core/interfaces/trabajos';
@Component({
  selector: 'app-trabajos-create-update',
  imports: [CardComponent, ButtonComponent, ReactiveFormsModule, CdkDropList, CdkDrag],
  templateUrl: './trabajos-create-update.component.html',
  styleUrl: './trabajos-create-update.component.scss'
})
export class TrabajosCreateUpdateComponent {
  idTrabajo = input<string>()

  formulario!: FormGroup
  form = inject(FormBuilder)

  tareas = signal<TareasArray[]>([])
  trabajos = output<TrabajoCreate>()

  constructor() {
    this.formulario = this.form.group({
      titulo: this.form.control('', [Validators.required]),
      tareas: this.form.control('')
    })
  }

  // Array of Task

  get tareasList() {
    return this.formulario.controls['tareas'] as FormArray
  }

  addTarea() {

    const tarea = this.formulario.controls['tareas'].value

    if (tarea != '') {
      let new_tarea: TareasArray = {
        tarea: tarea,
        estado: false
      }

      this.tareas.set([...this.tareas(), new_tarea])
      this.formulario.controls['tareas'].setValue('')
      document.getElementById('tarea')?.focus()
    }


  }

  removeTarea(name: string) {
    const realoadTask = this.tareas().filter((element) => element.tarea !== name)
    this.tareas.set(realoadTask)
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tareas(), event.previousIndex, event.currentIndex);
  }


  sendForm() {
    if (this.formulario.valid) {
      const titulo = this.formulario.controls['titulo'].value
      const tareas = this.tareas()

      if (this.idTrabajo() == '') {
        let formulario: TrabajoCreate = {
          nombre: titulo,
          tareas: tareas
        }

        this.trabajos.emit(formulario)
      }
    }
  }
}


