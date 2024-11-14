import { Component, inject, OnInit } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { Entidad } from '../../../../../core/models/entidad.interace';
import { EntidadService } from '../../../services/entidad.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userhome',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent,NgFor,],
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.css'
})
export class UserhomeComponent implements OnInit {

  router = inject(Router) 
  ListEntities: Entidad[] = []
  entidadS = inject(EntidadService)
  
  ngOnInit(): void {
    this.getEntities()
  }

  getEntities(){
    this.entidadS.getListEntities().subscribe(data => {
      this.ListEntities = data;
    })
  }
  
  onEntitySelect(nit: string, nombreEntidad: string) {
    this.router.navigate(['user/services', nit], {
      queryParams:{nombre: nombreEntidad}
    })
      
    }

  
}



