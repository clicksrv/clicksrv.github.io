import styled from 'styled-components'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import events from '../services/events'
import useQuery from '../hooks/useQuery'
import { media } from './styled/Grid'
import { t } from '../locales'

import Button from './styled/Button'
import CompanyStats from './Admin/CompanyStats'
import NewUserModal from './Admin/NewUserModal'
import PageTitle from './PageTitle'
import UserCvsModal from './Admin/UserCvsModal'
import UsersContainer from './Admin/UsersContainer'

const Container = styled.div`
  font-size: 14px;

  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Title = styled(PageTitle)`
  margin: 20px 20px 15px 0;
`

const Icon = styled.i``

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: 0 -15px;
`

const Users = styled.div`
  background-color: white;
  border-radius: 5px;

  flex: 1 0 65%;
  margin: 0 15px 30px;
  padding: 15px;
  min-width: 300px;

  ${media.md`
    padding: 20px 30px 30px;
  `}
`

const Stats = styled.div`
  background-color: white;
  border-radius: 5px;

  flex: 1 0 15%;
  margin: 0 15px 20px;
  padding: 15px;
  min-width: 200px;

  ${media.md`
    padding: 20px 30px 30px;
  `}
`

const Company = () => {
  const { pathname } = useLocation()
  const { modal, userId } = useQuery()

  const currentUser = useSelector((state) => state.session.user)
  const company = useSelector((state) => state.admin.company)
  const stats = useSelector((state) => state.admin.stats)
  const users = useSelector((state) => state.admin.users)

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    events.emit('CV::RESET')
    events.emit('ADMIN::GET_USERS')
    events.emit('ADMIN::GET_STATS')
    events.emit('ADMIN::GET_COMPANY')
  }, [])

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase().trim())
  }

  const filteredUsers = useMemo(() => {
    const isMatch = (user) => {
      const { email, firstName, lastName } = user
      const name = lastName ? `${firstName} ${lastName}` : firstName

      return name.toLowerCase().indexOf(searchTerm) >= 0 || email.toLowerCase().indexOf(searchTerm) >= 0
    }

    return users.filter(isMatch)
  }, [users, searchTerm])

  const renderModal = () => {
    const user = users.find((u) => `${u.id}` === userId)

    switch (modal) {
      case 'new-user':
        return (
          <NewUserModal
            company={company}
            isOpen
            path={pathname}
          />
        )
      case 'user-cvs':
        return (
          <UserCvsModal
            user={user}
            isOpen
            path={pathname}
          />
        )
    }
  }

  return (
    <Container>
      <Header>
        <Title>{t('admin_dashboard')}</Title>

        <Button to={`${pathname}?modal=new-user`}>
          <Icon className="icon-plus" />

          {t('new_user')}
        </Button>
      </Header>

      <Content>
        <Users>
          <UsersContainer
            currentUserId={currentUser.id}
            users={filteredUsers}
            onSearch={handleSearch}
          />
        </Users>

        <Stats>
          <CompanyStats stats={stats} />
        </Stats>

        {renderModal()}
      </Content>
    </Container>
  )
}

export default Company
