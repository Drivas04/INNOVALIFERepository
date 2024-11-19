import { Component, inject, OnInit } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { ServiciosService } from '../../../services/servicios.service';
import { Servicio } from '../../../../../core/models/servicio.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-servicesuse',
  standalone: true,
  imports: [HomeheaderComponent, CommonModule, FooterComponent, SpinnerComponent],
  templateUrl: './servicesuse.component.html',
  styleUrl: './servicesuse.component.css'
})
export class ServicesuseComponent implements OnInit{
  servicios: Servicio[] = [];
  nombreEntidad: string = '';
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private serviciosService: ServiciosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const nit = params['nit'];
      this.route.queryParams.subscribe(
        queryParams => {
          this.nombreEntidad = queryParams['nombre']
        }
      )
      this.cargarServicios(nit);
    });
  }

  cargarServicios(nit: string) {
    this.loading = true;
    this.serviciosService.getAllServices(nit)
      .subscribe({
        next: (servicios) => {
          this.servicios = servicios;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error al cargar los servicios';
          this.loading = false;
          console.error('Error:', error);
        }
      });
  }

  volverAEntidades() {
    this.router.navigate(['/user/userhome']);
  }
}














