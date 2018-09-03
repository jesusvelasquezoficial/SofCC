<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="<?= FOLDER_PATH ?>/style/js/jquery.min.js"></script>
<script src="<?= FOLDER_PATH ?>/style/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js"></script>
<script src="http://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script src="<?= FOLDER_PATH ?>/style/js/main.js"></script>

<script>
    $(document).ready(function() {
      var error = <?= !empty($error_message) ? 'true' : 'false'; ?>;
      if (error) {
        closeErrorMsj();
      }
      MyChartLine();
      OrdersTable();

    });

    function closeErrorMsj() {
      $("#ErrorMsj").removeClass('d-none');
      setTimeout(function() {
        $("#ErrorMsj").addClass('d-none');
      }, 3000);
    }

    function MyChartLine() {    	
      var MONTHS = $.ajax({
      	url: '<?= FOLDER_PATH ?>/ProfitLoss/getOrdersMon',
      	type: 'POST'
      })
      .done(function(data) {
      	console.log(data);
      })
      .fail(function() {
      	console.log("error");
      }).responseText;
      var ctx = $("#myChart");
	    var config = {
	      type: 'line',
	      data: {
	        labels: MONTHS,
	        datasets: [{
	          label: 'Profit',
	          backgroundColor: "blue",
	          borderColor: "blue",
	          data: [1,3,6,4,5,4,4,5,6,5,8,6],
	          fill: false,
	        },{
	          label: 'Loss',
	          fill: false,
	          backgroundColor: "red",
	          borderColor: "red",
	          data: [0,2,3,3,2,3,2,4,4,4,2,1],
	        }]
	      },
	      options: {
	        responsive: true,
	        title: {
	          display: true,
	          text: 'Monthly operations report',
	          fontSize: 20,
	          fontColor: '#000'
	        },
	        tooltips: {
	          mode: 'index',
	          intersect: false,
	        },
	        hover: {
	          mode: 'nearest',
	          intersect: true
	        },
	        scales: {
	          xAxes: [{
	            display: true,
	            scaleLabel: {
	              display: true,
	              labelString: 'Month',
	              fontSize: 14,
	              fontColor: '#000'
	            }
	          }],
	          yAxes: [{
	            display: true,
	            scaleLabel: {
	              display: true,
	              labelString: 'Operations numbers',
	              fontSize: 14,
	              fontColor: '#000'
	            }
	          }]
	        }
	      }
	    };

      var chartLine = new Chart(ctx, config);
    }
    function OrdersTable(argument) {      
      $('#OrdersTable').DataTable( {  
        "bDeferRender": true,     
        "sPaginationType": "full_numbers",
        "ajax": {
          "url": "<?= FOLDER_PATH ?>/ProfitLoss/getOrders",
          "type": "POST"
        },          
        "columns": [
          { "data": "fecha" },
          { "data": "pair" },
          { "data": "type" },
          { "data": "side" },
          { "data": "price" },
          { "data": "amount" },
          { "data": "totalbtc" },
          { "data": "eliminar" }
          ],
        "oLanguage": {
            "sProcessing":     "Procesando...",
            "sLengthMenu": 'Mostrar <select>'+
                '<option value="10">10</option>'+
                '<option value="20">20</option>'+
                '<option value="30">30</option>'+
                '<option value="40">40</option>'+
                '<option value="50">50</option>'+
                '<option value="-1">All</option>'+
                '</select> registros',    
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando del (_START_ al _END_) un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando del 0 al 0 un total de 0 registros",
            "sInfoFiltered":   "(filtrado un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Filtrar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Por favor espere - cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
            }
      });
    }

    function deleteOrder(res) {
      if (confirm('¿Seguro que desea eliminar?.')) {
        $.ajax({
        url: '<?=FOLDER_PATH?>/ProfitLoss/deleteOrder',
        type: 'POST',
        data: {id: res},
      })
      .done(function(data) {
        location.href = "<?=FOLDER_PATH?>/ProfitLoss";
      })
      .fail(function() {
        console.log("error delete order");
      });
      }         
    }
    </script>