import { AfterViewInit, Component, inject, input, output, signal } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { TareasArray, TrabajoCreate, Trabajos, TrabajoUpdate } from '../../../../core/interfaces/trabajos';
@Component({
  selector: 'app-trabajos-create-update',
  imports: [CardComponent, ButtonComponent, ReactiveFormsModule, CdkDropList, CdkDrag],
  templateUrl: './trabajos-create-update.component.html',
  styleUrl: './trabajos-create-update.component.scss'
})
export class TrabajosCreateUpdateComponent implements AfterViewInit {
  idTrabajo = input<string>()

  formulario!: FormGroup
  form = inject(FormBuilder)

  trabajosGet = input<Trabajos>()
  tareas = signal<TareasArray[]>([])
  trabajos = output<TrabajoCreate | TrabajoUpdate>()

  constructor() {
    this.formulario = this.form.group({
      titulo: this.form.control('', [Validators.required]),
      tareas: this.form.control('')
    })
  }

  ngAfterViewInit(): void {
    if (this.idTrabajo() != '') {
      setTimeout(() => {
        const trabajo = this.trabajosGet()
        this.formulario.controls['titulo'].setValue(trabajo?.nombre)

        let lista_tareas: TareasArray | { tarea: string; estado: boolean; }[] = []
        if (trabajo?.Tareas.length as number > 0) {
          trabajo?.Tareas.map((element) => (
            lista_tareas.push({
              tarea: element.tarea,
              estado: element.estado
            })
          ))
          this.tareas.set([...this.tareas(), ...lista_tareas])
        }
      }, 999);
    }
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
      let formulario: TrabajoCreate | TrabajoUpdate
      if (this.idTrabajo() == '') {
        formulario = {
          nombre: titulo,
          tareas: tareas
        } as TrabajoCreate

      } else {
        formulario = {
          idTrabajos: this.idTrabajo(),
          nombre: titulo,
          tareas: tareas
        } as TrabajoUpdate
      }
      this.trabajos.emit(formulario)
    }
  }

 
}


