//*********************
// Options
//******************
// $(document).ready(function(){
//      $('.modal').modal();
//   });


// $('#submiturl').on('click',function(){
//
//   var inputdata = $('#url').val();
//   console.log(inputdata);
//   $.post('/urldata',{inputdata},function(data,err){
//     console.log(data);
//     console.log(err);
//
//   });
  // $.ajax({url: '/data'}).done(function (data) {
  // console.log(data);
  // $('.btnresult').html(data);
  // document.getElementById('objectimg').src=inputdata;
  // })
// 
// });

$('#submitFile').on('click',function(){

  previewFile();
});

function previewFile() {
  var preview = document.getElementById('objectimg');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
    var imgdata=reader.result;
    console.log(reader.result)
   $.post('/',{imgdata},function(){
     console.log("successfull")


   })
      setInterval(function(){
          $.ajax({url: '/data'}).done(function (data) {
     console.log(data);
     $('.btnresult').html(data);





   });
      },1000);


  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}


//*********************
