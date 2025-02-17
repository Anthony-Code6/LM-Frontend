import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, output } from '@angular/core';
import jSuites from 'jsuites';
import { Options } from 'jsuites/dist/types/editor';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';
import { Notas, NotasCreate, NotasUpdate } from '../../../../core/interfaces/notas';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nota-create-update',
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './nota-create-update.component.html',
  styleUrl: './nota-create-update.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NotaCreateUpdateComponent implements AfterViewInit {

  nota_search = input<Notas>()
  notas = output<NotasCreate | NotasUpdate>()

  formulario!: FormGroup
  form = inject(FormBuilder)
  toast = inject(ToastService)
  activeRouter = inject(ActivatedRoute)

  // Valor de Editar
  idNota: string = ''

  // Editor Html
  edior: any

  constructor() {
    this.formulario = this.form.group({
      titulo: this.form.control('', [Validators.required]),
      nota: this.form.control('')
    })

    // Recibe la informacion por los parametro de la url
    this.activeRouter.params.subscribe((state) => {
      this.idNota = state['id'] ? state['id'] : ''

      if (state['id'] != '' && state['id'] != undefined) {
        setTimeout(() => {
          const nota = this.nota_search() as Notas
          this.formulario.controls['titulo'].setValue(nota.titulo)
          this.edior.setData(nota.nota)

        }, 999)
      }
    })
  }

  ngAfterViewInit() {
    this.edior = jSuites.editor(document.getElementById('editor') as HTMLElement, {
      allowToolbar: true,
      // value: this.notas_Store.get_nota().nota
    } as Options);

  }

  sendNota() {
    if (this.formulario.valid) {
      let nota: NotasCreate | NotasUpdate
      if (this.idNota == '') {
        nota = {
          titulo: this.formulario.controls['titulo'].value,
          nota: this.edior.getData()
        } as NotasCreate
      } else {
        console.log(2);

        nota = {
          idNotas: this.idNota,
          titulo: this.formulario.controls['titulo'].value,
          nota: this.edior.getData()
        } as NotasUpdate
      }
      this.notas.emit(nota)
    } else if (this.edior.getData() == '') {
      this.toast.showError('No escribiste ninguna nota.', 'Error')
    } else {
      this.toast.showError('Debes completar el registro.', 'Error')
    }
  }
}
