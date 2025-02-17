import { AfterViewInit, Component, inject, input, output } from '@angular/core';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';
import { Proyectos, ProyectosCreate, ProyectosUpdate } from '../../../../core/interfaces/proyectos';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-proyecto-create-update',
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './proyecto-create-update.component.html',
  styleUrl: './proyecto-create-update.component.scss'
})
export class ProyectoCreateUpdateComponent implements AfterViewInit {
  // Variables
  idProyectos: string = ''
  informacionProyecto = input<Proyectos>()
  formularioProyecto = output<ProyectosCreate | ProyectosUpdate>()

  formulario!: FormGroup
  form = inject(FormBuilder)
  activedRouter = inject(ActivatedRoute)
  toast = inject(ToastService)

  constructor() {
    this.formulario = this.form.group({
      titulo: this.form.control('', [Validators.required]),
      descripcion: this.form.control('', [Validators.required]),
      link: this.form.control('', [Validators.required]),
      estado: this.form.control(false)
    })

    this.activedRouter.params.subscribe((params) => {
      if (params['id'] != '' || params['id'] != undefined) {
        setTimeout(() => {
          const proyecto = this.informacionProyecto()
          this.idProyectos = proyecto?.idProyectos as string
          this.formulario.controls['titulo'].setValue(proyecto?.titulo)
          this.formulario.controls['descripcion'].setValue(proyecto?.descripcion)
          this.formulario.controls['link'].setValue(proyecto?.link)
          this.formulario.controls['estado'].setValue(proyecto?.estado)
        }, 2000);
      }
    })
  }

  ngAfterViewInit(): void {


  }

  sendProyecto() {
    if (this.formulario.valid) {
      let proyecto: ProyectosCreate | ProyectosUpdate
      if (this.idProyectos === '') {
        proyecto = {
          link: this.formulario.controls['link'].value,
          titulo: this.formulario.controls['titulo'].value,
          descripcion: this.formulario.controls['descripcion'].value,
          estado: this.formulario.controls['estado'].value
        } as ProyectosCreate
      } else {
        proyecto = {
          idProyectos: this.idProyectos as string,
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
