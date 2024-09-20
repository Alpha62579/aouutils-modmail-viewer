function doStuff(window) {
    var params = new URLSearchParams(window.location.search)
    var username = params.get("username")
    var uid = params.get("id")
    var url = params.get("url")
    if (username === null || uid === null || url === null) {
        document.body.innerHTML = "Stop joking with me."
        return
    }

    // Set username and ID
    document.head.getElementsByTagName("title")[0].textContent = `${username} (ID: ${uid})`
    document.body.getElementsByClassName("info__user")[0].textContent = `Transcript: ${username} (ID: ${uid})`

    // Load JSON from URL
    try {
        fetch(url).then(res => { return res.json() }).then(json => { fillOut(json) })
    } catch (error) {
        document.body.innerHTML = "Fucked up URL."
        return;
    }
}

function appendChild(target, insert){
    Array.from(insert.body.children).forEach(element => {
        target.appendChild(element)
    });
}

function fillOut(messages) {
    document.body.getElementsByClassName("info__channel-message-count")[0].textContent = `${messages.length} messages`

    const parser = new DOMParser();

    messages.forEach(msg => {
        var starter = parser.parseFromString(message_meta, "text/html")
        starter.getElementsByTagName("img")[0].src = msg.author.avatar
        starter.getElementsByTagName("span")[0].title = msg.author.username
        starter.getElementsByTagName("span")[0].textContent = msg.author.username
        starter.getElementsByTagName("span")[0].setAttribute("data-user-id", msg.author.id)

        var inner = parser.parseFromString(message_base, "text/html")
        var content = parser.parseFromString(message_content, "text/html")
        content.getElementsByTagName("span")[0].textContent = msg.content
        appendChild(inner.getElementsByClassName("chatlog__message")[0], content)

        msg.embeds.forEach(embed => {
            var e_base = parser.parseFromString(embed_base, "text/html")
            e_base.getElementsByClassName("chatlog__embed-color-pill")[0].setAttribute("style", `background-color: #${embed.color.toString(16).padStart(6, '0')}`)
            // prolly implement authors
            if ('title' in embed) {
                var title = parser.parseFromString(embed_title, "text/html")
                title.getElementsByTagName("span")[0].textContent = embed.title
                appendChild(e_base.getElementsByClassName("chatlog__embed-text")[0], title)
            }
            if ('description' in embed) {
                var desc = parser.parseFromString(embed_description, "text/html")
                desc.getElementsByTagName("span")[0].textContent = embed.description
                appendChild(e_base.getElementsByClassName("chatlog__embed-text")[0], desc)
            }
            //implement fields, image, thumbnail and footer

            appendChild(inner.getElementsByClassName("chatlog__message")[0], e_base)
        });

        msg.files.forEach(file => {
            if (image_types.includes(file.name.split(".").pop())) {
                var base = parser.parseFromString(attachment_base_image, "text/html")
                var blob = b64toBlob(file.content, getMimeTypeFromExtension(file.name.split(".").pop()))
                var url = URL.createObjectURL(blob)
                base.getElementsByTagName("a")[0].href = url
                appendChild(inner.getElementsByClassName("chatlog__message")[0], base)
            }
            else if (video_types.includes(file.name.split(".").pop())) {
                var base = parser.parseFromString(attachment_base_video, "text/html")
                var blob = b64toBlob(file.content, getMimeTypeFromExtension(file.name.split(".").pop()))
                var url = URL.createObjectURL(blob)
                base.getElementsByTagName("video")[0].src = url
                appendChild(inner.getElementsByClassName("chatlog__message")[0], base)
            }
            else {
                var base = parser.parseFromString(attachment_base_file_audio, "text/html")
                if (webcode_types.includes(file.name.split(".").pop())) {
                    var icon = "assets/discord-webcode.svg"
                }
                else if (code_types.includes(file.name.split(".").pop())) {
                    var icon = "assets/discord-code.svg"
                }
                else if (document_types.includes(file.name.split(".").pop())) {
                    var icon = "assets/discord-document.svg"
                }
                else if (acrobat_types.includes(file.name.split(".").pop())) {
                    var icon = "assets/discord-acrobat.svg"
                }
                else if (archive_types.includes(file.name.split(".").pop())) {
                    var icon = "assets/discord-archive.svg"
                }
                else if (audio_types.includes(file.name.split(".").pop())) {
                    var icon = "assets/discord-audio.svg"
                    var audio = parser.parseFromString(attachment_audio, "text/html")
                    var blob = b64toBlob(file.content, getMimeTypeFromExtension(file.name.split(".").pop()))
                    var url = URL.createObjectURL(blob)
                    base.getElementsByTagName("source")[0].href = url
                    audio.getElementsByTagName("source")[0].title = file.name
                    appendChild(base.getElementsByClassName("chatlog__attachment-ext-container")[0], audio)
                }
                else {
                    var icon = "assets/discord-unknown.svg"
                }
                base.getElementsByTagName("img")[0].src = icon
                var blob = b64toBlob(file.content, getMimeTypeFromExtension(file.name.split(".").pop()))
                var url = URL.createObjectURL(blob)
                base.getElementsByTagName("a")[0].href = url
                base.getElementsByTagName("a")[0].textContent = file.name
                appendChild(inner.getElementsByClassName("chatlog__message")[0], base)
            }
        });

        appendChild(starter.getElementsByClassName("chatlog__messages")[0], inner)
        appendChild(document.getElementsByClassName("chatlog")[0], starter)
    });


}

function b64toBlob (b64Data, contentType='', sliceSize=512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
      
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

function getMimeTypeFromExtension(extension = "txt") {
    if (extension[0] === ".") {
        extension = extension.substr(1);
    }
    return {
        "aac": "audio/aac",
        "abw": "application/x-abiword",
        "arc": "application/x-freearc",
        "avi": "video/x-msvideo",
        "azw": "application/vnd.amazon.ebook",
        "bin": "application/octet-stream",
        "bmp": "image/bmp",
        "bz": "application/x-bzip",
        "bz2": "application/x-bzip2",
        "cda": "application/x-cdf",
        "csh": "application/x-csh",
        "css": "text/css",
        "csv": "text/csv",
        "doc": "application/msword",
        "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "eot": "application/vnd.ms-fontobject",
        "epub": "application/epub+zip",
        "gz": "application/gzip",
        "gif": "image/gif",
        "htm": "text/html",
        "html": "text/html",
        "ico": "image/vnd.microsoft.icon",
        "ics": "text/calendar",
        "jar": "application/java-archive",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "jsonld": "application/ld+json",
        "mid": "audio/midi audio/x-midi",
        "midi": "audio/midi audio/x-midi",
        "mjs": "text/javascript",
        "mp3": "audio/mpeg",
        "mp4": "video/mp4",
        "mpeg": "video/mpeg",
        "mpkg": "application/vnd.apple.installer+xml",
        "odp": "application/vnd.oasis.opendocument.presentation",
        "ods": "application/vnd.oasis.opendocument.spreadsheet",
        "odt": "application/vnd.oasis.opendocument.text",
        "oga": "audio/ogg",
        "ogv": "video/ogg",
        "ogx": "application/ogg",
        "opus": "audio/opus",
        "otf": "font/otf",
        "png": "image/png",
        "pdf": "application/pdf",
        "php": "application/x-httpd-php",
        "ppt": "application/vnd.ms-powerpoint",
        "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "rar": "application/vnd.rar",
        "rtf": "application/rtf",
        "sh": "application/x-sh",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tar": "application/x-tar",
        "tif": "image/tiff",
        "tiff": "image/tiff",
        "ts": "video/mp2t",
        "ttf": "font/ttf",
        "txt": "text/plain",
        "vsd": "application/vnd.visio",
        "wav": "audio/wav",
        "weba": "audio/webm",
        "webm": "video/webm",
        "webp": "image/webp",
        "woff": "font/woff",
        "woff2": "font/woff2",
        "xhtml": "application/xhtml+xml",
        "xls": "application/vnd.ms-excel",
        "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "xml": "application/xml",
        "xul": "application/vnd.mozilla.xul+xml",
        "zip": "application/zip",
        "3gp": "video/3gpp",
        "3g2": "video/3gpp2",
        "7z": "application/x-7z-compressed"
    }[extension] || "application/octet-stream";
}