$(function() {
  projectSelectBind()
});

function projectSelectBind() {
  $('#project_select').bind('change', getIssues)
}

function getIssues() {
  $.get('bulk_time_entries/load_assigned_issues.js', {project_id: $('#project_select').val(), entry_id: $('#project_select').data('entry-id')})
}