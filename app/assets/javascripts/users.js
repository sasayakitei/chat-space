$(function() {
  function buildSearchResult(users) {
    let html
    if (users.length != 0) {
      html = ``;
      users.forEach(function(user) {
        html += `<div class="chat-group-user clearfix">
                   <p class="chat-group-user__name">${user.name}</p>
                   <div class="user-search-add chat-group-user__btn chat-group-user__btn--add"
                        data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                 </div>`;
      });
    } else {
      html = `<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">ユーザーが見つかりません</p>
              </div>`;
    }
    return html
  }

  function buildAddUser(user_id, user_name) {
    let html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
                    削除
                  </div>
                </div>`;
    return html;
  }

  let search_field  = $('#user-search-field');
  let search_result = $('#user-search-result');
  let group_users   = $('#chat-group-users');

  search_field.on('keyup', function() {
    let input = search_field.val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input }
    }).done(function(users) {
      search_result.empty();
      search_result.append(buildSearchResult(users));
    }).fail(function() {
      alert('ユーザの検索に失敗しました');
    });
  })

  search_result.on('click', '.chat-group-user__btn--add', function() {
    let user_id   = $(this).attr('data-user-id');
    let user_name = $(this).attr('data-user-name');

    group_users.append(buildAddUser(user_id, user_name));
    $(this).parent().remove();
  });

  group_users.on('click', '.chat-group-user__btn--remove', function() {
    $(this).parent().remove();
  });
});