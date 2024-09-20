message_base = `
<div class="chatlog__message ">
</div>
`

message_content = `
<div class="chatlog__content">
    <div class="markdown">
        <span class="preserve-whitespace"></span>
    </div>
</div>
`

message_meta = `
<div class="chatlog__message-group">
    <div class="chatlog__author-avatar-container">
        <img class="chatlog__author-avatar" />
    </div>
    <div class="chatlog__messages">
        <span class="chatlog__author-name"></span>
    </div>
</div>
`

embed_base = `
<div class=chatlog__embed>
    <div class=chatlog__embed-color-pill></div>
    <div class=chatlog__embed-content-container>
        <div class=chatlog__embed-content>
            <div class=chatlog__embed-text>
            </div>
        </div>
    </div>
</div>
`

embed_fields_base = `
<div class="chatlog__embed-fields">
</div>
`

embed_field = `
<div class="chatlog__embed-field  chatlog__embed-field">
    <div class="chatlog__embed-field-name"><span class="markdown preserve-whitespace"></span></div>
    <div class="chatlog__embed-field-value"><span class="markdown preserve-whitespace"></span></div>
</div>
`

embed_author_base = `
<div class="chatlog__embed-author">
</div>
`

embed_author = `<span class="chatlog__embed-author-name"></span>`

embed_author_icon = `<img class="chatlog__embed-author-icon" alt="Author Icon">`

embed_image = `
<div class="chatlog__embed-image-container">
    <a class="chatlog__embed-image-link">
        <img class="chatlog__embed-image">
    </a>
</div>
`

embed_thumbnail = `
<div class="chatlog__embed-thumbnail-container">
    <a class="chatlog__embed-thumbnail-link">
        <img class="chatlog__embed-thumbnail">
    </a>
</div>
`

embed_title = `
<div class="chatlog__embed-title">
    <span class="markdown"></span>
</div>
`

embed_description = `
<div class=chatlog__embed-description>
    <span class="markdown preserve-whitespace"></span>
</div>
`

attachment_base_file_audio = `
<div class=chatlog__attachment>
    <div class="" onclick="">
        <div class="chatlog__attachment-ext-container">
            <div class="chatlog__attachment-container">
                <img class="chatlog__attachment-icon">
                <div class="chatlog__attachment-filename">
                    <a></a>
                </div>
            </div>
        </div>
    </div>
</div>
`

attachment_audio = `
<audio class="chatlog__attachment-thumbnail" controls="">
    <source alt="Audio Attachment">
</audio>
`

attachment_base_image = `
<div class=chatlog__attachment>
    <a><img class=chatlog__attachment-thumbnail></a>
</div>
`

image_types = ["png", "jpeg", "jpg", "gif"]
video_types = ["mov", "mkv", "mp4"]
audio_types = ["aac", "mid", "mp3", "m4a", "ogg", "flac", "wav", "amr"]
webcode_types = ["html", "htm", "css", "rss", "xhtml", "xml"]
code_types = ["py", "cgi", "pl", "gadget", "jar", "msi", "wsf", "bat", "php", "js"]
document_types = ["txt", "doc", "docx", "rtf", "xls", "xlsx", "ppt", "pptx", "odt", "odp", "ods", "odg", "odf", "swx", "sxi", "sxc", "sxd", "stw"]
acrobat_types = ["pdf"]
archive_types = ["br", "rpm", "dcm", "epub", "zip", "tar", "rar", "gz", "bz2", "7x", "deb", "ar", "Z", "lzo", "lz", "lz4", "arj", "pkg", "z"]

attachment_base_video = `
<div class=chatlog__attachment>
  <video controls="true">Video</video>
</div>
`