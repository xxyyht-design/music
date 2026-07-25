import Main from '@/web/components/Main'
import Player from '@/web/components/Player'
import MenuBar from '@/web/components/MenuBar'
import Topbar from '@/web/components/Topbar/TopbarDesktop'
import { css, cx } from '@emotion/css'
import player from '@/web/states/player'
import { useSnapshot } from 'valtio'
import Login from './Login'
import TitleBar from './TitleBar'
import uiStates from '@/web/states/uiStates'
import ContextMenus from './ContextMenus/ContextMenus'
import settings from '@/web/states/settings'
import DiyPanel from './DiyPanel'
import { ease } from '../utils/const'
import { motion } from 'framer-motion'
import Router from '@/web/components/Router'
import BreathingBackground from '@/web/components/BreathingBackground'
import BackgroundStarrySky from '@/web/components/BackgroundStarrySky'

// Performance note: When breathing background is enabled, it provides its own
// blur(40px) effect on the cover image. The separate backdrop-blur-xl mask and
// backdrop-blur-md foreground are then redundant and waste ~60% of GPU tile
// memory. We conditionally skip them when breathing is active.

const Layout = () => {
  const playerSnapshot = useSnapshot(player)
  const { fullscreen } = useSnapshot(uiStates)
  const showPlayer = !!playerSnapshot.track
  const { showBackgroundImage, theme, enableBreathingEffect, glassBlur, glassSaturate, glassBrightness } = useSnapshot(settings)
  const defaultBg = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'
  const activeBg = player.track?.al?.picUrl || defaultBg

  return (
    <div
      style={
        {
          '--glass-blur': `${glassBlur}px`,
          '--glass-saturate': `${glassSaturate}%`,
          '--glass-brightness': `${glassBrightness}%`,
        } as React.CSSProperties
      }
      className='h-full'
    >
      {location.pathname == '/desktoplyrics' ? (
        <Router />
      ) : (
        <div
          id='layout'
          className={cx(
            'h-full',
            window.env?.isElectron && !fullscreen && 'rounded-12',
            css`
              position: relative;
              background: #000; /* 底部基准黑色 */
            `
          )}
        >
          {/* 1. 最底层：动态星空 */}
          <BackgroundStarrySky />

          {/* 2. 背景图片层 (如果启用) */}
          <AnimatePresence>
            {showBackgroundImage && (
              <motion.div
                key='bg-image'
                className={cx(
                  'absolute inset-0 z-0',
                  css`
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                  `
                )}
                style={{
                  backgroundImage: `url(${activeBg})`,
                  opacity: 0.4, /* 降低透明度让星空透出来 */
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            )}
          </AnimatePresence>

          {/* 3. 呼吸灯层 */}
          <BreathingBackground />

          {/* 4. 遮罩层 (控制整体明暗) */}
          <div 
            className={cx(
              'absolute inset-0 z-0 pointer-events-none',
              theme === 'dark' ? 'bg-black/20' : 'bg-white/10'
            )}
          />

          {/* 5. 前景 UI 层 */}
          <div
            id='layout-foreground'
            className={cx(
              'rounded-12',
              'relative grid h-screen select-none overflow-hidden',
              'text-black transition-colors duration-400 dark:text-white',
              'z-10'
            )}
          >
            <MenuBar />
            <div className=''>
              <Topbar />
            </div>
            <Main />
            <Login />
            {showPlayer && <Player />}

            {(window.env?.isWindows ||
              window.env?.isLinux ||
              window.localStorage.getItem('showWindowsTitleBar') === 'true') && <TitleBar />}

            <DiyPanel />
            <ContextMenus />
          </div>
        </div>
      )}
    </div>
  )
}

export default Layout
