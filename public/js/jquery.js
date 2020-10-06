
$(document).on('click','#delete',function() {
    $(this).html("deleting..");
    var file = $(this).attr("file");
    $.ajax({
        url:'/deleteFile/'+ file,
        type:'GET',
        data:{}
    });
});