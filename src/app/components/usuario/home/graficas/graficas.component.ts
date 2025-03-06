import { AfterViewInit, Component, input, signal } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js/auto';
import { Grafica } from '../../../../core/interfaces/dashboard';

@Component({
  selector: 'app-graficas',
  imports: [],
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.scss'
})
export class GraficasComponent implements AfterViewInit {
  chart!: Chart

  ids = input<string>()
  types = input<string>()
  title = input<string>()
  // labels = input<string>()
  // datas = input<number>()

  grafi = input<Grafica>()

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.grafica()
    }, 900)

  }

  grafica() {

    const data = {
      labels: this.grafi()?.labels,
      datasets: [{
        label: this.title(),
        data: this.grafi()?.data,
        fill: false,
        borderColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderWidth: 1
      }]
    };

    const config = {
      type: this.types() as ChartType,
      data: data,
      options: {
        responsive: true, // Hace que el gráfico se adapte al tamaño del contenedor
        maintainAspectRatio: false, // Permite que la altura se ajuste
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    // Obtener el contexto del canvas correctamente
    // const canvas = document.getElementById(this.ids() as string) as HTMLCanvasElement;
    // if (canvas) {
    //   this.chart = new Chart(canvas.getContext('2d')!, config as ChartConfiguration);
    // }
    this.chart = new Chart(this.ids() as string, config as ChartConfiguration);


  }

}
