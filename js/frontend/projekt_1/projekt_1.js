/*Projekt 1 - Ein Tagesplan für Ihr Zeitmanagement */

 
/*WEB STORAGE */
 /*   

 loadPlaylist();

 var elements = {el:"", v:"", datum_von_edit:"", datum_bis_edit:""};

 function loadPlaylist() {
  
  var playlistArray = getSavedSongs();

  window.localStorage.removeItem("test17");
 
  if (playlistArray != null) {
    for(var i = 0; i < playlistArray.length; i++) {

    var table =  document.getElementById("planlist");
    var tbody =  document.getElementById("tbody");
    var tr = document.createElement("tr"); 
   
    //var elements = {el:, v:, datum_von_edit:, datum_bis_edit:};

    var element_count_td0 = document.createElement("td");
    element_count_td0.innerHTML = playlistArray[i].el;
    element_count_td0.setAttribute('data-el', playlistArray[i].el);

  //  element_count_td0.style.fontWeight = 'bold';
    element_count_td0.style.fontSize = "15px";

    var veranstaltung_td1 = document.createElement("td");
    veranstaltung_td1.innerHTML = playlistArray[i].v;
    veranstaltung_td1.setAttribute('data-ver', playlistArray[i].v); 

  //  veranstaltung_td1.style.fontWeight = 'bold';
    veranstaltung_td1.style.fontSize = "15px";   

    var von_datum_td2 = document.createElement("td");
    von_datum_td2.innerHTML = playlistArray[i].datum_von_edit;
    von_datum_td2.setAttribute('data-datum_v', playlistArray[i].datum_von_edit);        

 //   von_datum_td2.style.fontWeight = 'bold';
    von_datum_td2.style.fontSize = "15px";  

    var bis_datum_td3 = document.createElement("td");
    bis_datum_td3.innerHTML = playlistArray[i].datum_bis_edit;
    bis_datum_td3.setAttribute('data-datum_b', playlistArray[i].datum_bis_edit);      

 //   bis_datum_td3.style.fontWeight = 'bold';
    bis_datum_td3.style.fontSize = "15px";  

    var edit_td4 = document.createElement("td");
    var edit_td5 = document.createElement("button");
    edit_td5.setAttribute('class', 'btn btn-primary btn-md');
    edit_td5.setAttribute('data-id', playlistArray[i].el);
    var icon_edit = document.createElement("span");
    icon_edit.className ="glyphicon glyphicon-pencil";
    edit_td5.appendChild(icon_edit);

    edit_td4.appendChild(edit_td5);
    edit_td4.appendChild(document.createTextNode('\u00a0'));
    edit_td4.appendChild(document.createTextNode('\u00a0'));
    edit_td4.appendChild(document.createTextNode('\u00a0'));


    $('#frontend_projekt_1_modal_edit')
        .on('success.form.fv', function(e) {
            // Save the form data via an Ajax request
            e.preventDefault();

            var name = document.getElementById("ver_edit").value; 
            var start = document.getElementById("datum_von_edit").value;
            var end = document.getElementById("datum_bis_edit").value;
*/

/*
            var $form = $(e.target),
              id    = $form.find('[name="id"]').val(); 
*/ 
/*    
            name    = $form.find('[name="data-ver"]').val(),
            start    = $form.find('[name="data-datum_v"]').val(),
            end    = $form.find('[name="data-datum_b"]').val();
*/
/* 
            // Get the cells
            var $button = $('button[data-id="' + id + '"]'),
                $tr     = $button.closest('tr'),
                $cells  = $tr.find('td');


            // Update the cell data
            $cells
                .eq(1).html(name).end()
                .eq(2).html(start).end()
                .eq(3).html(end).end();



            // Hide the dialog
            $form.parents('.bootbox').modal('hide');

            // You can inform the user that the data is updated successfully
            // by highlighting the row or showing a message box
            // alert('The user profile is updated'); 
       
          });
 */   
/* 
    $(edit_td5).on('click', function() {
        
               // Get the record's ID via attribute
        var id = $(this).attr('data-id');


        var name = $(this).attr('data-ver'); 
        var start = $(this).attr('data-datum_v');
        var end = $(this).attr('data-datum_b');
    

        $('#frontend_projekt_1_modal_edit')
            .find('[name="id"]').val(id).end()
            .find('[name="planTextInput_edit"]').val(name).end()
            .find('[name="planCalendarVonInput_edit"]').val(start).end()
            .find('[name="planCalendarBisInput_edit"]').val(end).end();        
        bootbox
            .dialog({
                title: 'Veranstaltung ändern',
                message: $('#frontend_projekt_1_modal_edit'),
                show: false // We will show it manually later
            })
            .on('shown.bs.modal', function() {
                $('#frontend_projekt_1_modal_edit')
                    .show()                             // Show the login form
                    .formValidation('resetForm'); // Reset form
            })
            .on('hide.bs.modal', function(e) {
                // Bootbox will remove the modal (including the body which contains the login form)
                // after hiding the modal
                // Therefor, we need to backup the form
                $('#frontend_projekt_1_modal_edit').hide().appendTo('#frontend_projekt_1_modal');
            })
            .modal('show');

});

    var delete_td7 = document.createElement("button");
    delete_td7.setAttribute('class', 'btn btn-danger btn-md');
    var icon_delete = document.createElement("span");
    icon_delete.className ="glyphicon glyphicon-trash";
    delete_td7.appendChild(icon_delete);

    delete_td7.onclick = function(){

      $.confirm({
          icon: 'fa fa-warning',
          title: '',
          escapeKey: 'cancel',
          theme: 'material', // 'material',
          content: 'Möchten Sie den Datensatz wirklich löschen?',
          type: 'red',
          typeAnimated: true,
          animationSpeed: 200 , // 2 seconds

          autoClose: 'cancel|8000',
          buttons: {
              deleteUser: {
                  text: 'Ok',
                  btnClass: 'btn-red',
                  action: function () {
                    $(delete_td7).closest('tr').remove();
                     auto_correct_id();
                  }
              },
              cancel: function () {
              }
          }
      });
    }

    edit_td4.appendChild(delete_td7);

    tr.appendChild(element_count_td0);
    tr.appendChild(veranstaltung_td1);
    tr.appendChild(von_datum_td2);
    tr.appendChild(bis_datum_td3);
    tr.appendChild(edit_td4);

    tbody.appendChild(tr);
    table.appendChild(tbody);

    

    if (elements == null){
        var elements = new Object();
    }

    elements.el = element_count_td0.innerHTML;
    elements.v = veranstaltung_td1.innerHTML;
    elements.datum_von_edit = von_datum_td2.innerHTML;
    elements.datum_bis_edit = bis_datum_td3.innerHTML;

    save(elements);

    }
  }

}


function getSavedSongs() {
  return getStoreArray("test17");
}


function getStoreArray(key) {
  var playlistArray = localStorage.getItem(key);
  if (playlistArray == null || playlistArray == "") {
   // playlistArray = new Array();
      playlistArray = [];
 //     console.log(playlistArray);
  }
  else {
    playlistArray = JSON.parse(playlistArray);
  }
  return playlistArray;
}


function save(item) {
  var playlistArray = getStoreArray("test17");
  playlistArray.push(item);
  localStorage.setItem("test17", JSON.stringify(playlistArray));

}
 */
/*WEB STORAGE */



function add_plan(von_datum, bis_datum, veranstaltung){

  document.getElementById("tbody").style.fontSize = "small";
  var element_count = document.getElementById("tbody").childElementCount;
  
  ++element_count;

    var table =  document.getElementById("planlist");
    var tbody =  document.getElementById("tbody");
    var tr = document.createElement("tr");

    var element_count_td0 = document.createElement("td");
    element_count_td0.innerHTML = element_count;

  //  element_count_td0.style.fontWeight = 'bold';
    element_count_td0.style.fontSize = "15px";

    var veranstaltung_td1 = document.createElement("td");
    veranstaltung_td1.innerHTML = veranstaltung;

 //   veranstaltung_td1.style.fontWeight = 'bold';
    veranstaltung_td1.style.fontSize = "15px";   

    var von_datum_td2 = document.createElement("td");
    von_datum_td2.innerHTML = von_datum;

 //   von_datum_td2.style.fontWeight = 'bold';
    von_datum_td2.style.fontSize = "15px";      

    var bis_datum_td3 = document.createElement("td");
    bis_datum_td3.innerHTML = bis_datum;

 //   bis_datum_td3.style.fontWeight = 'bold';
    bis_datum_td3.style.fontSize = "15px";   

    var edit_td4 = document.createElement("td");
    var edit_td5 = document.createElement("button");
    
    edit_td5.setAttribute('class', 'btn btn-primary btn-md');
    edit_td5.setAttribute('data-id', element_count);
    edit_td5.setAttribute('data-ver', veranstaltung);
    edit_td5.setAttribute('data-datum_v', von_datum);
    edit_td5.setAttribute('data-datum_b', bis_datum);
        
    var icon_edit = document.createElement("span");
    icon_edit.className ="glyphicon glyphicon-pencil";
    edit_td5.appendChild(icon_edit);

   // element_count_td0.appendChild(document.createTextNode(element_count));
   // veranstaltung_td1.appendChild(document.createTextNode(veranstaltung));
   // von_datum_td2.appendChild(document.createTextNode(von_datum));
   // bis_datum_td3.appendChild(document.createTextNode(bis_datum));
   
    edit_td4.appendChild(edit_td5);
    edit_td4.appendChild(document.createTextNode('\u00a0'));
    edit_td4.appendChild(document.createTextNode('\u00a0'));
    edit_td4.appendChild(document.createTextNode('\u00a0'));

    
    $('#frontend_projekt_1_modal_edit')
        .on('success.form.fv', function(e) {
            // Save the form data via an Ajax request
            e.preventDefault();

            var name = document.getElementById("ver_edit").value; 
            var start = document.getElementById("datum_von_edit").value;
            var end = document.getElementById("datum_bis_edit").value;

/*          
            edit_td5.setAttribute('data-ver', name);
            edit_td5.setAttribute('data-datum_v', start);
            edit_td5.setAttribute('data-datum_b', end);
*/
            var $form = $(e.target),
                id    = $form.find('[name="id"]').val();

            /*    name    = $form.find('[name="data-ver"]').val(),
                start    = $form.find('[name="data-datum_v"]').val(),
                end    = $form.find('[name="data-datum_b"]').val();
            */

            // Get the cells
            var $button = $('button[data-id="' + id + '"]'),
                $tr     = $button.closest('tr'),
                $cells  = $tr.find('td');


            // Update the cell data
            $cells
                .eq(1).html(name).end()
                .eq(2).html(start).end()
                .eq(3).html(end).end();



            // Hide the dialog
            $form.parents('.bootbox').modal('hide');

            // You can inform the user that the data is updated successfully
            // by highlighting the row or showing a message box
            // alert('The user profile is updated'); 
       
          });
    

    $(edit_td5).on('click', function() {
        
               // Get the record's ID via attribute
        var id = $(this).attr('data-id');


        var name = $(this).attr('data-ver'); 
        var start = $(this).attr('data-datum_v');
        var end = $(this).attr('data-datum_b');
    

        $('#frontend_projekt_1_modal_edit')
            .find('[name="id"]').val(id).end()
            .find('[name="planTextInput_edit"]').val(name).end()
            .find('[name="planCalendarVonInput_edit"]').val(start).end()
            .find('[name="planCalendarBisInput_edit"]').val(end).end();        
        bootbox
            .dialog({
                title: 'Veranstaltung ändern',
                message: $('#frontend_projekt_1_modal_edit'),
                show: false // We will show it manually later
            })
            .on('shown.bs.modal', function() {
                $('#frontend_projekt_1_modal_edit')
                    .show()                             // Show the login form
                    .formValidation('resetForm'); // Reset form
            })
            .on('hide.bs.modal', function(e) {
                // Bootbox will remove the modal (including the body which contains the login form)
                // after hiding the modal
                // Therefor, we need to backup the form
                $('#frontend_projekt_1_modal_edit').hide().appendTo('#frontend_projekt_1_modal');
            })
            .modal('show');

});

    var delete_td7 = document.createElement("button");
    delete_td7.setAttribute('class', 'btn btn-danger btn-md');
    var icon_delete = document.createElement("span");
    icon_delete.className ="glyphicon glyphicon-trash";
    delete_td7.appendChild(icon_delete);

    delete_td7.onclick = function(){

      $.confirm({
          icon: 'fa fa-warning',
          title: '',
          escapeKey: 'cancel',
          theme: 'material', // 'material',
          content: 'Möchten Sie den Datensatz wirklich löschen?',
          type: 'red',
          typeAnimated: true,
          animationSpeed: 200 , // 2 seconds

          autoClose: 'cancel|8000',
          buttons: {
              deleteUser: {
                  text: 'Ok',
                  btnClass: 'btn-red',
                  action: function () {
                     $(delete_td7).closest('tr').remove();
                     auto_correct_id();
                  }
              },
              cancel: function () {

              }
          }
      });
    }

    edit_td4.appendChild(delete_td7);

    tr.appendChild(element_count_td0);
    tr.appendChild(veranstaltung_td1);
    tr.appendChild(von_datum_td2);
    tr.appendChild(bis_datum_td3);
    tr.appendChild(edit_td4);

    tbody.appendChild(tr);
    table.appendChild(tbody);




/*
    elements.el = element_count_td0.innerHTML;
    elements.v = veranstaltung_td1.innerHTML;
    elements.datum_von_edit = von_datum_td2.innerHTML;
    elements.datum_bis_edit = bis_datum_td3.innerHTML;

    save(elements);
*/
//  console.log(elements);

    return false;
}




$(function () {
$('#planCalendarVonInput').datetimepicker({
//    var locale = window.navigator.userLanguage || window.navigator.language;
    locale: 'de',
    format: 'DD.MM.YYYY HH:mm'
});

$('#planCalendarBisInput').datetimepicker({
    locale: 'de',
    useCurrent: false, //Important! See issue #1075
//    moment(testDate).format('MM/DD/YYYY');
    format: 'DD.MM.YYYY HH:mm'
});
$("#planCalendarVonInput").on("dp.change", function (e) {
    $('#planCalendarBisInput').data("DateTimePicker").minDate(e.date);
});
$("#planCalendarBisInput").on("dp.change", function (e) {
    $('#planCalendarVonInput').data("DateTimePicker").maxDate(e.date);
});

$('#datum_von_edit').datetimepicker({
//    var locale = window.navigator.userLanguage || window.navigator.language;
    locale: 'de',
    format: 'DD.MM.YYYY HH:mm'
});

$('#datum_bis_edit').datetimepicker({
    locale: 'de',
    useCurrent: false, //Important! See issue #1075
//    moment(testDate).format('MM/DD/YYYY');
    format: 'DD.MM.YYYY HH:mm'
});
$("#datum_von_edit").on("dp.change", function (e) {
    $('#datum_bis_edit').data("DateTimePicker").minDate(e.date);
});
$("#datum_bis_edit").on("dp.change", function (e) {
    $('#datum_von_edit').data("DateTimePicker").maxDate(e.date);
});


});

$(document).ready(function(){

    $('.filterable .btn-filter').click(function(){
        var $panel = $(this).parents('.filterable'),
        $filters = $panel.find('.filters input'),
        $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') == true) {
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
        }
          document.getElementById("p_a").innerHTML="<input type='text' class='form-control' placeholder='Action' disabled=''>";
    });

    $('.filterable .filters input').keyup(function(e){
        /* Ignore tab key */
        var code = e.keyCode || e.which;
        if (code == '9') return;
        /* Useful DOM data and selectors */
        var $input = $(this),
        inputContent = $input.val().toLowerCase(),
        $panel = $input.parents('.filterable'),
        column = $panel.find('.filters th').index($input.parents('th')),
        $table = $panel.find('.table'),
        $rows = $table.find('tbody tr');
        /* Dirtiest filter function ever ;) */
        var $filteredRows = $rows.filter(function(){
            var value = $(this).find('td').eq(column).text().toLowerCase();
            return value.indexOf(inputContent) === -1;
        });
        /* Clean previous no-result if exist */
        $table.find('tbody .no-result').remove();
        /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
        $rows.show();
        $filteredRows.hide();
        /* Prepend no-result row if all rows are filtered */
        if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="'+ $table.find('.filters th').length +'">Es werden leider keine Ergebnisse gefunden...</td></tr>'));
        }
    });
});

function frontend_projekt_1_begins_wert(){

  document.getElementById("planTextInput").value = "Muster";
 $("#planCalendarVonInput").val( moment().format('DD.MM.YYYY HH:mm') );
 $("#planCalendarBisInput").val( moment().add(1,'h').format('DD.MM.YYYY HH:mm') );
    
    
}

function add_header(){
  document.getElementById("p_id").innerHTML="<input type='text' class='form-control' placeholder='ID' disabled=''>ID";
  document.getElementById("p_v").innerHTML="<input type='text' class='form-control' placeholder='Veranstaltung' disabled=''>Veranstaltung";
  document.getElementById("p_datum_von").innerHTML="<input type='text' class='form-control' placeholder='Datum_Von' disabled=''>Datum_Von";
  document.getElementById("p_datum_bis").innerHTML="<input type='text' class='form-control' placeholder='Datum_Bis' disabled=''>Datum_Bis";
  document.getElementById("p_a").innerHTML="<input type='text' class='form-control' placeholder='Action' disabled=''>Action";
}

function delete_header(){
  document.getElementById("p_id").innerHTML="<input type='text' class='form-control' placeholder='ID' disabled=''>";
  document.getElementById("p_v").innerHTML="<input type='text' class='form-control' placeholder='Veranstaltung' disabled=''>";
  document.getElementById("p_datum_von").innerHTML="<input type='text' class='form-control' placeholder='Datum_Von' disabled=''>";
  document.getElementById("p_datum_bis").innerHTML="<input type='text' class='form-control' placeholder='Datum_Bis' disabled=''>";
  document.getElementById("p_a").innerHTML="<input type='text' class='form-control' placeholder='Action' disabled=''>";

}

        $("#exportButton_pdf").click(function () {
            // parse the HTML table element having an id=exportTable
            add_header();
            var dataSource = shield.DataSource.create({
                data: "#planlist",
                schema: {
                    type: "table",
                    fields: {
                        'ID': { type: String },
                         Veranstaltung: { type: String },
                        'Datum_Von': { type: String },
                        'Datum_Bis': { type: String }

                    }
                }
            });

            // when parsing is done, export the data to PDF
            dataSource.read().then(function (data) {
                var pdf = new shield.exp.PDFDocument({
                    author: "BOIV",
                    created: new Date()
                });

                pdf.addPage("a4", "portrait");

                pdf.table(
                    50,
                    50,
                    data,
                    [
                        { field: "ID", title: "ID", width: 70 },
                        { field: "Veranstaltung", title: "Veranstaltung", width: 200 },
                        { field: "Datum_Von", title: "Datum(Von)", width: 100 },
                        { field: "Datum_Bis", title: "Datum(Bis)", width: 100 },
                    ],
                    {
                        margins: {
                            top: 50,
                            left: 50
                        }
                    }
                );

                pdf.saveAs({
                    fileName: "Planlist_PDF"
                });
            });
            delete_header();
        });


        $("#exportButton_excel").click(function () {
            // parse the HTML table element having an id=exportTable
            add_header();
            var dataSource = shield.DataSource.create({
                data: "#planlist",
                schema: {
                    type: "table",
                    fields: {
                        'ID': { type: String },
                         Veranstaltung: { type: String },
                        'Datum_Von': { type: String },
                        'Datum_Bis': { type: String }
                    }
                }
            });

            // when parsing is done, export the data to Excel
            dataSource.read().then(function (data) {
                new shield.exp.OOXMLWorkbook({
                    author: "BOIV",
                    worksheets: [
                        {
                            name: "Planlist_Excel Table",
                            rows: [
                                {
                                    cells: [
                                         {
                                            style: {
                                                bold: true
                                            },
                                            type: String,
                                            value: "ID"
                                        },
                                        {
                                            style: {
                                                bold: true
                                            },
                                            type: String,
                                            value: "Veranstaltung"
                                        },
                                        {
                                            style: {
                                                bold: true
                                            },
                                            type: String,
                                            value: "Datum (Von)"
                                        },
                                        {
                                            style: {
                                                bold: true
                                            },
                                            type: String,
                                            value: "Datum (Bis)"
                                        }
                                    ]
                                }
                            ].concat($.map(data, function(item) {
                                return {
                                    cells: [
                                        { type: String, value: item.ID },
                                        { type: String, value: item.Veranstaltung },
                                        { type: String, value: item.Datum_Von },
                                        { type: String, value: item.Datum_Bis },

                                    ]
                                };
                            }))
                        }
                    ]
                }).saveAs({
                    fileName: "Planlist_EXCEL"
                });
            });
            delete_header();
        });

function auto_correct_id(){
  var tableElements = document.getElementById("tbody");
  var elements = tableElements.getElementsByTagName('tr');
  var k = 0;
  for (var i = 0; i < elements.length; i++)
  elements[i].firstChild.innerHTML = ++k;
}

/*$('planlist').on('click','.delete',function(){
  $(this).parents('tr').remove();
});*/


/*Projekt 1 - Ein Tagesplan für Ihr Zeitmanagement */
