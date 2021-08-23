function OnEventLogCellHoverChanged(e) {
    e.cellElement.mousemove(function () {
        if (e.columnIndex === 0 || e.columnIndex === 2) {
            if (e.rowType === 'data') {
                var id = e.row.data.Id;
                var message = e.row.data.Message;
                popover = GetPopOver();
                popover.option("contentTemplate", message);
                popover.option("target", e.cellElement[0]);
                $("#popoverContainer").dxPopover("show");
            }
        }
    });
}

function ShowEventLogMessage(id, containerBody, message) {

    //var eventLogGrid = GetDataGridInstance('EventLogGrid');
    //var keys = [];
    //keys.push(id);

    //eventLogGrid.selectRows(keys, false);

    //var selectedRow = GetDataGridSelectedRowData('EventLogGrid');

    $('.popover').remove();

    $('#' + id).popover({
        title: 'Message',
        content: message, //selectedRow[0].Message,
        html: true,
        trigger: 'hover',
        placement: 'right',
        toggle: 'popover',
        container: containerBody
    });
    $('#' + id).popover('show');
}

function OnEventLogContextMenuPreparing(e) {
    
    if (typeof canRightClick === 'undefined') {
        canRightClick = true;
    }   

    if (!canRightClick)
        return;

    var grid = e.component;

    if (e.row.rowType === "data") {
        e.items = [{
            text: "Refresh",
            onItemClick: function () {
                //var grid = GetDataGridInstance('EventLogGrid');
                grid.refresh();
            }
        },
        {
            text: "Export to",
            onItemClick: function () {

            },
            items: [{
                text: "Excel",
                onItemClick: function () {
                    //var grid = GetDataGridInstance('EventLogGrid');
                    ExportData(grid);
                }
            }]
        },
        {
            text: "Column Chooser",
            onItemClick: function () {
                //var grid = GetDataGridInstance('EventLogGrid');
                ShowColumnChooser(grid);
            }
        }];
    }
}