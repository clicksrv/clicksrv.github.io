import PropTypes from 'prop-types'
import ReactDatePicker from 'react-date-picker'
import styled from 'styled-components'
import { propTypes, withFormsy } from 'formsy-react'

import { dateFromISOString, dateToISOString } from '../helpers/dates'

import {
  black,
  greenSuccess,
  grey,
  greyDark,
  greyDarker,
  greyDarkest,
  greyLight,
  greyLighter,
  greyLightest,
  greySubtle,
  primary,
  primaryFaded,
  primaryLightest,
} from '../colors'

import { media } from './styled/Grid'

const Container = styled.div`
  margin-bottom: 25px;

  // input element
  .react-date-picker__wrapper {
    border: 1px solid ${(props) => (props.isPristine ? greyLighter : greenSuccess)};
    border-radius: 4px;
    box-shadow: 0 2px 4px ${primaryFaded};
    color: ${greyDarker};
    font-size: 16px;
    font-weight: 500;
    transition: all 0.2s;

    padding: ${(props) => (props.small ? '11px 15px' : '13px 18px')};

    &:hover {
      border-color: ${greyLight};
    }
  }

  .react-date-picker__button {
    margin-left: 7px;

    .react-date-picker__button__icon {
      transition: all 0.2s;

      stroke: ${greyLight};
    }

    &:enabled:hover,
    &:enabled:focus {
      .react-date-picker__button__icon {
        stroke: ${grey};
      }
    }
  }

  .react-date-picker--open {
    .react-date-picker__wrapper {
      border-color: ${primary};
      color: ${black};
    }
  }

  // main calendar dropdown wrapper
  .react-date-picker__calendar {
    transition: all 0.25s;

    width: 290px;

    ${media.xs`
      width: 350px;
    `}
  }

  .react-date-picker__calendar--open {
    opacity: 1;
    visibility: visible;

    margin: 10px 0;
  }

  .react-date-picker__calendar--closed {
    opacity: 0;
    visibility: hidden;

    display: block;
    margin: 0;
  }

  // calendar dropdown itself
  .react-calendar {
    border: 1px solid ${greyLightest};
    border-radius: 4px;
    box-shadow: 0 5px 10px -5px ${primaryFaded}, 0 15px 30px 5px ${primaryFaded};
    font-family: 'Inter', sans-serif;
    font-weight: 500;

    padding: 24px 16px 18px;

    @supports (font-variation-settings: normal) {
      font-family: 'InterVariable', sans-serif;
    }

    abbr {
      border: none;
      text-decoration: none;
    }
  }

  .react-calendar__month-view__weekdays {
    color: ${greyDark};
    font-size: 0.8em;
    font-weight: 700;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${greyLighter};
    font-weight: 300;
  }

  .react-calendar__navigation {
    height: 30px;
    margin-bottom: 1.2em;

    .react-calendar__navigation__arrow {
      background-color: ${greySubtle};
      border-radius: 50%;
      color: ${greyDarkest};
      font-size: 1.2em;

      margin: 0 4px;
      min-width: 25px;
      padding: 0;

      height: 25px;
      width: 25px;

      ${media.xs`
        margin: 0 7px;
        min-width: 28px;

        height: 28px;
        width: 28px;
      `}

      &:enabled:hover,
      &:enabled:focus {
        background-color: ${greyLightest};
      }
    }

    .react-calendar__navigation__label:disabled {
      background-color: transparent;
    }
  }

  .react-calendar__navigation__label {
    color: ${greyDark};
    font-weight: 700;
    font-size: 1.15em;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: transparent;
  }

  .react-calendar__month-view__days {
    .react-calendar__tile {
      background-color: transparent;
      padding: 3px 3px;

      abbr {
        background-color: transparent;
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;

        height: 32px;
        width: 32px;

        ${media.xs`
          height: 38px;
          width: 38px;
        `}
      }

      &:enabled:hover,
      &:enabled:focus {
        abbr {
          background-color: ${greySubtle};
        }
      }

      &.react-calendar__tile--now,
      &.react-calendar__tile--now:enabled:hover,
      &.react-calendar__tile--now:enabled:focus {
        abbr {
          border: 1px solid ${primary};
          background-color: ${primaryLightest};
        }
      }

      &.react-calendar__tile--active,
      &.react-calendar__tile--active:enabled:hover,
      &.react-calendar__tile--active:enabled:focus {
        abbr {
          background-color: ${primary};
          color: white;
        }
      }
    }
  }

  .react-calendar__year-view {
    .react-calendar__tile {
      background-color: transparent;
      color: ${greyDark};

      padding: 0.5em 0.1em;

      abbr {
        border-radius: 4px;

        display: block;
        padding: 0.7em 0.4em;
      }

      &:enabled:hover,
      &:enabled:focus {
        abbr {
          background-color: ${greySubtle};
        }
      }

      &.react-calendar__tile--now,
      &.react-calendar__tile--now:enabled:hover,
      &.react-calendar__tile--now:enabled:focus {
        abbr {
          border: 1px solid ${primary};
          background-color: ${primaryLightest};
        }
      }
    }
  }
`

const DatePicker = ({ className, id, isPristine, locale, name, open, required, setOpen, setValue, small, value }) => {
  const onClose = () => setOpen(false)

  const onChange = (date) => setValue(dateToISOString(date))

  return (
    <Container
      className={className}
      id={id}
      isPristine={isPristine}
      small={small}>
      <ReactDatePicker
        clearIcon={null}
        format={'yyyy-MM-dd'}
        isOpen={open}
        locale={locale}
        minDetail="year"
        name={name}
        onCalendarClose={onClose}
        onChange={onChange}
        required={required}
        value={dateFromISOString(value)}
      />
    </Container>
  )
}

DatePicker.propTypes = {
  id: PropTypes.string,
  locale: PropTypes.string.isRequired,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  small: PropTypes.bool,
  ...propTypes,
}

export default withFormsy(DatePicker)
