$(document).ready(function(){
    // Setup owl carousel
    $('.owl-carousel').owlCarousel({
    loop:false,
    margin:10,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1200:{
            items:3
        }
    }
    });

    // Setup model click
    $('.custom-carousel-item .item-text').click(function(){
    var parentClass = $(this).parent().attr('class');
    var pageName = parentClass.split(' ')[1];
    var pageNumber = pageName.substring(pageName.length - 1);
        
    window.location = 'model' + pageNumber + '.html'; 
    });

    // Triggers search
    $('.model-search-input').keypress(function(e){
    var searchInputField = -1;     
    var searchInputValue = '';

    if(e.keyCode == 13){
        if($(this).attr('id') === 'model1-input') {
            searchInputField = 1;
        }   

        searchInputValue = $(this).val();
        
        getResults(searchInputField, searchInputValue);
    }
    });

    // Get results
    function getResults(model, searchValue) {
        var modelAPIURL = '';

        if (model === 1) {
        modelAPIURL = 'https://my.api.mockaroo.com/ppl_demo.json?key=8cc61b60&__method=POST';    
        }

        $.ajax({
        type: 'POST',
        url: modelAPIURL,
        data: {searchValue: searchValue},
        dataType: 'json',
        success: function(data) {
            alert('Success');
            buildTable(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert('Error: ' + errorThrown);
        }
        });
    }

    // Build table
    function buildTable(data) {
        var htmlTable = '';

        if (data.length > 0) {
            var idx = 1;

            for(item of data) {
                console.log(item); // TODO - REMOVE
                htmlTable += '<tr>';
                htmlTable += '<th scope="row">' + idx++ + '</th>';
                htmlTable += '<td>' + item['first_name'] + '</td>';
                htmlTable += '<td>' + item['last_name'] + '</td>';
                htmlTable += '<td>' + item['accuracy'] + '</td>';
                htmlTable += '</tr>';
            }
        } else {
            htmlTable += '<tr>';
            htmlTable += '<td>No Results found</td>';
            htmlTable += '<td></td>';
            htmlTable += '<td></td>';
            htmlTable += '<td></td>';
            htmlTable += '</tr>';
        }

        $('.results-table tbody').html(htmlTable);
        $('.results-table').show();
    }
});
