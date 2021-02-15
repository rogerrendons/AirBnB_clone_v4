$(document).ready(function () {
    const checkedList = [];
    $('input:checkbox').change(function () {
        if($(this).is(':checked')){
            checkedList[$(this).attr('data-id')] = $(this).attr('data-name')
        }else{
            delete checkedList[$(this).attr('data-id')];
        }
        $('DIV.amenities H4').text(Object.values(checkedList).join(', '));
    });
});
