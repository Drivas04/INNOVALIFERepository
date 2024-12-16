import { Component, inject, OnInit } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { Entidad } from '../../../../../core/models/entidad.interace';
import { EntidadService } from '../../../services/entidad.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-userhome',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent,NgFor, FormsModule, CommonModule, RouterModule],
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.css'
})
export class UserhomeComponent implements OnInit {

  router = inject(Router) 
  ListEntities: Entidad[] = []
  entidadS = inject(EntidadService)
  filteredEntities: Entidad[] = []; 
  searchTerm: string = ''; 
  
  ngOnInit(): void {
    this.getEntities()
  }

  getEntities(){
    this.entidadS.getListEntities().subscribe(data => {
      this.ListEntities = data;
      
    })
  }

  onSearchChange() {
    // Filtra las entidades y limita los resultados a un máximo de 3
    if (this.searchTerm.trim() === '') {
      // Si no hay búsqueda, deja `filteredEntities` vacío
      this.filteredEntities = [];
    } else {
      // Filtrar por búsqueda y limitar a 3 resultados
      this.filteredEntities = this.ListEntities.filter((entidad) =>
        entidad.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      ).slice(0, 3);
    }
  }
  
  onEntitySelect(nit: string, nombreEntidad: string) {
    this.router.navigate(['user/services', nit], {
      queryParams:{nombre: nombreEntidad}
    })
      
    }

  
}



