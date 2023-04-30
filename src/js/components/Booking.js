import { templates, select } from '../settings.js';
import AmountWidget from './AmountWidget.js';

class Booking {
  constructor(element) {
    const thisBooking = this;

    thisBooking.element = element;
    thisBooking.render(element);
    thisBooking.initWidgets();
  }

  render(element) {
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget();

    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;

    thisBooking.dom.peopleAmound = thisBooking.dom.wrapper.querySelector(
      select.booking.peopleAmount
    );
    thisBooking.dom.hoursAmound = thisBooking.dom.wrapper.querySelector(
      select.booking.hoursAmount
    );
  }

  initWidgets() {
    const thisBooking = this;

    thisBooking.peopleAmound = new AmountWidget(thisBooking.dom.peopleAmound);
    thisBooking.dom.peopleAmound.addEventListener('update', function () {});

    thisBooking.hoursAmound = new AmountWidget(thisBooking.dom.hoursAmound);
    thisBooking.dom.hoursAmound.addEventListener('update', function () {});
  }
}
export default Booking;
