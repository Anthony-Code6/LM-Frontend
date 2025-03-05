import { AfterViewInit, Component, inject, input, output } from '@angular/core';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';
import { Proyectos, ProyectosCreate, ProyectosUpdate } from '../../../../core/interfaces/proyectos';
import { CardComponent } from "../../../../shared/components/card/card.component";
@Component({
  selector: 'app-proyecto-create-update',
  imports: [ButtonComponent, ReactiveFormsModule, CardComponent],
  templateUrl: './proyecto-create-update.component.html',
  styleUrl: './proyecto-create-update.component.scss'
})
export class ProyectoCreateUpdateComponent implements AfterViewInit {
  // Variables
  informacionProyecto = input<Proyectos>()
  formularioProyecto = output<ProyectosCreate | ProyectosUpdate>()

  formulario!: FormGroup
  form = inject(FormBuilder)
  toast = inject(ToastService)
  idProyecto = input<string>()

  constructor() {
    this.formulario = this.form.group({
      titulo: this.form.control('', [Validators.required]),
      descripcion: this.form.control('', [Validators.required]),
      link: this.form.control('', [Validators.required]),
      estado: this.form.control(false)
    })
  }

  ngAfterViewInit(): void {
    if (this.idProyecto() != '') {
      setTimeout(() => {
        const proyecto = this.informacionProyecto()
        this.formulario.controls['titulo'].setValue(proyecto?.titulo)
        this.formulario.controls['descripcion'].setValue(proyecto?.descripcion)
        this.formulario.controls['link'].setValue(proyecto?.link)
        this.formulario.controls['estado'].setValue(proyecto?.estado)
      }, 2000);
    }
  }

  sendProyecto() {
    if (this.formulario.valid) {
      let proyecto: ProyectosCreate | ProyectosUpdate
      if (this.idProyecto() === '') {
        proyecto = {
          link: this.formulario.controls['link'].value,
          titulo: this.formulario.controls['titulo'].value,
          descripcion: this.formulario.controls['descripcion'].value,
          estado: this.formulario.controls['estado'].value
        } as ProyectosCreate
      } else {
        proyecto = {
          idProyectos: this.idProyecto() as string,
          link: this.formulario.controls['link'].value,
          titulo: this.formulario.controls['titulo'].value,
          descripcion: this.formulario.controls['descripcion'].value,
          estado: this.formulario.controls['estado'].value
        } as ProyectosUpdate
      }
      this.formularioProyecto.emit(proyecto)

    } else {
      this.toast.showError('Debes completar el formulario.', 'Error')
    }
  }

}
