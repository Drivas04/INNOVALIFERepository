import { Component, OnInit } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { Personal } from '../../../../../core/models/personal.interface';
import { EntidadService } from '../../../services/entidad.service';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scheduleappoinment',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent, CommonModule],
  templateUrl: './scheduleappoinment.component.html',
  styleUrl: './scheduleappoinment.component.css'
})
export class ScheduleappoinmentComponent implements OnInit {
  
  nombreEntidad: string = ''
  personalDisponible: Personal[] = [];
  

  constructor(private route: ActivatedRoute, private entidadS: EntidadService,private router: Router){}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const nit = params['nit'];
      this.route.queryParams.subscribe(
        queryParams => {
          this.nombreEntidad = queryParams['nombre']
        }
      )
      this.cargarPersonal(nit)
    });
   
  } 


  cargarPersonal(nit: string){
    this.entidadS.getPersonalPorNit(nit).subscribe({
      next: (personal) => {
        this.personalDisponible = personal
      },
      error: (err) => {
        console.log(err)
      }
      
    })
  }

  volverServicios() {
    this.router.navigate([`/user/services/`]);
  }
}
  
  


