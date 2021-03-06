require 'redmine'

Redmine::Plugin.register :bulk_time_entry do
  name 'Bulk Time Entry'
  author 'Eric Davis'
  description 'This is a plugin to enter multiple time entries at one time.'
  version '0.5.0'

  requires_redmine :version_or_higher => '0.9.0'
  
  menu :top_menu, :bulk_time_entry, {:controller => "bulk_time_entries", :action => 'index'}, 
    :caption => :bulk_time_entry_title, :if => Proc.new{User.current.allowed_to?(:log_time, nil, :global => true)} 
end

class BulkTimeEntryRailtie < Rails::Railtie
  config.to_prepare do
    require_dependency 'time_entry'
    TimeEntry.send(:include, BulkTimeEntryPlugin::Patches::TimeEntryPatch)
  end
end