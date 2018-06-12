$(function(){
  function buildHTML(message){
    if (message.image.url){
      var image = `<img src="${message.image.url}" class="lower-message__image">`;
    }else{
      var image ='';
    }
    if( message.content || message.image){
      var html = `<div class="chatgroup">
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
  //メッセージのスクロール
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
      $('.chatgroups').animate({scrollTop:$('.chatgroups')[0].scrollHeight});
      $('.sendbutton').removeAttr("disabled");
    })
    .fail(function(){
      $('#new_message')[0].reset();
      alert('error');
    })
  })
});
