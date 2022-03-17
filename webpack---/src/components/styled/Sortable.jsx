import AnythingSortable from 'react-anything-sortable'
import _ from 'lodash'

const Sortable = (props) => {
  const handleSortStart = () => {
    $('body').addClass('prevent-scroll')
  }

  const handleSortEnd = () => {
    $('body').removeClass('prevent-scroll')
  }

  return (
    <AnythingSortable
      onSortStart={handleSortStart}
      onSortEnd={handleSortEnd}
      key={_.uniqueId()}
      {...props}
    />
  )
}

export default Sortable
