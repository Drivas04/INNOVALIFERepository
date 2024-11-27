import { Component, OnInit } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { Personal } from '../../../../../core/models/personal.interface';
import { EntidadService } from '../../../services/entidad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  servicioId!: number
  nitEntidad!: string;
  personalDisponible: Personal[] = [];


  constructor(private route: ActivatedRoute, private entidadS: EntidadService){}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.nitEntidad = params['nit']
    })
    this.servicioId = +this.route.snapshot.paramMap.get('id')!
    this.cargarPersonal()
  }

  cargarPersonal(){
    this.entidadS.getPersonalPorNit(this.nitEntidad).subscribe({
      next: (personal) => {
        this.personalDisponible = personal
      },
      error: (err) => {
        console.error('Error', err)
      }
    })
  }
  


}
