import { Component, OnInit, ViewChild } from '@angular/core';
import { sortData } from './jsontreegriddata';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { DialogComponent } from "@syncfusion/ej2-angular-popups";
import { DropDownList, ChangeEventArgs } from "@syncfusion/ej2-dropdowns";
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [],
})
export class AppComponent {
  public data: Object[] = [];

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
  }
 contextMenuOpen(arg?: BeforeOpenCloseEventArgs): void {
    this.rowIndex = arg.rowInfo.rowIndex;
    let elem: Element = arg.event.target as Element;

    if (arg.column.headerText == "Task ID") {
      this.columnValue = 1;
      this.columnField = "TaskID";
    }
    if (arg.column.headerText == "Task Name") {
      this.columnValue = 2;
      this.columnField = "TaskName";
    }
    if (arg.column.headerText == "Start Date") {
      this.columnValue = 3;

      this.columnField = "StartDate";
    }
    if (arg.column.headerText == "End Date") {
      this.columnValue = 4;

      this.columnField = "EndDate";
    }
    if (arg.column.headerText == "Duration") {
      this.columnValue = 5;

      this.columnField = "Duration";
    }

    if (arg.column.headerText == "Progress") {
      this.columnValue = 6;

      this.columnField = "Progress";
    }
    if (arg.column.headerText == "Priority") {
      this.columnValue = 7;

      this.columnField = "Priority";
    } else {
      console.log("********arg.column*********: ", arg.column);
      this.columnValue = arg.column.index + 1;
      this.columnField = arg.column.field;
    }
    let row: Element = elem.closest(".e-row");
    let uid: string = row && row.getAttribute("data-uid");
    let items: Array<HTMLElement> = [].slice.call(
      document.querySelectorAll(".e-menu-item")
    );
    for (let i: number = 0; i < items.length; i++) {
      items[i].setAttribute("style", "display: none;");
    }
    if (elem.closest(".e-row")) {
      
      document
        .querySelectorAll("li#rndeDialog")[0]
        .setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#rndeRow")[0]
        .setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#rmultiSelect")[0]
        .setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#rcopy")[0]
        .setAttribute("style", "display: block;");

      document
        .querySelectorAll("li#cut")[0]
        .setAttribute("style", "display: block;");
      document
        .querySelectorAll("li#rsibling")[0]
        .setAttribute("style", "display: block;");

      document
        .querySelectorAll("li#rchild")[0]
        .setAttribute("style", "display: block;");
    } else {
      let len = this.treegrid.element.querySelectorAll(".e-treegridexpand")
        .length;
      if (len !== 0) {
        // document
        //   .querySelectorAll('li#style')[0]
        //   .setAttribute('style', 'display: block;');
        document
          .querySelectorAll("li#deleteCol")[0]
          .setAttribute("style", "display: block;");
        document
          .querySelectorAll("li#editCol")[0]
          .setAttribute("style", "display: block;");
        document
          .querySelectorAll("li#newCol")[0]
          .setAttribute("style", "display: block;");
        document
          .querySelectorAll("li#freeze")[0]
          .setAttribute("style", "display: block;");
        document
          .querySelectorAll("li#columnChooser")[0]
          .setAttribute("style", "display: block;");
        document
          .querySelectorAll("li#filter")[0]
          .setAttribute("style", "display: block;");
        document
          .querySelectorAll("li#multiSort")[0]
          .setAttribute("style", "display: block;");
      } else {
        document
          .querySelectorAll("li#expandall")[0]
          .setAttribute("style", "display: block;");
      }
    }
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
    } else {
      this.ColName = "";
      this.ColType = "";
    }
  }
}
