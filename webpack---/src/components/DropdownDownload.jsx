import PropTypes from 'prop-types'

import useDropdown from '../hooks/useDropdown'
import { isWebsite } from '../helpers/cv'
import { t } from '../locales'

import DropdownMenuDownloadPDF from './DropdownMenuDownloadPDF'
import DropdownMenuDownloadWord from './DropdownMenuDownloadWord'
import { Btn } from './styled/Button'
import { Dropdown, DropdownContent, DropdownIcon, DropdownMenu } from './Dropdown'

const DropdownDownload = ({ className, cv }) => {
  const { closeDropdown, dropdownOpen, openDropdown } = useDropdown()

  if (isWebsite(cv)) {
    return null
  }

  return (
    <Dropdown className={className}>
      <Btn
        small
        onClick={openDropdown}>
        {t('download')}

        <DropdownIcon
          as="span"
          dropdownOpen={dropdownOpen}
          className="icon-chevron"
        />
      </Btn>

      <DropdownContent
        separated
        closeDropdown={closeDropdown}
        dropdownOpen={dropdownOpen}>
        <DropdownMenu>
          <DropdownMenuDownloadPDF cv={cv} />
          <DropdownMenuDownloadWord cv={cv} />
        </DropdownMenu>
      </DropdownContent>
    </Dropdown>
  )
}

DropdownDownload.propTypes = {
  className: PropTypes.string,
  cv: PropTypes.object.isRequired,
}

export default DropdownDownload
