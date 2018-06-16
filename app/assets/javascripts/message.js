$(function(){
  function buildHTML(message){
    if (message.image){
      var image = `<img src="${message.image}" class="lower-message__image">`;
    }else{
      var image ='';
    }
    if( message.content || message.image){
      var html = `<div class="chatgroup" data-message-id="${message.id}">
                    <ul class="chat__lists">
                      <li class="chatuser">
                        ${message.user_name}
                      </li>
                      <li class="chattime">
                        ${message.created_at }
                      </li>
                    </ul>
                    <div class="chatmessage">
                      <p class="lower-message__content">
                        ${ message.content }
                      </p>
                        ${image}
                    </div>
                  </div>`;
      return html;
    }
  }
  //スクロール機能
  function scroll(){
    $('.chatgroups').animate({scrollTop:$('.chatgroups')[0].scrollHeight});
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chatgroups').append(html);
      $('#new_message')[0].reset();
      scroll();
      $('.sendbutton').removeAttr("disabled");
    })
    .fail(function(){
      $('#new_message')[0].reset();
      alert('error');
      $('.sendbutton').removeAttr("disabled");
    })
  })

  var interval = setInterval(function() {
    var message_id = $('.chatgroup').last().data('message-id');
    var url = location.pathname.match(/\/groups\/\d+\/messages/);
    if (url) {
      $.ajax({
        url: url,
        type: "GET",
        data:  {id: message_id},
        dataType: 'json'
      })
      .done(function(datas) {
        if (datas.length !== 0) {
          datas.forEach(function(data){
            var html = buildHTML(data);
            $('.chatgroups').append(html);
            scroll();
          })
        }
      })
      .fail(function() {
        alert('自動更新に失敗しました')
      })
    } else {
      clearInterval(interval)
    }
  }, 5000);
});
