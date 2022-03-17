import num from 'numeral'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Area, AreaChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { formatDate, formatDateTime } from '../helpers/dates'
import { isResume, isWebsite } from '../helpers/cv'
import { media } from './styled/Grid'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'
import api from '../services/api'
import history from '../services/history'
import notify from '../services/notify'
import useCvs from '../hooks/useCvs'

import LoadingSpinner from './LoadingSpinner'
import SectionSubtitle from './SectionSubtitle'
import SectionTitle from './SectionTitle'
import Select from './forms/Select'
import Statistic from './shared/Statistic'
import Table from './styled/Table'

const Container = styled.div`
  background-color: white;
  border-radius: 5px;

  display: flex;
  flex-wrap: wrap;

  margin: 0 auto;
  max-width: 1140px;
  padding: 15px 0;
  width: 100%;

  ${media.md`
    margin-top: 15px;
    padding: 30px 15px;
  `}
`

const Title = styled(SectionTitle)`
  margin: 0 0 20px;
`

const Subtitle = styled(SectionSubtitle)`
  margin: 0 0 3px;
`

const Chart = styled.div`
  flex: 1 0 65%;

  margin: 0 15px 30px;
  max-width: 810px;
  width: 250px;
`

const Statistics = styled.div`
  flex: 1 0 10%;

  margin: 0 15px 30px;
  width: 220px;
`

const Activities = styled.div`
  font-size: 14px;

  margin: 20px 15px;
  width: 100%;
`

const CvSelect = styled.div`
  margin-bottom: 20px;
  width: 200px;

  ${media.md`
    float: right;
    margin-bottom: 0;
  `}
`

const ActivitiesTable = styled(Table)`
  vertical-align: top;

  td:first-child {
    min-width: 150px;
    width: 15%;
  }
`

const YTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={-10}
      dx={20}
      textAnchor="start"
      fill="#999">
      {num(payload.value).format(0, 0)}
    </text>
  </g>
)

YTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.object,
}

const Stats = () => {
  const { id } = useParams()

  const [stats, setStats] = useState(null)

  const user = useSelector((state) => state.session.user)
  const { cvs } = useCvs()

  const { locale } = user

  useEffect(() => {
    api[id ? 'getCvStats' : 'getStats'](id).then(setStats).catch(onError)
  }, [id])

  useEffect(() => trackEvent('viewed-stats-page', 'pageview'), [])

  const onError = () => notify.error(t('stats_loading_error'))

  const setCv = (ev) => {
    const id = ev.target.value

    history.push(id ? `/stats/${id}` : '/stats')
  }

  const weeklyData = () =>
    stats.weekly_data.map((stat) => ({
      name: formatDate(stat.week, locale, { month: 'short', day: 'numeric' }),
      value: stat.views,
    }))

  const renderTooltip = ({ active, payload, label }) => {
    if (!active) {
      return null
    }

    const viewCount = payload[0].value

    return (
      <div style={{ backgroundColor: 'white', padding: '15px', border: '1px solid #ddd', color: '#444' }}>
        <div>
          <strong>
            {t('week_of')} {label}
          </strong>
        </div>

        <div>
          {viewCount} {viewCount === 1 ? 'view' : 'views'}
        </div>
      </div>
    )
  }

  renderTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
    label: PropTypes.string,
  }

  const renderActivity = (activity) => (
    <tr key={activity.created_at}>
      <td>
        <div>{formatDateTime(activity.created_at, locale, { dateStyle: 'medium', timeStyle: 'short' })}</div>
        <div style={{ color: '#aaa' }}>{activity.ip}</div>
      </td>
      <td>
        {t('someone_viewed', { place: activity.address })}: {activity.cv_name}
      </td>
    </tr>
  )

  if (!stats) return <LoadingSpinner />

  return (
    <Container>
      <Chart>
        <CvSelect>
          <Select
            altStyle
            onChange={setCv}
            value={id}>
            <option value="">{t('all')}</option>
            <option disabled>-----</option>

            {cvs &&
              cvs
                .filter((cv) => isResume(cv) || isWebsite(cv))
                .map((cv) => (
                  <option
                    key={cv.id}
                    value={cv.id}>
                    {cv.name}
                  </option>
                ))}
          </Select>
        </CvSelect>

        <Title checkout={true}>{t('weekly_views')}</Title>

        <ResponsiveContainer
          width="100%"
          height="auto"
          aspect={2}>
          <AreaChart
            data={weeklyData()}
            margin={{ top: -1, right: 0, bottom: 0, left: 0 }}>
            <XAxis
              dataKey="name"
              padding={{ left: 40, right: 40 }}
            />

            <YAxis
              width={1}
              tick={<YTick />}
              tickLine={false}
              axisLine={false}
              padding={{ top: 25 }}
            />

            <Tooltip content={renderTooltip} />

            <CartesianGrid vertical={false} />

            <Area
              dataKey="value"
              stroke="#3e94e4"
              strokeWidth={3}
              strokeOpacity={0.5}
              fill="#3e94e4"
              fillOpacity={0.1}
              dot={{ fill: '#3e94e4', stroke: null, r: 5, fillOpacity: 1 }}
              activeDot={{ r: 5, fill: 'white', stroke: '#3e94e4' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Chart>

      <Statistics>
        <Statistic
          label={t('views')}
          value={stats.total_views}
        />

        <Statistic
          label={t('downloads')}
          value={stats.total_downloads}
        />

        <Subtitle>{t('visitor_source')}</Subtitle>

        <div style={{ maxWidth: 200, margin: '0 auto' }}>
          <ResponsiveContainer
            height="auto"
            aspect={1}>
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Tooltip />
              <Pie
                data={stats.referral_sources}
                dataKey="value"
                fill="#3e94e4"
                outerRadius="85%"
                innerRadius="60%"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Statistics>

      {stats.activities.length > 0 && (
        <Activities>
          <Title>{t('recent_views')}</Title>

          <ActivitiesTable>
            <tbody>{stats.activities.map(renderActivity)}</tbody>
          </ActivitiesTable>
        </Activities>
      )}
    </Container>
  )
}

export default Stats
