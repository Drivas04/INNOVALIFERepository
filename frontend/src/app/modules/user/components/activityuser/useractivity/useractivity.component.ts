import { Component, inject, OnInit } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { CitaService } from '../../../services/cita.service';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Cita } from '../../../../../core/models/cita.interface';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-useractivity',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent, CommonModule, NgxPaginationModule, MatPaginatorModule ],
  templateUrl: './useractivity.component.html',
  styleUrl: './useractivity.component.css'
})
export class UseractivityComponent implements OnInit{
  
  citaS= inject(CitaService)
  loginS= inject(LoginService)
  citas: Cita[] = [];
  totalItems: number = 0;
  page: number = 0;
  size: number = 4;
  usuarioActual: any;

  
  ngOnInit(): void {
    this.obtenerMisCitas()
    this.loginS.usuarioActual$.subscribe((usuario) => {
      if (!usuario) {
        console.error('Usuario no autenticado');
      } else {
        this.usuarioActual = usuario;
      }
    });
  }

  
  
  obtenerMisCitas(){
    this.citaS.obtenerMisCitas(this.page, this.size).subscribe((data) => {
      this.citas = data.content; // Array de citas
      this.totalItems = data.totalElements; // Total de citas
    });
  }

  deleteCita(id: number): void {
    const confirmDelete = confirm('¿Estas seguro de eliminar esta cita?')
    if(confirmDelete){
      this.citaS.deleteCita(id).subscribe({
        next:() =>{
          alert('Cita borrada con exito')
          this.obtenerMisCitas()
        },
        error: (err) => {
          console.error('Error', err)
          alert('No se pudo borrar la cita')
        }
      })
    }
  }

  onPageChange(event: any): void {
    this.page = event -1;
    this.obtenerMisCitas()
  }
}

