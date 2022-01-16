import { Component, OnInit, ViewChild } from '@angular/core';
import { sortData } from './jsontreegriddata';
import { TreeGridComponent , SortService} from '@syncfusion/ej2-angular-treegrid';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxAllModule} from '@syncfusion/ej2-angular-buttons';
import { SortEventArgs } from '@syncfusion/ej2-grids';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    providers: [SortService]
    
})
export class AppComponent {
    public data: Object[] = [];
    public sortSettings: Object;
    public contextMenuItems: Object;
@ViewChild('treegrid')
public treegrid : TreeGridComponent ;
@ViewChild('orderName')
public orderName: CheckBoxComponent;
@ViewChild('category')
public category: CheckBoxComponent;
@ViewChild('orderDate')
public orderDate: CheckBoxComponent;
@ViewChild('units')
public units: CheckBoxComponent;
@ViewChild('price')
public price: CheckBoxComponent;
    ngOnInit(): void {
        this.data = sortData;
        this.contextMenuItems = [
          
      
            { text: "Edit ", target: ".e-headercontent", id: "editCol" },
          
          ];
         
    
    }
    public onClick1(e: MouseEvent): void {
        if (this.orderName.checked) {
            this.treegrid.sortByColumn('orderName', 'Ascending', true);
        } else {
            this.treegrid.grid.removeSortColumn('orderName');
        }

    }
    public onClick2(e: MouseEvent): void {
        if (this.category.checked) {
            this.treegrid.sortByColumn('Category', 'Ascending', true);
        } else {
            this.treegrid.grid.removeSortColumn('Category');
        }

    }
    public onClick3(e: MouseEvent): void {
        if (this.orderDate.checked) {
            this.treegrid.sortByColumn('orderDate', 'Ascending', true);
        } else {
            this.treegrid.grid.removeSortColumn('orderDate');
        }

    }
    public onClick4(e: MouseEvent): void {
        if (this.units.checked) {
            this.treegrid.sortByColumn('units', 'Ascending', true);
        } else {
            this.treegrid.grid.removeSortColumn('units');
        }

    }

    public sort (args: SortEventArgs ): void {
        if (args.requestType === 'sorting') {
            for (let columns of this.treegrid.getColumns()) {
                for (let sortcolumns of this.treegrid.sortSettings.columns) {
                    if (sortcolumns.field === columns.field) {
                        this.check(sortcolumns.field, true); break;
                    } else {
                        this.check(columns.field, false);
                    }
                }
            }
        }

    }
    public check(field: string, state: boolean): void {
        switch (field) {
            case 'orderName':
                this.orderName.checked = state; break;
            case 'Category':
                this.category.checked = state; break;
            case 'orderDate':
                this.orderDate.checked = state; break;
            case 'units':
                this.units.checked = state; break;
            case 'price':
                this.price.checked = state; break;
        }
    }

    contextMenuClick(args): void {
        // this.MultiSelect = true;
        if (args.item.text == "Cut") {
          this.flag = true;
          // for (
          //   var i = 0;
          //   i < this.treegrid.getSelectedRowCellIndexes()[0].cellIndexes.length;
          //   i++
          // ) {
          //   this.fieldData.push(
          //     this.treegrid.getColumnByIndex(
          //       this.treegrid.getSelectedRowCellIndexes()[0].cellIndexes[i]
          //     ).field
          //   );
          // }
          // this.cutIndex = this.treegrid.getSelectedRowCellIndexes();
          // this.treegrid.copyHierarchyMode = 'None';
          // this.treegrid.copy();
          this.cutRow = this.treegrid.getRowByIndex(this.rowIndex);
          this.cutRowBool = true;
          this.treegrid.copyHierarchyMode = "None";
          this.treegrid.copy();
          this.cutRow.setAttribute("style", "background:#FFC0CB;");
        }
        if (args.item.id == "rsibling") {
          if (this.cutRowBool == true) {
            var copyContent = this.treegrid.clipboardModule.copyContent;
    
            // this.treegrid.paste(copyContent, rowIndex);
    
            var stringArray = copyContent.split("\t");
            let newRecord: Treerow = new Treerow(
              stringArray[0],
              stringArray[1],
              stringArray[2],
              stringArray[3],
              stringArray[4],
              stringArray[5],
              stringArray[6],
              this.selectedRow.data.ParentItem
            );
            newRecord.children = [];
            newRecord.isParent = true;
            newRecord.id = uuidv4();
            const body = {
              TaskID: newRecord.TaskID,
              TaskName: newRecord.TaskName,
              StartDate: newRecord.StartDate,
              EndDate: newRecord.EndDate,
              Duration: newRecord.Duration,
              Progress: newRecord.Progress,
              Priority: newRecord.Priority,
              isParent: newRecord.isParent,
              ParentItem: newRecord.ParentItem
            };
            this.http
              .delete<any>(
                `https://vom-app.herokuapp.com/tasks/${newRecord.TaskID}`
              )
              .subscribe((data) => {
                console.log("post:------------------1", data);
                // this.treegrid.refresh();
                this.dataManager
                  .executeQuery(new Query())
                  .then(
                    (e: ReturnOption) => (this.data = e.result.data as object[])
                  )
                  .catch((e) => true);
              });
            this.http
              .post<any>("https://vom-app.herokuapp.com/tasks", body)
              .subscribe((data) => {
                this.dataManager
                  .executeQuery(new Query())
                  .then(
                    (e: ReturnOption) => (this.data = e.result.data as object[])
                  )
                  .catch((e) => true);
              });
    
            // this.treegrid.addRecord(newRecord, 0, 'Above');
    
            this.cutRowBool = false;
            this.copiedRow.setAttribute("style", "background:white;");
          } else {
            var copyContent = this.treegrid.clipboardModule.copyContent;
    
            // this.treegrid.paste(copyContent, rowIndex);
    
            var stringArray = copyContent.split("\t");
            let newRecord: Treerow = new Treerow(
              stringArray[0],
              stringArray[1],
              stringArray[2],
              stringArray[3],
              stringArray[4],
              stringArray[5],
              stringArray[6],
              this.selectedRow.data.ParentItem
            );
            newRecord.children = [];
            newRecord.isParent = true;
            newRecord.id = uuidv4();
            const body = {
              TaskID: newRecord.TaskID,
              TaskName: newRecord.TaskName,
              StartDate: newRecord.StartDate,
              EndDate: newRecord.EndDate,
              Duration: newRecord.Duration,
              Progress: newRecord.Progress,
              Priority: newRecord.Priority,
              isParent: newRecord.isParent,
              ParentItem: newRecord.ParentItem
            };
    
            this.http
              .post<any>("https://vom-app.herokuapp.com/tasks", body)
              .subscribe((data) => {
                console.log("post:------------------2", data);
                this.dataManager
                  .executeQuery(new Query())
                  .then(
                    (e: ReturnOption) => (this.data = e.result.data as object[])
                  )
                  .catch((e) => true);
              });
            this.dataManager
              .executeQuery(new Query())
              .then((e: ReturnOption) => (this.data = e.result.data as object[]))
              .catch((e) => true);
            // this.treegrid.addRecord(newRecord, 0, 'Above');
    
            this.copiedRow.setAttribute("style", "background:white;");
          }
        }
    
        if (args.item.id == "rchild") {
          if (this.cutRowBool == true) {
            var copyContent = this.treegrid.clipboardModule.copyContent;
    
            // this.treegrid.paste(copyContent, rowIndex);
    
            var stringArray = copyContent.split("\t");
            let newRecord: Treerow = new Treerow(
              stringArray[0],
              stringArray[1],
              stringArray[2],
              stringArray[3],
              stringArray[4],
              stringArray[5],
              stringArray[6],
              this.selectedRow.data.TaskID
            );
            newRecord.children = [];
            newRecord.isParent = true;
            newRecord.id = uuidv4();
            const body = {
              TaskID: newRecord.TaskID,
              TaskName: newRecord.TaskName,
              StartDate: newRecord.StartDate,
              EndDate: newRecord.EndDate,
              Duration: newRecord.Duration,
              Progress: newRecord.Progress,
              Priority: newRecord.Priority,
              isParent: newRecord.isParent,
              ParentItem: newRecord.ParentItem
            };
            this.http
              .delete<any>(
                `https://vom-app.herokuapp.com/tasks/${newRecord.TaskID}`
              )
              .subscribe((data) => {
                console.log("post:--------------3----3", data);
                this.treegrid.refresh();
                this.http
                  .post<any>("https://vom-app.herokuapp.com/tasks", body)
                  .subscribe((data) => {
                    this.dataManager
                      .executeQuery(new Query())
                      .then(
                        (e: ReturnOption) => (this.data = e.result.data as object[])
                      )
                      .catch((e) => true);
                  });
              });
    
            // this.treegrid.addRecord(newRecord, 0, 'Above');
    
            this.cutRowBool = false;
            this.copiedRow.setAttribute("style", "background:white;");
          } else {
            var copyContent = this.treegrid.clipboardModule.copyContent;
            var stringArray = copyContent.split("\t");
            let newRecord: Treerow = new Treerow(
              stringArray[0],
              stringArray[1],
              stringArray[2],
              stringArray[3],
              stringArray[4],
              stringArray[5],
              stringArray[6],
              this.selectedRow.data.TaskID
            );
            newRecord.children = [];
            newRecord.isParent = false;
            newRecord.id = uuidv4();
            const body = {
              TaskID: newRecord.TaskID,
              TaskName: newRecord.TaskName,
              StartDate: newRecord.StartDate,
              EndDate: newRecord.EndDate,
              Duration: newRecord.Duration,
              Progress: newRecord.Progress,
              Priority: newRecord.Priority,
              isParent: newRecord.isParent,
              ParentItem: newRecord.ParentItem
            };
    
            this.http
              .post<any>("https://vom-app.herokuapp.com/tasks", body)
              .subscribe((data) => {
                console.log("post:------------------4", data);
                this.dataManager
                  .executeQuery(new Query())
                  .then(
                    (e: ReturnOption) => (this.data = e.result.data as object[])
                  )
                  .catch((e) => true);
              });
    
            // this.treegrid.addRecord(newRecord, this.selectedRow.row.rowIndex,'Child');
            this.copiedRow.setAttribute("style", "background:white;");
          }
        } else if (args.item.id === "deleteCol") {
          this.deleteColumnX();
        } else if (args.item.id === "rndeDialog") {
          this.editSettings = {
            allowEditing: true,
            allowAdding: true,
            allowDeleting: true,
            mode: "Dialog",
            newRowPosition: "Below"
          };
          this.toolbar = ["Add", "Edit", "Delete"];
        } else if (args.item.id === "rndeRow") {
          this.editSettings = {
            allowEditing: true,
            allowAdding: true,
            allowDeleting: true,
            mode: "Row"
          };
          this.toolbar = ["Add", "Edit", "Delete", "Update"];
        } else if (args.item.id === "rmultiSelect") {
          this.MultiSelect = true;
        } else if (args.item.id === "editCol") {
          this.checkNewEdit = "edit";
          this.showEditColumn = true;
          this.getCurrentField();
        } else if (args.item.id === "newCol") {
          this.checkNewEdit = "add";
          this.showEditColumn = true;
          this.getCurrentField();
        }
        // else if (args.item.id === 'style') {
        //   this.Properties = !this.Properties;
        // }
        else if (args.item.id === "columnChooser") {
          this.showChooser = !this.showChooser;
        } else if (args.item.id === "multiSort") {
          this.sorting = !this.sorting;
        } else if (args.item.id === "filter") {
          // this.treegrid.refreshColumns();
          this.filtering = true;
          console.log("this.filtering:", this.filtering);
        } else if (args.item.id === "freeze") {
          // this.treegrid.frozenColumns = "1";
          // console.log(
          //   "this.treegrid.getVisibleColumns():",
          //   this.treegrid.getVisibleColumns(),
          //   "args.itemData:",
          //   args.column.field
          // );
          // for (let i = 0; i < this.treegrid.getVisibleColumns().length; i++) {
          //   console.log(
          //     "this.treegrid.getVisibleColumns()[i].field:",
          //     this.treegrid.getVisibleColumns()[i].field
          //   );
          //   if (args.column.field == this.treegrid.getVisibleColumns()[i].field) {
          //     this.treegrid.getVisibleColumns()[i].isFrozen = true;
          //   }
          // }
    
          this.treegrid.grid.height = "1080";
          // this.IScrol = false;
          this.treegrid.frozenColumns = this.columnValue;
          this.activeFreeze = true;
          this.treegrid.refresh();
          // let columnName: string = this.columnDropDown.value as string;
          // console.log(
          //   "this.treegrid.grid.getMovableColumns():",
          //   this.treegrid.grid.getMovableColumns()
          // );
          // // if (this.treegrid.getColumns().length - 1 > this.treegrid.getFrozenColumns()) {
    
          // for (let i = 0; i < this.treegrid.getVisibleColumns().length; i++) {
          //   if (args.column.field == this.treegrid.getVisibleColumns()[i].field) {
          //     this.treegrid.getVisibleColumns()[i].isFrozen = true;
          //   }
          // }
          // this.treegrid.refreshColumns();
    
          // if (
          //   mvblColumns.length === 1 &&
          //   args.column.field === mvblColumns[0].field
          // ) {
          // this.alertDialog.show();
          // this.refresh = false;
          // this.directionDropDown.value = 'Center';
          // this.directionDropDown.refresh();
          // } else {
          // this.treegrid.grid.getColumnByField(
          //   args.column.field
          // ).freeze = "Left" as freezeDirection;
          // e.value === 'Center' ? undefined : (e.value as freezeDirection);
          // this.treegrid.refreshColumns();
          // console.log("-----Else------");
          // }
    
          // this.treegrid.grid.getColumnByField(args.column.field).freeze = "Left";
          // console.log("treegrid:", this.treegrid);
          // this.treegrid.refreshColumns();
          // console.log(
          //   "this.treegrid.grid.getColumnByField(args.column.field).freeze:",
          //   this.treegrid.grid.getColumnByField(args.column.field).freeze
          // );
          // this.treegrid.height='100vh'
        } else if (args.item.id === "rcopy") {
          this.MultiSelect = true;
    
          this.editSettings = {
            allowEditing: true,
            allowAdding: true,
            allowDeleting: true,
    
            newRowPosition: "Child",
            mode: "Batch"
          };
          this.copiedRow = this.treegrid.getRowByIndex(this.rowIndex);
    
          this.treegrid.copyHierarchyMode = "None";
          this.treegrid.copy();
          this.copiedRow.setAttribute("style", "background:#FFC0CB;");
        }
      }
}