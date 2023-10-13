# Formats

This file contains information about the various object formats used by the Cronicle API.

## Event Data Format

Here are descriptions of all the properties in the event object, which is common in many API calls:

| Event Property   | Format  | Description                                                                                                                                                                                               |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `algo`           | String  | Specifies the algorithm to use for picking a server from the target group. See [Algorithm](WebUI.md#algorithm).                                                                                           |
| `api_key`        | String  | The API Key of the application that originally created the event (if created via API).                                                                                                                    |
| `catch_up`       | Boolean | Specifies whether the event has [Run All Mode](WebUI.md#run-all-mode) enabled or not.                                                                                                                     |
| `category`       | String  | The Category ID to which the event is assigned.  See [Categories Tab](WebUI.md#categories-tab).                                                                                                           |
| `chain`          | String  | The chain reaction event ID to launch when jobs complete successfully.  See [Chain Reaction](WebUI.md#chain-reaction).                                                                                    |
| `chain_error`    | String  | The chain reaction event ID to launch when jobs fail.  See [Chain Reaction](WebUI.md#chain-reaction).                                                                                                     |
| `cpu_limit`      | Number  | Limit the CPU to the specified percentage (100 = 1 core), abort if exceeded. See [Event Resource Limits](WebUI.md#event-resource-limits).                                                                 |
| `cpu_sustain`    | Number  | Only abort if the CPU limit is exceeded for this many seconds. See [Event Resource Limits](WebUI.md#event-resource-limits).                                                                               |
| `created`        | Number  | The date/time of the event's initial creation, in Epoch seconds.                                                                                                                                          |
| `detached`       | Boolean | Specifies whether [Detached Mode](WebUI.md#detached-mode) is enabled or not.                                                                                                                              |
| `enabled`        | Boolean | Specifies whether the event is enabled (active in the scheduler) or not.                                                                                                                                  |
| `id`             | String  | A unique ID assigned to the event when it was first created.                                                                                                                                              |
| `log_max_size`   | Number  | Limit the job log file size to the specified amount, in bytes.  See [Event Resource Limits](WebUI.md#event-resource-limits).                                                                              |
| `max_children`   | Number  | The total amount of concurrent jobs allowed to run. See [Event Concurrency](WebUI.md#event-concurrency).                                                                                                  |
| `memory_limit`   | Number  | Limit the memory usage to the specified amount, in bytes. See [Event Resource Limits](WebUI.md#event-resource-limits).                                                                                    |
| `memory_sustain` | Number  | Only abort if the memory limit is exceeded for this many seconds. See [Event Resource Limits](WebUI.md#event-resource-limits).                                                                            |
| `modified`       | Number  | The date/time of the event's last modification, in Epoch seconds.                                                                                                                                         |
| `multiplex`      | Boolean | Specifies whether the event has [Multiplexing](WebUI.md#multiplexing) mode is enabled or not.                                                                                                             |
| `notes`          | String  | Text notes saved with the event, included in e-mail notifications. See [Event Notes](WebUI.md#event-notes).                                                                                               |
| `notify_fail`    | String  | List of e-mail recipients to notify upon job failure (CSV). See [Event Notification](WebUI.md#event-notification).                                                                                        |
| `notify_success` | String  | List of e-mail recipients to notify upon job success (CSV). See [Event Notification](WebUI.md#event-notification).                                                                                        |
| `params`         | Object  | An object containing the Plugin's custom parameters, filled out with values from the Event Editor. See [Plugins Tab](WebUI.md#plugins-tab).                                                               |
| `plugin`         | String  | The ID of the Plugin which will run jobs for the event. See [Plugins Tab](WebUI.md#plugins-tab).                                                                                                          |
| `queue`          | Boolean | Allow jobs to be queued up when they can't run immediately. See [Allow Queued Jobs](WebUI.md#allow-queued-jobs).                                                                                          |
| `queue_max`      | Number  | Maximum queue length, when `queue` is enabled. See [Allow Queued Jobs](WebUI.md#allow-queued-jobs).                                                                                                       |
| `retries`        | Number  | The number of retries to allow before reporting an error. See [Event Retries](WebUI.md#event-retries).                                                                                                    |
| `retry_delay`    | Number  | Optional delay between retries, in seconds. See [Event Retries](WebUI.md#event-retries).                                                                                                                  |
| `stagger`        | Number  | If [Multiplexing](WebUI.md#multiplexing) is enabled, this specifies the number of seconds to wait between job launches.                                                                                   |
| `target`         | String  | Events can target a [Server Group](WebUI.md#server-groups) (Group ID), or an individual server (hostname).                                                                                                |
| `timeout`        | Number  | The maximum allowed run time for jobs, specified in seconds. See [Event Timeout](WebUI.md#event-timeout).                                                                                                 |
| `timezone`       | String  | The timezone for interpreting the event timing settings. Needs to be an [IANA timezone string](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).  See [Event Timing](WebUI.md#event-timing). |
| `timing`         | Object  | An object describing when to run scheduled jobs.  See [Event Timing Object](APIReference.md#event-timing-object) below for details.                                                                       |
| `title`          | String  | A display name for the event, shown on the [Schedule Tab](WebUI.md#schedule-tab) as well as in reports and e-mails.                                                                                       |
| `username`       | String  | The username of the user who originally created the event (if created in the UI).                                                                                                                         |
| `web_hook`       | String  | An optional URL to hit for the start and end of each job. See [Event Web Hook](WebUI.md#event-web-hook).                                                                                                  |

## Algorithm

> When you target a server group for your event, a supplementary menu appears to select an "algorithm".  This is simply the method by which Cronicle picks a server in the group to run your job.  The default is "Random" (i.e. select a random server from the group for each job), but there are several others as well:

| Algorithm ID   | Algorithm Name         | Description                                                                                                                 |
| -------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `random`       | **Random**             | Pick a random server from the group.                                                                                        |
| `round_robin`  | **Round Robin**        | Pick each server in sequence (alphabetically sorted).                                                                       |
| `least_cpu`    | **Least CPU Usage**    | Pick the server with the least amount of CPU usage in the group.                                                            |
| `least_mem`    | **Least Memory Usage** | Pick the server with the least amount of memory usage in the group.                                                         |
| `prefer_first` | **Prefer First**       | Prefer the first server in the group (alphabetically sorted), only picking alternatives if the first server is unavailable. |
| `prefer_last`  | **Prefer Last**        | Prefer the last server in the group (alphabetically sorted), only picking alternatives if the last server is unavailable.   |
| `multiplex`    | **Multiplex**          | Run the event on **all** servers in the group simultaneously (see below).                                                   |

