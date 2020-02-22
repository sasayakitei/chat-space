$(function() {
  function buildHTML(message) {
    let html = `<div class="main-chat__message-items">
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
      $(".main-chat__body").append(html);
      $(".main-chat__body").animate({scrollTop: $(".main-chat__body")[0].scrollHeight});
      $("form")[0].reset();
      $(".main-chat__form-items__send-btn").prop("disabled", false);
    }).fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});