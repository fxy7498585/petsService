(function(global){
  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }

  var type = getQueryString('type');

  $('.addinfo_btn').on('click', function(){
    if(!type){
      return;
    }
    var name = $('#name').val();
    var imgUrl = $('#imgUrl').val();
    var price = $('#price').val();
    var direction = $('#direction').val();
    var videoUrl = $('#videoUrl').val();

    var obj = {
      type:type,
       name:name,
        price:price,
       imgUrl: imgUrl,
       direction: direction,
       videoUrl: videoUrl
    };
      console.log(obj);
    $.ajax({
      type: 'get',
      url: '/data/write',
      data: obj,
      success: function(data){
        if(data.status){
          alert('添加数据成功');
          window.location.reload();
        }else{
          alert('添加失败,请补充完整');
        }
      },
      error: function(){
        alert('添加失败');
      },
      dataType: 'json'
    });

  });
  $('.delete').on('click',function (e) {
    if(!type){return;}
    var flag=$('.delete').data('flag');
    var obj = {
          type:type,
          flag:flag
      };
    console.log(obj);
      $.ajax({
          type: 'get',
          url: '/data/delete',
          data: obj,
          success: function(data){
              if(data.status){
                  alert('删除数据成功');
                  window.location.reload();
              }else{
                  alert('删除失败');
              }
          },
          error: function(){
              alert('删除失败');
          },
          dataType: 'json'
      });
  });
  $('.chage').on('click',function (e) {
    if(!type){return;}
      var flag=$('.delete').data('flag');
      var obj = {
        type:type,
        flag:flag
        };
        console.log(obj);
        $.ajax({
            type: 'get',
            url: '/data/change',
            data: obj,
            success: function(data){
                if(data.status){
                    alert('删除数据成功');
                    window.location.reload();
                }else{
                    alert('删除失败');
                }
            },
            error: function(){
                alert('删除失败');
            },
            dataType: 'json'
        });
    });

})(window);