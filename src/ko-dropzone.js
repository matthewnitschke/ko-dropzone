/*
  ko-dropzone
  Author: Matthew Nitschke
  Version: {{versionNumber}}
*/

(function(global, undefined) {

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

          self.file = params.file;

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
                      var files = e.dataTransfer.files;
                      if (files.length > 0) {
                          self.file(files[0]);
                      }
                  });

                  hasListeners = true;
              }
          });

          self.fileUpload = function (data, e) {
              var files = e.target.files;
              if (files.length > 0) {
                  self.file(files[0]);
              }
          }
      },
      template: '<div class="ko-dropzone" data-bind="domSelector: dropzoneElement">\
          <label for="picker">\
              <div data-bind="if: file()">\
                  <div class="hover-color" data-bind="text: file().name">filename</div>\
              </div>\
              <div data-bind="if: !file()">\
                  <span class="hover-color">Choose a file</span> or drag it here\
              </div>\
          </label>\
          <input type="file" id="picker" data-bind="event: { change: fileUpload }" accept="image/*" />\
      </div>'
  });

})(this);
