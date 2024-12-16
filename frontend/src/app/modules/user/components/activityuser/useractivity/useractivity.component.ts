import { Component, inject, OnInit } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { CitaService } from '../../../services/cita.service';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { Cita } from '../../../../../core/models/cita.interface';

@Component({
  selector: 'app-useractivity',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent, CommonModule],
  templateUrl: './useractivity.component.html',
  styleUrl: './useractivity.component.css'
})
export class UseractivityComponent implements OnInit{
  
  citaS= inject(CitaService)
  loginS= inject(LoginService)
  citasFiltradas: Cita[] = [];
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
    
  
          
   

    this.citaS.obtenerMisCitas().subscribe({
      next: (citas) => {
        this.citasFiltradas = citas
      },
      error: (err) => {
        console.error("Error", err)
      }
    })
  }

}
