import { AfterViewInit, Component, signal } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js/auto';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  constructor() {

  }

  ngAfterViewInit(): void {
    this.grafica()
  }

  grafica() {

    const data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],//this.labels,
      datasets: [{
        label: 'Test',//this.titles,
        data: [65, 59, 80, 81, 26, 55, 40],
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
      type: 'bar' as ChartType,//this.types,
      data: data,
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
        responsive: true, // Hace que el gráfico sea responsivo
        maintainAspectRatio: false, // Permite ajustar la altura del contenedor
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };



    new Chart('myChart', config as ChartConfiguration);

  }
}
