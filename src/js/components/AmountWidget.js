
import {settings, select} from './../settings.js';

class AmountWidget {
  constructor(element) {
    const thisWidget = this;

    thisWidget.getElements(element);
    thisWidget.setValue(
      thisWidget.input.value || settings.amountWidget.defaultValue
    );
    thisWidget.initActions();

    //console.log('AmountWidget:', thisWidget);
    //console.log('constructor arguments:', element);
  }

  getElements(element) {
    const thisWidget = this;

    thisWidget.element = element;
    thisWidget.input = thisWidget.element.querySelector(
      select.widgets.amount.input
    );
    thisWidget.linkDecrease = thisWidget.element.querySelector(
      select.widgets.amount.linkDecrease
    );
    thisWidget.linkIncrease = thisWidget.element.querySelector(
      select.widgets.amount.linkIncrease
    );
  }

  setValue(value) {
    const thisWidget = this;

    const newValue = parseInt(value); // parseInt converts strings to numbers

    /* TODO: Add validation */
    if (
      thisWidget.value !== newValue &&
      !isNaN(newValue) &&
      newValue >= settings.amountWidget.defaultMin &&
      newValue <= settings.amountWidget.defaultMax
    ) {
      thisWidget.value = newValue;
    }
    thisWidget.input.value = thisWidget.value;

    /**We run the announce method after making sure that the value is correct */
    thisWidget.announce();
  }

  initActions() {
    const thisWidget = this;
    /*  with using the method setValue */
    thisWidget.input.addEventListener('change', function () {
      thisWidget.setValue(thisWidget.input.value);
    });
    /* add a 'click' event listener with suppressing the default action and will 
      use the setValue method - this time the argument will be thisWidget.value minus 1 */
    thisWidget.linkDecrease.addEventListener('click', function (event) {
      event.preventDefault(); // skip the default action
      thisWidget.setValue(thisWidget.value - 1);
    });
    /* Same as above, only increased by 1 */
    thisWidget.linkIncrease.addEventListener('click', function (event) {
      event.preventDefault();
      thisWidget.setValue(thisWidget.value + 1);
    });
  }

  /**We create instances of the Event class built into the JS engine */
  announce() {
    const thisWidget = this;

    /* The bubbles read-only property of the Event interface indicates whether
       the event bubbles up through the DOM tree or not.*/
    const event = new CustomEvent('updated', {
      bubbles: true,
    });
    thisWidget.element.dispatchEvent(event);
  }
}

export default AmountWidget;
