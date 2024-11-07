import { Component, inject, OnInit } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { ServiciosService } from '../../../services/servicios.service';
import { Servicio } from '../../../../../core/models/servicio.interface';

@Component({
  selector: 'app-servicesuse',
  standalone: true,
  imports: [HomeheaderComponent],
  templateUrl: './servicesuse.component.html',
  styleUrl: './servicesuse.component.css'
})
export class ServicesuseComponent implements OnInit{
 

  servicios!: Servicio[] ;
  private ServiciosS = inject(ServiciosService)


  ngOnInit(): void {
    this.getServicios()
  }

  getServicios() {
    this.ServiciosS.getAllServices().subscribe(
      (data) => {
        this.servicios = data;
      },
      (error) => {
        console.error('Error al obtener los servicios:', error);
      }
    );
  }





}








