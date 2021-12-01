import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DemandeService } from './../../../services/demande.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DemandeDto } from './../../../models/demande';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pending-demande',
  templateUrl: './pending-demande.component.html',
  styleUrls: ['./pending-demande.component.css']
})
export class PendingDemandeComponent implements OnInit {

  datatable: any;

  listDemandeDtoData: DemandeDto[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(public crudApi: DemandeService,
              public router: Router
  ) { }

  ngOnInit(): void {
    const table: any = $('table');
    this.datatable = table.DataTable();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.crudApi.getListOfDemandeByStatusPending().subscribe(
      (response: DemandeDto[]) => {
        console.log(this.listDemandeDtoData);
        this.listDemandeDtoData = response;
        this.dtTrigger.next();
      }
    );

  //  this.getAllDemandeDtoOrderByIdDesc();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  viewContrat(i) {}

  addEditContrat(i){}

  deleteDemande(i){}

 /*  deleteDemandeDTO(id: number){
    this.dialogService.openConfirmDialog('Etes-vous sur de vouloir Supprimer cette donnée ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.crudApi.deleteArticleDto(id).subscribe(data => {
          this.toastr.error('avec succès','Article supprimé', {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
          this.router.navigateByUrl("admin/articles").then(() => {
            window.location.reload();
          });
        },
          (error: HttpErrorResponse) => {
          this.toastr.error("Impossible de supprimer cet Article, veuillez supprimer tous les articles lié à celle-ci");
          }
        );
      }
    });
  } */

  deleteDemandeDTO(id: number){
    this.crudApi.deleteDemandeDto(id).subscribe(data => {
      alert("demande supprimé avec succès");
      this.router.navigateByUrl("admin/appointements");
      /*
      this.toastr.error('avec succès','Article supprimé', {
        timeOut: 1500,
        positionClass: 'toast-top-right',
      });
      this.router.navigateByUrl("admin/articles").then(() => {
        window.location.reload();
        });
      },*/
        (error: HttpErrorResponse) => {
  //      this.toastr.error("Impossible de supprimer cet Article, veuillez supprimer tous les articles lié à celle-ci");
        }
 //     );
    });

  }

}
