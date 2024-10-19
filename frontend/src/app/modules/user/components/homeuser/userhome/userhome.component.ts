import { Component, inject, OnInit } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { Entidad } from '../../../../../core/models/entidad.interace';
import { EntidadService } from '../../../services/entidad.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-userhome',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent,NgFor,],
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.css'
})
export class UserhomeComponent implements OnInit {
  ngOnInit(): void {
    this.getProducts()
  }
   

  ListEntities: Entidad[] = []
  entidadS = inject(EntidadService)


  getProducts(){
    this.entidadS.getListEntities().subscribe(data => {
      this.ListEntities = data
    })
  }

}
