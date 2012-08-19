$(function () {
  projectSelectBind()
});

function projectSelectBind() {
  $('.project_select').unbind('change');
  $('.project_select').bind('change', getIssues);
}

function getIssues() {
  $.get('bulk_time_entries/load_assigned_issues.js', {project_id:$(this).val(), id:$(this).data('id')});
}

function addEntry() {
  var last_entry = $('.box').last();
  if (last_entry.length == 0) {
    window.location.reload();
    return
  }

  var temp_container = document.createElement("p");
  temp_container.appendChild(last_entry.clone()[0]);
  removeError(temp_container);
  var html = temp_container.innerHTML;
  var currentId = last_entry.data('id');
  var nextId = parseInt(currentId) + 1;
  html = html.replace(/time_entries_(\d+)/g, "time_entries_" + nextId);
  html = html.replace(/time_entries\[(\d+)/g, "time_entries[" + nextId);
  html = html.replace(/entry_(\d+)/g, "entry_" + nextId);
  html = html.replace(/data-id="(\d+)/g, "data-id=\"" + nextId);
  $('#entries').append(html);
  reinitializeDatepicker(nextId);
  updateDate(currentId, nextId);
  updateProject(currentId, nextId);
  updateActivity(currentId, nextId);
  projectSelectBind();
}

function removeError(container) {
  $(container).find('#errorExplanation').remove();
}

function reinitializeDatepicker(id) {
  $('#entry_' + id + ' .spent_on').removeClass('hasDatepicker');
  $('#entry_' + id + ' .ui-datepicker-trigger').remove();
  $('#entry_' + id + ' .spent_on').datepicker(datepickerOptions);
}

function updateDate(current_id, new_id) {
  var currentValue = $('#entry_' + current_id + ' .spent_on').val();
  $('#entry_' + new_id + ' .spent_on').val(currentValue);
}

function updateProject(current_id, new_id) {
  var currentValue = $('#entry_' + current_id + ' .project_select').val();
  $('#entry_' + new_id + ' .project_select').val(currentValue);
}

function updateActivity(current_id, new_id) {
  var currentValue = $('#entry_' + current_id + ' .activity_select').val();
  $('#entry_' + new_id + ' .activity_select').val(currentValue);
}