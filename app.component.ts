import { Component, OnInit, ViewChild } from '@angular/core';
import { sortData } from './jsontreegriddata';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { DialogComponent } from "@syncfusion/ej2-angular-popups";
import { DropDownList, ChangeEventArgs } from "@syncfusion/ej2-dropdowns";
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [],
})
export class AppComponent {


 
  public dropDownFilter: DropDownList;
  public data: Object[] = [];

  public fields: Object;
  public rowIndex: number;
  public contextMenuItems: Object;
  public ColName: string = "";
  columnValue: number;
  columnField: string;
  ColAlign: string = "";
  ColMinWidth: number;
  public showEditColumn: boolean = false;
  public ColType: string = "";
  ColFColor: string = '';
  ColBColor: string = '';
  @ViewChild("treegrid")
  public treegrid: TreeGridComponent;

  public d2data=[];

  public d4data=[];

  public d3data= [];

  public treeColumns:any= [
    {
      field: 'orderName',
      headerText: 'Order Name'
    },
    {
      field: 'category',
      headerText: 'Category',
      editType: 'stringedit',
      type: 'string'
    },
    {
      field: 'orderDate',
      headerText: 'Order Date',
      textAlign: 'Right',
      editType: 'stringedit',
      type: 'string'
    },
    {
      field: 'units',
      headerText: 'Units',
      editType: 'stringedit',
      type: 'string'
    }
  ];
  checkNewEdit: string;

  ngOnInit(): void {
    this.data = sortData;
    this.contextMenuItems = [
      { text: 'Edit ', target: '.e-headercontent', id: 'editCol' },
    ];
    (this.d2data = [
      { id: "string", type: "string" },
      { id: "number", type: "number" },
      { id: "boolean", type: "boolean" },
      { id: "datetime", type: "datetime" },
      { id: "date", type: "date" }
    ]);
  
    (this.d3data = [
      { id: "right", type: "Right" },
      { id: "left", type: "Left" },
      { id: "Center", type: "Center" }
    ]);

    (this.fields = { text: "type", value: "id" });
    console.log("this.dropdown2:",this.dropdown2)
    this.dropdown2.dataSource = this.d2data;
    this.dropdown2.value = "string";
  }
 contextMenuOpen(arg?: BeforeOpenCloseEventArgs): void {
   console.log("contextMenuOpen:",arg);
    this.rowIndex = arg.rowInfo.rowIndex;
    let elem: Element = arg.event.target as Element;

    if (arg.column.headerText == "Order Name") {
      this.columnValue = 1;
      this.columnField = "orderName";
    }
    if (arg.column.headerText == "Category") {
      this.columnValue = 2;
      this.columnField = "category";
    }
    if (arg.column.headerText == "Order Date") {
      this.columnValue = 3;

      this.columnField = "orderDate";
    }
    if (arg.column.headerText == "Units") {
      this.columnValue = 4;

      this.columnField = "units";
    }

    else{}
    let row: Element = elem.closest(".e-row");
    let uid: string = row && row.getAttribute("data-uid");
    
  }


  contextMenuClick(args): void {
    if (args.item.id === "editCol") {
      this.checkNewEdit = "edit";
      this.showEditColumn = true;
      this.getCurrentField();
    } 
     
  }
 
  public saveColumn() {
    if (this.checkNewEdit == 'edit') {
      var catched = false;

     

      this.treeColumns.forEach((r) => {
        console.log("R:",r);
        if (!catched) {
          console.log('catched:', catched);
          catched = true;
          var style = document.createElement('style');
          style.type = 'text/css';
          style.innerHTML = `.e-treegrid .e-headercell.cssClassaa { background-color: ${this.ColBColor}; 
            color:${this.ColFColor};
          }`;
          document.body.append(style);
        }

        if (r.field == this.columnField) {
          console.log('r.field:', r.field, 'columnField:', this.columnField);
          r.headerText = this.ColName;
          r.type = this.ColType;
          r.textAlign = this.ColAlign;
          r.minWidth = this.ColMinWidth;
          r['customAttributes'] = { class: 'cssClassaa' };
        }
      });

      this.treeColumns = [];

      this.treeColumns = this.listHeaders;

      this.treegrid.refreshColumns();
      this.textWrap = this.ColChecked;
    }

    this.showEditColumn = false;

    this.ejDialog.hide();
  }
  public changeFontColor(e: ChangeEventArgs): void {
    this.ColFColor = <string>e.value;
  }
 

  getCurrentField() {
  
    if (this.checkNewEdit == "edit") {
      this.ColName = this.treegrid.getColumnByField(
        this.columnField
      ).headerText;
     
      this.ColType = this.treegrid.getColumnByField(this.columnField).type;
      console.log("ColType:",this.ColType)
    } else {
      this.ColName = "";
      this.ColType = "";
    }
  }
}
