import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Production} from '../../model/Production';
import {Communication} from '../../model/Communication';
import {ChercheurService} from '../../services/chercheur.service';
import {ActivatedRoute} from '@angular/router';
import {ProductionService} from '../../services/production.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {DetailsProductionComponent} from './details-production/details-production.component';

/**
 * @title Table with pagination
 */
@Component({

  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {

  communication : any = new Communication();
  publication : Production = new Production();
  publications : any;
  show:any;
  findAuthor : boolean = false;

  email : string
  note : number
  keys : any

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource : any
  obs: Observable<any>;

  constructor(private productionservice : ProductionService,private changeDetectorRef: ChangeDetectorRef,
              private chercheurservice : ChercheurService, private dialog: MatDialog,
              private route : ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      if("pub" == params.get("id")){
        this.getPublications()
        this.show="pub"
      }else if ("com" == params.get("id")){
        //this.listeCommunication()
        this.getCommunications()
        this.show="pub"
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getPublications(){
    this.productionservice.getPublications().subscribe(
      data=>{
        this.changeDetectorRef.detectChanges();
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        //this.publications = data;
        console.log(data);
      },error1 => {
        console.log("get pub=> ",error1);
      }
    )
  }
  getCommunications(){
    this.productionservice.getCommunications().subscribe(
      data=>{
        this.changeDetectorRef.detectChanges();
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        //this.publications = data;
        console.log(data);
      },error1 => {
        console.log("get pub=> ",error1);
      }
    )
  }
  getPublication(id : number){
    this.productionservice.getPublication(id)
      .subscribe((data:Production)=>{
        this.publication=data
        console.log("details prod", data)
      },error1 =>{
        console.log(error1)
      })
  }

  getCommunication(id : number){
    this.productionservice.getPublication(id)
      .subscribe(data=>{
        this.communication=data
      },error1 =>{
        console.log(error1)
      })
  }

  onDetailPublication(id:number){
    this.getPublication(id)

    setTimeout (() => {
    const dialogRef = this.dialog.open(DetailsProductionComponent, {
      width: '700px',
      height: '500px',
      data: {} = this.publication
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: ",result);
    });
    }, 100);
  }

}


