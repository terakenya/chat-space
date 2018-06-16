$(function() {
  var users_list = $("#user-search-result");
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id = ${user.id} data-user-name=${user.name}>追加</a>
                </div>
                `
    users_list.append(html);
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                <p>一致するユーザーはいません</p>
                </div>`
    users_list.append(html);
  }
  function appendGroupUser(user_id, user_name) {
    var html = `<div class="chat-group-user clearfix js-chat-member" id="${user_id}">
                  <input name="group[user_ids][]" type="hidden" value="${user_id}">
                  <p class="chat-group-user__name">${user_name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
    $("#chat-group-users").append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $.trim($(this).val());
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if(users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      } else {
        appendNoUser();
      }
    })
    .fail(function() {
      alert('error');
    })
  });

  $("#user-search-result").on('click', '.user-search-add', function() {
    $("#user-search-field").val('')
    var user_name = $(this).data('user-name')
    var user_id = $(this).data('data-user-id');
    appendGroupUser(user_id, user_name);
    $(this).parent().remove();
  });
  $("#chat-group-users").on('click', ".js-remove-btn", function() {
    $(this).parent().remove();
  });
});
