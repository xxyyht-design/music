import Icon from '@/web/components/Icon'
import { cx } from '@emotion/css'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const SettingsButton = ({ className }: { className?: string }) => {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate('/settings')}
      className={cx(
        'app-region-no-drag mineradio-icon-btn',
        className
      )}
    >
      <Icon name='settings' className='h-5 w-5 ' />
    </button>
  )
}

export default SettingsButton
