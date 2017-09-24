/*jshint esversion: 6 */

import $ from 'jquery';

class Modal {
  constructor() {
    this.openModalButton = $('.open-modal');
    this.modal = $('.modal');
    this.closeModalButton = $('.modal__close');
    this.events(); // call the events method, start listening
  }

  events() {
    // clicking the open modal button (bind keeps 'this' from shifting)
    this.openModalButton.click(this.openModal.bind(this));

    // clicking the x close modal button
    this.closeModalButton.click(this.closeModal.bind(this));

    // pushes any key
    $(document).keyup(this.keyPressHandler.bind(this));
  }

  keyPressHandler(e) {
    if(e.keyCode === 27) { // 27 is esc
      this.closeModal();
    }

  }

  openModal() {
    this.modal.addClass('modal--is-visible');
    return false; //prevents browser from scrolling up on #link
  }

  closeModal() {
    this.modal.removeClass('modal--is-visible');

  }
}

export default Modal;
