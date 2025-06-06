import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../models/filter-model';

function createFiltersTemplate(currentFilter, disabledFilters = {}) {
  return `
    <form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${FilterType.EVERYTHING}" ${currentFilter === FilterType.EVERYTHING ? 'checked' : ''} ${disabledFilters.EVERYTHING ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${FilterType.FUTURE}" ${currentFilter === FilterType.FUTURE ? 'checked' : ''} ${disabledFilters.FUTURE ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-present" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${FilterType.PRESENT}" ${currentFilter === FilterType.PRESENT ? 'checked' : ''} ${disabledFilters.PRESENT ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-present">Present</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-past" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${FilterType.PAST}" ${currentFilter === FilterType.PAST ? 'checked' : ''} ${disabledFilters.PAST ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-past">Past</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
}

export default class FiltersView extends AbstractView {
  #currentFilter = null;
  #disabledFilters = null;
  #handler = null;

  constructor({currentFilter, disabledFilters = {}, onFilterChange}) {
    super();
    this.#currentFilter = currentFilter;
    this.#disabledFilters = disabledFilters;
    this.#handler = onFilterChange;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#currentFilter, this.#disabledFilters);
  }

  #filterTypeChangeHandler = (evt) => {
    this.#handler(evt.target.value);
  };
}
