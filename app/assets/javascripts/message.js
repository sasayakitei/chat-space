$(function() {
  let message_body = $('.main-chat__body');

  function buildHTML(message) {
    let html = `<div class="main-chat__message-items" data-message-id="${message.id}">
                  <div class="main-chat__message-items__message-header">
                    <p class="main-chat__message-items__user-name">${message.user_name}</p>
                    <p class="main-chat__message-items__date">${message.created_at}</p>
                  </div>`;
    if (message.content) {
      html += `<p class="main-chat__message-items__message">${message.content}</p>`
    }
    if (message.image) {
      html += `<img src="${message.image}" class="lower-message__image">`
    }
    html += `</div>`;
    return html;
  }

  let reloadMessages = function() {
    let last_message_id = $('.main-chat__message-items:last').data('message-id');
    $.ajax({
      type: 'GET',
      url: 'api/messages',
      dataType: 'json',
      data: {id: last_message_id}
    }).done(function(messages) {
      if (messages.length == 0) return;
      let html = ``;
      messages.forEach(function(message) {
        html += buildHTML(message);
      });
      message_body.append(html);
      message_body.animate({scrollTop: message_body[0].scrollHeight});
    }).fail(function() {
      alert('error');
    });
  }

  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    }).done(function(data) {
      let html = buildHTML(data);
      message_body.append(html);
      message_body.animate({scrollTop: message_body[0].scrollHeight});
      $("form")[0].reset();
      $(".main-chat__form-items__send-btn").prop("disabled", false);
    }).fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});