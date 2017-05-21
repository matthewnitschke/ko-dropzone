/*
  ko-dropzone
  Author: Matthew Nitschke
  Version: 1.0.0
*/

(function (global, undefined) {

    // gives the component access to the dom
    ko.bindingHandlers.domSelector = {
        init: function (element, valueAccessor) {
            var value = valueAccessor();
            value(element);
        }
    }

    ko.components.register("ko-dropzone", {
        viewModel: function (params) {
            var self = this;

            self.files = params.files;

            self.dropzoneElement = ko.observable();

            var hasListeners = false;
            self.dropzoneElement.subscribe(function (value) {
                if (value && !hasListeners) {

                    self.dropzoneElement().addEventListener('dragover', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'copy';
                    });

                    self.dropzoneElement().addEventListener('drop', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        addFile(e.dataTransfer.files);
                    });

                    hasListeners = true;
                }
            });

            self.fileUpload = function (data, e) {
                addFile(e.target.files);
            }

            function addFile(files) {
                if (files.length > 0) {
                    var file = files[0];

                    file.thumb = ko.observable("#");

                    var reader = new FileReader();
                    reader.onload = function (e) {
                        file.thumb(e.target.result);
                    }

                    reader.readAsDataURL(file);

                    self.files.push(file);

                }
            }

            self.removeFile = function (file) {
                self.files.remove(file);
            }
        },
        template: '<div class="ko-dropzone" data-bind="domSelector: dropzoneElement">\
          <label for="picker">\
              <div class="files" data-bind="foreach: files">\
                  <div class="file-tile" data-bind="attr: {style: \'background-image: url(\' + thumb() + \')\'}">\
                        <i class="fa fa-times delete-file-icon" aria-hidden="true" data-bind="click: $parent.removeFile"></i>\
                        <span class="filename" data-bind="text: name"></span>\
                  </div>\
              </div>\
              <div data-bind="if: files().length <= 0">\
                  <span class="hover-color">Choose a file</span> or drag it here\
              </div>\
          </label>\
          <input type="file" id="picker" data-bind="event: { change: fileUpload }" />\
      </div>'
    });

})(this);
