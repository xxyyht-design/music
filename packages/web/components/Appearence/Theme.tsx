import { changeTheme } from '@/web/utils/theme'
import Icon from '../Icon'
import { useSnapshot } from 'valtio'
import settings from '@/web/states/settings'
import { syncTheme } from '@/web/utils/ipcRender'
const Theme = () => {
  const { theme } = useSnapshot(settings)
  return (
    <>
      <div
        className='app-region-no-drag mineradio-icon-btn h-12 w-12'
        onClick={() => {
          if (theme == 'dark') {
            changeTheme('light')
            settings.theme = 'light'
          } else {
            changeTheme('dark')
            settings.theme = 'dark'
          }
          syncTheme(settings.theme)
        }}
      >
        <Icon name='sun' className='h-9 w-9 text-white' />
      </div>
    </>
  )
}

export default Theme
