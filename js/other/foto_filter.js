    $(".frontend_filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.frontend_filter').show('1000');
        }
        else
        {
//          $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//          $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".frontend_filter").not('.'+value).hide('3000');
            $('.frontend_filter').filter('.'+value).show('3000');
            
        }
    });


            $(".datenbankdesign_filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.datenbankdesign_filter').show('1000');
        }
        else
        {
//          $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//          $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".datenbankdesign_filter").not('.'+value).hide('3000');
            $('.datenbankdesign_filter').filter('.'+value).show('3000');
            
        }
    });



        $(".java_se_filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.java_se_filter').show('1000');
        }
        else
        {
//          $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//          $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".java_se_filter").not('.'+value).hide('3000');
            $('.java_se_filter').filter('.'+value).show('3000');
            
        }
    });


        $(".java_e_p_filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.java_e_p_filter').show('1000');
        }
        else
        {
//          $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//          $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".java_e_p_filter").not('.'+value).hide('3000');
            $('.java_e_p_filter').filter('.'+value).show('3000');
            
        }
    });
	

    $( function() {
    $( ".sortable" ).sortable();
    $( ".sortable" ).disableSelection();
  } );