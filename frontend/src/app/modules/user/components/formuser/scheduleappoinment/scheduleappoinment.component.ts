import { Component, inject, OnInit } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { Personal } from '../../../../../core/models/personal.interface';
import { EntidadService } from '../../../services/entidad.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { CitaService } from '../../../services/cita.service';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-scheduleappoinment',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent, CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './scheduleappoinment.component.html',
  styleUrl: './scheduleappoinment.component.css'
})
export class ScheduleappoinmentComponent implements OnInit {
  
  nombreEntidad: string = ''
  personalDisponible: Personal[] = [];
  description: string = ''
  fechaCita: string = '';
  selectedPersonal: any = null;
  usuarioActual: any;
  idServicio!: number
  loading: boolean = false;
  _snackbar = inject(SnackbarService)


  constructor(private route: ActivatedRoute, private entidadS: EntidadService,private router: Router, private location: Location, private citaS: CitaService, private loginS: LoginService){}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const nit = params['nit'];
      
      this.route.queryParams.subscribe(
        queryParams => {
          this.nombreEntidad = queryParams['nombre'],
          this.idServicio = queryParams['id']
        }
      )
      this.cargarPersonal(nit)
    });
    
    this.loginS.usuarioActual$.subscribe((usuario) => {
      if (!usuario) {
        console.error('Usuario no autenticado');
      } else {
        this.usuarioActual = usuario;
      }
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
    this.location.back()
  }

  agendarCita(): void {
    this.loading = false;
    if (!this.selectedPersonal || !this.fechaCita ) {
      console.error('Por favor completa todos los campos antes de continuar.');
      return;
    }

    const usernameUsuario = {
      username: this.usuarioActual.username, 
      role: this.usuarioActual.role,        
    };

    const formatFecha = (fecha: string): string => {
      const date = new Date(fecha);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    
    const citaPayload = {
  id: 0,
  fechaRegistro: formatFecha(new Date().toISOString()), 
  fechaCita: formatFecha(this.fechaCita),
  estado: 'activa',
  descripcion: this.description, 
  usernameUsuario: usernameUsuario,
  idServicio: {
    id: Number(this.idServicio) ,
  },
  cedulaPersonaEncargada: {
    cedula: this.selectedPersonal.cedula , 
   
  },
  };
      
  
  Swal.fire({
    title: "Estas a punto de agendar una cita",
    showDenyButton: true,
    confirmButtonText: "Agendar",
    denyButtonText: `No Agendar`,
  }).then((result) => {
    if (result.isConfirmed) {
      // Mostrar el indicador de carga
     
      this.loading = true
      this.citaS.agendarCita(citaPayload).subscribe({
        next: (response) => {
          this.loading = true
          console.log(response);
          this._snackbar.showSnackBar(
            "Cita agendada con exito, revisa tu correo electronico con la informacion de la cita",
            "OK"
          );
          
          this.router.navigate(["user/mis-citas"]);
  
          // Mostrar alerta de éxito
          Swal.fire("Cita Agendada con exito, revisa tu correo para mas informacion", "", "success");
        },
        error: (err) => {
          console.error("Error", err);
          this._snackbar.showSnackBar(
            "Ocurrio un error al agendar la cita, vuelve a intentarlo",
            "OK"
          );
        }
      });
    } else if (result.isDenied) {
      Swal.fire("Decidiste no agendar la cita", "", "info");
      this.router.navigate(['/user'])
    }
  });       
  }
}
  
  


